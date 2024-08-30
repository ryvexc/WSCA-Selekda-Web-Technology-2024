/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const CANVAS_SIZE = new Size(1000, 512);

const FIELD_POSITION = new Vector(60, 120);
const FIELD_SIZE = new Size(875, 300);

const PROD = "prod";
const game = {
  isCountingDown: false,
  isPaused: false,
  isOver: false,
  isGoalie: false,
  isMatchHistory: false,
  timer: 30,
  score: [0, 0],
};

let isFormReady = false;
const formData = {
  username: "PLAYER NAME",
  country: "Brazil",
  opponentCountry: "Germany",
  level: "30",
  ball: "Ball 02",
};

function toFieldPos(position) {
  return new Vector(
    position.x + FIELD_POSITION.x,
    FIELD_POSITION.y + FIELD_SIZE.height - position.y
  );
}

function checkCollideAABB(objA, objB) {
  return (
    objA.position.x < objB.position.x + objB.size.width &&
    objA.position.x + objA.size.width > objB.position.x &&
    objA.position.y < objB.position.y + objB.size.height &&
    objA.position.y + objA.size.height > objB.position.y
  );
}

function resolveCollideAABB(objA, objB) {
  const objALeft = objA.position.x;
  const objATop = objA.position.y + objA.size.height;
  const objARight = objA.position.x + objA.size.width;
  const objABottom = objA.position.y;

  const objBLeft = objB.position.x;
  const objBTop = objB.position.y + objB.size.height;
  const objBRight = objB.position.x + objB.size.width;
  const objBBottom = objB.position.y;

  const overlapX =
    Math.min(objARight, objBRight) - Math.max(objALeft, objBLeft);
  const overlapY =
    Math.min(objATop, objBTop) - Math.max(objABottom - objBBottom);

  if (overlapX < overlapY) {
    if (objALeft < objBLeft) {
      objA.position.x -= overlapX;
    } else {
      objA.position.x += overlapX;
    }
  } else {
    if (objATop < objBTop) {
      objA.position.y -= overlapY;
    } else {
      objA.position.y += overlapY;
    }
  }
}

{
  const storedFormData = JSON.parse(localStorage.getItem("formData") || "null");

  if (storedFormData) {
    formData.username = storedFormData.username;
    formData.country = storedFormData.country;
    formData.opponentCountry = storedFormData.opponentCountry;
    formData.level = storedFormData.level;
    formData.ball = storedFormData.ball;
  }

  isFormReady = true;
}
