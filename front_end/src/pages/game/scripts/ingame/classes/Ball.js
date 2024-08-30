function clamp(value, minVal, maxVal) {
  return Math.max(minVal, Math.min(value, maxVal));
}

class Ball {
  #GRAVITY_FORCE = 16;
  #SPEED_DECAY = 4;
  #TERMINAL_VELOCITY = 1024;
  #BOUNCE_FACTOR = 0.6;

  constructor(ballName) {
    this.direction = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.position = new Vector(0, FIELD_SIZE.height);

    this.gravity = 0;
    this.speed = 0;

    this.radius = 32;
    this.image = new Image();

    this.init(ballName);
  }

  init(ballName) {
    this.image.src = `./assets/${ballName}.png`;
    this.position.x = FIELD_SIZE.width / 2;
    this.position.y = FIELD_SIZE.height - this.radius;
  }

  reset() {
    this.direction = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.position = new Vector(0, FIELD_SIZE.height);

    this.position.x = FIELD_SIZE.width / 2;
    this.position.y = FIELD_SIZE.height - this.radius;

    this.gravity = 0;
    this.speed = 0;
  }

  // Collisions Detections
  handleCollideWithFloor() {
    if (this.position.y < this.radius) {
      this.position.y = this.radius;

      if (this.gravity > 0) {
        this.gravity = -this.gravity * this.#BOUNCE_FACTOR;
      }
    }
  }

  handleCollideWithWalls() {
    if (this.position.x < this.radius) {
      this.position.x = this.radius;
      this.direction.x = -this.direction.x;
    }

    if (this.position.x + this.radius > FIELD_SIZE.width) {
      this.position.x = FIELD_SIZE.width - this.radius;
      this.direction.x = -this.direction.x;
    }
  }

  checkCollideWithGoal(goal) {
    const goalLeft = goal.position.x;
    const goalTop = goal.position.y + goal.size.height;
    const goalRight = goal.position.x + goal.size.width;
    const goalBottom = goal.position.y;

    const closestX = clamp(this.position.x, goalLeft, goalRight);
    const closestY = clamp(this.position.y, goalBottom, goalTop);

    const distX = this.position.x - closestX;
    const distY = this.position.y - closestY;
    const distSquared = distX ** 2 + distY ** 2;

    if (distSquared < this.radius ** 2) {
      const dist = Math.sqrt(distSquared);

      let normalX, normalY;
      if (dist !== 0) {
        normalX = distX / dist;
        normalY = distY / dist;
      } else {
        normalX = 1;
        normalY = 0;
      }

      return [
        true,
        new Vector(normalX, normalY),
        new Vector(this.position.x - goalLeft, goalTop - this.position.y),
      ];
    }

    return [false];
  }

  handleCollideWithChar(character) {
    const charLeft = character.position.x;
    const charTop = character.position.y + character.size.height;
    const charRight = character.position.x + character.size.width;
    const charBottom = character.position.y;

    const closestX = clamp(this.position.x, charLeft, charRight);
    const closestY = clamp(this.position.y, charBottom, charTop);

    const distX = this.position.x - closestX;
    const distY = this.position.y - closestY;
    const distSquared = distX ** 2 + distY ** 2;

    if (distSquared < this.radius * this.radius) {
      const dist = Math.sqrt(distSquared);
      const overlap = this.radius - dist;

      let normalX, normalY;
      if (dist !== 0) {
        normalX = distX / dist;
        normalY = distY / dist;
      } else {
        normalX = 1;
        normalY = 0;
      }

      this.position = this.position.add(
        new Vector(normalX * overlap, normalY * overlap)
      );

      const penetrationDepth = this.radius - dist;
      if (penetrationDepth > 0) {
        const pushVel = new Vector(normalX, normalY)
          .mult(penetrationDepth)
          .mult(0.5);

        character.position = character.position.sub(pushVel);
      }

      if (normalY > 0) {
        if (this.gravity > 0) {
          this.gravity = -this.gravity;
        }
        this.direction.y = 64;
      }

      if (normalX > 0) {
        if (character.isKicking) {
          this.direction.x = 1024;
        } else {
          this.direction.x = 256;
        }

        if (!character.isGrounded) {
          this.direction.y = 64;
        }

        if (character.isKicking) {
          this.direction.y = 256;
        }
      }
      if (normalX < 0) {
        if (character.isKicking) {
          this.direction.x = -1024;
        } else {
          this.direction.x = -256;
        }

        if (!character.isGrounded) {
          this.direction.y = 64;
        }

        if (character.isKicking) {
          this.direction.y = 256;
        }
      }
    }
  }

  // Logic
  handleGravity() {
    if (this.position.y > this.radius + 5) {
      if (this.gravity < this.#TERMINAL_VELOCITY) {
        this.gravity += this.#GRAVITY_FORCE;
      }
    }

    if (
      this.gravity >= -32 &&
      this.gravity <= 32 &&
      this.position.y <= this.radius + 2
    ) {
      this.gravity = 0;
    }

    this.velocity.y -= this.gravity;
  }

  handleSpeed() {
    if (this.direction.x !== 0) {
      const isNegative = this.direction.x < 0;

      this.direction.x = Math.abs(this.direction.x) - this.#SPEED_DECAY;

      if (isNegative) {
        this.direction.x = -this.direction.x;
      }
    }
    if (this.direction.y !== 0) {
      const isNegative = this.direction.y < 0;

      this.direction.y = Math.abs(this.direction.y) - this.#SPEED_DECAY;

      if (isNegative) {
        this.direction.y = -this.direction.y;
      }
    }

    this.velocity = this.velocity.add(this.direction);
  }

  // Main
  drawCollision() {
    const actualPos = toFieldPos(this.position);

    context.beginPath();

    context.lineWidth = "3";
    context.strokeStyle = "red";
    context.arc(actualPos.x, actualPos.y, this.radius, 0, Math.PI * 2);
    context.stroke();

    context.closePath();
  }

  draw() {
    if (PROD === "dev") {
      this.drawCollision();
    }

    const actualPos = toFieldPos(this.position);
    context.drawImage(
      this.image,
      actualPos.x - this.radius,
      actualPos.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }

  update(deltaTime) {
    this.handleGravity();
    this.handleSpeed();

    const deltaVel = this.velocity.mult(deltaTime);
    this.position = this.position.add(deltaVel);

    // Gravity
    this.handleCollideWithFloor();
    this.handleCollideWithWalls();

    this.velocity = new Vector(0, 0);
  }
}
