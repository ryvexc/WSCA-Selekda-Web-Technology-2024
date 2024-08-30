function getSrcFromCountry(country) {
  return `./assets/Characters/Character - ${country}`;
}

function loadSprite(src, animType, id) {
  const idText = String(id).padStart(3, "0");

  const img = new Image();
  img.src = `${src}/${animType}/${animType}_${idText}.png`;

  return img;
}

function getCenterOffset(nSize, containerSize) {
  return new Vector(
    (containerSize.width - nSize.width) / 2,
    (containerSize.height - nSize.height) / 2
  );
}

class Character {
  #imageSize = new Size(160, 160);
  #delay = 0.05;

  #walkSpeed = 256;
  #jumpPower = 1024;
  #gravity = 64;

  constructor(country, flipped) {
    this.direction = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.position = new Vector(100, 0);
    this.size = new Size(80, 110);

    this.jumpForce = 0;

    this.src = getSrcFromCountry(country);
    this.state = "idle";
    this.lockState = false;
    this.spriteId = 0;
    this.sprites = {
      idle: [],
      move_front: [],
      move_rear: [],
      kick: [],
      jump: [],
      falling_down: [],
    };
    this.spriteTime = 0;

    this.isGrounded = true;
    this.isKickingAnim = false;
    this.isKicking = false;

    this.actionRequest = {
      move_front: false,
      move_rear: false,
    };

    this.isFlipped = flipped;

    this.init(this.src);
  }

  init() {
    if (this.isFlipped) {
      this.position.x =
        FIELD_SIZE.width / 2 - this.size.width / 2 + this.size.width * 2;
    } else {
      this.position.x =
        FIELD_SIZE.width / 2 - this.size.width / 2 - this.size.width * 2;
    }

    this.onKeyDown();
    this.onKeyUp();

    // Idle Sprites
    for (let index = 0; index < 18; index++) {
      this.sprites.idle.push(loadSprite(this.src, "Idle", index));
    }

    // Move Front Sprites
    for (let index = 0; index < 10; index++) {
      this.sprites.move_front.push(loadSprite(this.src, "Move Forward", index));
    }

    // Move Rear Sprites
    for (let index = 0; index < 10; index++) {
      this.sprites.move_rear.push(loadSprite(this.src, "Move Backward", index));
    }

    // Kick Sprites
    for (let index = 0; index < 9; index++) {
      this.sprites.kick.push(loadSprite(this.src, "Kick", index));
    }

    // Jump Sprites
    for (let index = 0; index < 5; index++) {
      this.sprites.jump.push(loadSprite(this.src, "Jump", index));
    }

    // Falling Down Sprites
    for (let index = 0; index < 5; index++) {
      this.sprites.falling_down.push(
        loadSprite(this.src, "Falling Down", index)
      );
    }
  }

  reset() {
    this.jumpForce = 0;
    this.direction = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.position = new Vector(100, 0);

    this.isGrounded = true;
    this.isKickingAnim = false;
    this.isKicking = false;

    this.actionRequest = {
      move_front: false,
      move_rear: false,
    };

    this.spriteTime = 0;
    this.lockState = false;
    this.setState("idle");

    if (this.isFlipped) {
      this.position.x =
        FIELD_SIZE.width / 2 - this.size.width / 2 + this.size.width * 2;
    } else {
      this.position.x =
        FIELD_SIZE.width / 2 - this.size.width / 2 - this.size.width * 2;
    }
  }

  // Events
  onKeyDown() {
    document.addEventListener("keydown", (ev) => {
      if (
        game.isCountingDown ||
        game.isPaused ||
        game.isGoalie ||
        game.isOver ||
        game.isMatchHistory
      ) {
        return;
      }

      if (this.isFlipped) {
        if (ev.code == "ArrowUp") {
          this.jump();
        }
        if (ev.code == "ArrowLeft") {
          this.actionRequest.move_front = true;
        }
        if (ev.code == "ArrowRight") {
          this.actionRequest.move_rear = true;
        }
        if (ev.code == "Enter") {
          this.kick();
        }
      } else {
        if (ev.code == "KeyW") {
          this.jump();
        }
        if (ev.code == "KeyA") {
          this.actionRequest.move_rear = true;
        }
        if (ev.code == "KeyD") {
          this.actionRequest.move_front = true;
        }
        if (ev.code == "Space") {
          this.kick();
        }
      }
    });
  }

