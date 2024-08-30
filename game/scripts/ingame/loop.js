// Constants
const backgroundImg = new Image();
backgroundImg.src = "assets/background1.jpg";

const usernameDisplay = document.getElementById("playerName");
const timerDisplay = document.getElementById("timer");

const scoreADisplay = document.getElementById("scoreA");
const scoreBDisplay = document.getElementById("scoreB");

const countryAImg = document.getElementById("countryA");
const countryAText = document.getElementById("countryAText");
const countryBImg = document.getElementById("countryB");
const countryBText = document.getElementById("countryBText");

const pauseMenu = document.getElementById("pauseMenu");
const continueBtn = document.getElementById("continueBtn");

// Variables
let lastTime = performance.now();
let perSecStamp = 0;

// Objects
while (!isFormReady) {
	setTimeout(() => {}, 50);
}

const ball = new Ball(formData.ball);

const characterA = new Character(formData.country);
const characterB = new Character(formData.opponentCountry, true);

const goalA = new Goal();
const goalB = new Goal(true);

const countryA = new Image();
countryA.src = `assets/Flag/${formData.country}.png`;
const countryB = new Image();
countryB.src = `assets/Flag/${formData.opponentCountry}.png`;

// Functions
function drawBackground() {
	context.drawImage(backgroundImg, 0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
}

function drawWalls() {
	context.beginPath();

	context.lineWidth = "3";
	context.strokeStyle = "red";
	context.rect(FIELD_POSITION.x, FIELD_POSITION.y, FIELD_SIZE.width, FIELD_SIZE.height);
	context.stroke();

	context.closePath();
}

function drawFlags() {
	let isCountryA = true;
	for (let index = 0; index < 18; index++) {
		const image = isCountryA ? countryA : countryB;

		context.drawImage(image, index * 81, CANVAS_SIZE.height - 187, 81, 51);

		isCountryA = !isCountryA;
	}
}

function drawGoals() {
	goalA.draw();
	goalB.draw();
}

function drawCharacters() {
	characterA.draw();
	characterB.draw();
}

function handleCharsCollideWithGoal() {
	if (characterA.checkCollideWithGoal(goalA)) {
		resolveCollideAABB(characterA, goalA);
	} else if (characterA.checkCollideWithGoal(goalB)) {
		resolveCollideAABB(characterA, goalB);
	}

	if (characterB.checkCollideWithGoal(goalA)) {
		resolveCollideAABB(characterB, goalA);
	} else if (characterB.checkCollideWithGoal(goalB)) {
		resolveCollideAABB(characterB, goalB);
	}
}

function handleBallCollideWithChars() {
	ball.handleCollideWithChar(characterA);
	ball.handleCollideWithChar(characterB);
}

function handleBallCollideWithGoals() {
	const [resultA, normalVecA, penDepthA] = ball.checkCollideWithGoal(goalA);
	const [resultB, normalVecB, penDepthB] = ball.checkCollideWithGoal(goalB);

	if (resultA) {
		if (normalVecA.y > 0) {
			if (ball.gravity > 0) {
				ball.gravity = -ball.gravity;
			}

			if (ball.direction.x === 0) {
				ball.direction.x = 256;
			}
			ball.direction.x = Math.abs(ball.direction.x);
		} else {
			if (penDepthA.y <= ball.radius) {
				ball.direction.x = Math.abs(ball.direction.x);
				return;
			}

			if (penDepthA.x <= goalA.size.width - ball.radius / 2) {
				game.isGoalie = true;
				game.score[1]++;
				reset();
			}
		}
	}
	if (resultB) {
		if (normalVecB.y > 0) {
			if (ball.gravity > 0) {
				ball.gravity = -ball.gravity;
			}

			if (ball.direction.x === 0) {
				ball.direction.x = -256;
			}
			ball.direction.x = -Math.abs(ball.direction.x);
		} else {
			if (penDepthB.y <= ball.radius) {
				ball.direction.x = -Math.abs(ball.direction.x);
				return;
			}

			if (penDepthB.x >= ball.radius / 2) {
				game.isGoalie = true;
				game.score[0]++;
				reset();
			}
		}
	}
}

function handleTimer(deltaTime) {
	perSecStamp += deltaTime;

	if (perSecStamp >= 1 && game.timer > 0) {
		game.timer -= 1;
		perSecStamp = 0;
		updateTimerUI();
	}

	if (game.timer <= 0 && game.score[0] !== game.score[1]) {
		game.isOver = true;
		openOverMenu();
	}
}

// UI
function initUI() {
	usernameDisplay.innerText = formData.username.toUpperCase();

	countryAImg.src = `assets/Flag/${formData.country}.png`;
	countryAText.innerText = formData.country;
	countryBImg.src = `assets/Flag/${formData.opponentCountry}.png`;
	countryBText.innerText = formData.opponentCountry;

	game.timer = Number(formData.level);

	updateTimerUI();
	updateScoreUI();
}

function updateTimerUI() {
	timerDisplay.innerText = game.timer;
}

function updateScoreUI() {
	scoreADisplay.innerText = game.score[0];
	scoreBDisplay.innerText = game.score[1];
}

// UI Events
document.addEventListener("keyup", (ev) => {
	if (game.isOver) {
		return;
	}

	if (ev.code === "Escape" && !game.isCountingDown) {
		game.isPaused = !game.isPaused;
		pauseMenu.classList.toggle("hidden");

		if (!game.isPaused) {
			startCountdown(3);
		}
	}
});

continueBtn.addEventListener("click", () => {
	game.isPaused = false;
	pauseMenu.classList.add("hidden");
	startCountdown(3);
});

//
function reset() {
	updateScoreUI();
	setTimeout(() => {
		// Reset Characters
		characterA.reset();
		characterB.reset();

		// Reset Ball
		ball.reset();

		game.isGoalie = false;
	}, 1000);
}

// Main
function draw() {
	context.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);

	drawBackground();
	drawFlags();
	ball.draw();
	drawCharacters();
	drawGoals();

	if (PROD === "dev") {
		drawWalls();
	}
}

function update(deltaTime) {
	handleTimer(deltaTime);

	characterA.update(deltaTime);
	characterB.update(deltaTime);
	ball.update(deltaTime);

	handleCharsCollideWithGoal();
	handleBallCollideWithChars();
	handleBallCollideWithGoals();
}

function loop(currentTime) {
	const deltaTime = (currentTime - lastTime) / 1000 || 0;
	lastTime = currentTime;

	if (!game.isCountingDown && !game.isPaused && !game.isGoalie && !game.isOver && !game.isMatchHistory) {
		update(deltaTime);
	}
	draw();

	requestAnimationFrame(loop);
}

initUI();
loop();
