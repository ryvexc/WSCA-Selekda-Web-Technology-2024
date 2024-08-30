const goalImg = new Image();
goalImg.src = "./assets/Goal - Side.png";

class Goal {
  constructor(flipped) {
    this.position = new Vector(-16, -16);
    this.size = new Size(100, 188.37);

    this.isFlipped = flipped;

    this.init(flipped);
  }

  init(isFlipped) {
    if (isFlipped) {
      this.position = new Vector(FIELD_SIZE.width - this.size.width + 16, -16);
    }
  }

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

    const actualPos = toFieldPos(this.position);

    if (this.isFlipped) {
      context.save();
      context.scale(-1, 1);

      actualPos.x = -actualPos.x - this.size.width;
    }

    context.drawImage(
      goalImg,
      actualPos.x,
      actualPos.y - this.size.height,
      this.size.width,
      this.size.height
    );

    context.restore();
  }
}