  onKeyUp() {
    document.addEventListener("keyup", (ev) => {
      if (this.isFlipped) {
        if (ev.code === "ArrowLeft") {
          this.actionRequest.move_front = false;
        }
        if (ev.code === "ArrowRight") {
          this.actionRequest.move_rear = false;
        }
      } else {
        if (ev.code === "KeyA") {
          this.actionRequest.move_rear = false;
        }
        if (ev.code === "KeyD") {
          this.actionRequest.move_front = false;
        }
      }
    });
  }

  // Actions
  jump() {
    if (!this.isGrounded) {
      return;
    }

    this.setState("jump");
    this.isGrounded = false;
    this.jumpForce = this.#jumpPower;
    this.velocity.y = this.jumpForce;
  }

  kick() {
    this.isKickingAnim = true;
    this.isKicking = true;
    this.spriteId = 0;
    this.setState("kick");
    this.lockState = true;
  }

  // Sprite Handler
  getCurrentImage() {
    return this.sprites[this.state][this.spriteId];
  }

  updateSpriteId(deltaTime) {
    this.spriteTime += deltaTime;

    if (this.spriteTime >= this.#delay) {
      this.spriteId = (this.spriteId + 1) % this.sprites[this.state].length;
      this.spriteTime = 0;
    }
  }

  setState(state) {
    if (this.state !== state && !this.lockState) {
      this.spriteId = 0;
      this.state = state;
    }
  }

  // Renderer
  drawCollision() {
    const actualPos = toFieldPos(this.position);

    context.beginPath();

    context.lineWidth = "3";
    context.strokeStyle = "red";
    context.rect(
      actualPos.x,
      actualPos.y - this.size.height,
      this.size.width,
      this.size.height
    );

    context.stroke();
    context.closePath();
  }

  draw() {
    if (PROD === "dev") {
      this.drawCollision();
    }

    const fieldPos = toFieldPos(this.position);
    const centerOffset = getCenterOffset(this.#imageSize, this.size);
    const offsetPos = new Vector(
      fieldPos.x - Math.abs(centerOffset.x),
      fieldPos.y + Math.abs(centerOffset.y)
    );

    context.save();
    if (this.isFlipped) {
      context.scale(-1, 1);

      offsetPos.x = -offsetPos.x - this.size.width * 2;
    }

    context.drawImage(
      this.getCurrentImage(),
      offsetPos.x,
      offsetPos.y - this.#imageSize.height,
      this.#imageSize.width,
      this.#imageSize.height
    );

    context.restore();
  }

  // Collisions Detections
  checkCollideWithFloor() {
    if (this.position.y < 0) {
      this.position.y = 0;
    }
  }

  checkCollideWithGoal(goal) {
    return checkCollideAABB(this, goal);
  }

  // Logic
  doMoveLogic() {
    if (this.actionRequest.move_front) {
      this.direction.x = 1;
    }
    if (this.actionRequest.move_rear) {
      this.direction.x = -1;
    }
    if (this.isFlipped) {
      this.direction.x = -this.direction.x;
    }

    if (this.isGrounded) {
      if (this.actionRequest.move_front) {
        this.setState("move_front");
      }
      if (this.actionRequest.move_rear) {
        this.setState("move_rear");
      }
    }
  }

  doIdleLogic() {
    if (
      !this.actionRequest.move_front &&
      !this.actionRequest.move_rear &&
      this.isGrounded
    ) {
      this.direction.x = 0;
      this.setState("idle");
    }
  }

  doGravityLogic() {
    if (!this.isGrounded) {
      if (this.jumpForce <= 0) {
        this.setState("falling_down");

        if (this.position.y <= 0) {
          this.isGrounded = true;
          this.jumpForce = 0;
          return;
        }
      }

      this.jumpForce -= this.#gravity;
      this.velocity.y = this.jumpForce;
    }
  }

  handleKick() {
    if (this.isKickingAnim) {
      if (this.spriteId >= 5) {
        this.isKicking = false;
      }
      if (this.spriteId === 8) {
        this.isKickingAnim = false;
        this.lockState = false;
      }
    }
  }

  // Updates
  update(deltaTime) {
    this.updateSpriteId(deltaTime);

    this.doMoveLogic();
    this.doIdleLogic();
    this.doGravityLogic();
    this.handleKick();

    this.direction = this.direction.unit().mult(this.#walkSpeed);
    this.velocity = this.velocity.add(this.direction);
    this.velocity = this.velocity.mult(deltaTime);
    this.position = this.position.add(this.velocity);

    this.checkCollideWithFloor();
  }
}
