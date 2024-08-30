class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  sub(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  mult(number) {
    return new Vector(this.x * number, this.y * number);
  }

  abs() {
    return new Vector(Math.abs(this.x), Math.abs(this.y));
  }

  mag() {
    return this.x ** 2 + this.y ** 2;
  }

  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  unit() {
    if (this.mag() === 0) {
      return new Vector(0, 0);
    } else {
      return new Vector(this.x / this.mag(), this.y / this.mag());
    }
  }

  reflect(normal) {
    const dotProduct = this.dot(normal);
    const reflection = this.sub(normal.mult(2 * dotProduct));
    return reflection;
  }
}
