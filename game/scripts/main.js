// console.log(Flag.brazil);

const match = {
	a: "brazil",
	b: "italy",
};

const flagA = new Flag(flagPosition.a.x, flagPosition.a.y, Flag[match.a], 0.4);
const flagB = new Flag(flagPosition.b.x, flagPosition.b.y, Flag[match.b], 0.4);
const gawangA = new Gawang(gawangPosition.a.x, gawangPosition.a.y, 0.45);
const gawangB = new Gawang(gawangPosition.b.x, gawangPosition.b.y, 0.45, true);
const background = new CanvasImage(0, 0, canvas.width, canvas.height, "assets/background/background1.jpg");
const player = new Player(150, 385, match.a, 0.4);
const enemy = new Enemy(700, 385, match.b, 0.4);
const ball = new Ball(470, 300, 0.4);

const countryFlagsBanner = [];

function generateCountryFlagsBanner() {
	for (let i = 0; i <= 12; i++) {
		countryFlagsBanner.push(new Flag(83 * i, 381, Flag[i % 2 == 0 ? match.a : match.b], 0.362));
	}
}

function handleMovement() {
	window.onkeydown = (event) => {
		if (event.key == "d") {
			player.changeAnimation(PlayerAnimation.Move_Forward);
			player.velocity.x = 7;
		} else if (event.key == "a") {
			player.changeAnimation(PlayerAnimation.Move_Backward);
			player.velocity.x = -7;
		} else if (event.key == "w") {
			player.jump();
		} else if (event.keyCode == 32) {
			player.kick();
		} else if (event.keyCode == 37) {
			// console.log("LEFT");
			enemy.changeAnimation(PlayerAnimation.Move_Forward);
			enemy.velocity.x = -7;
		} else if (event.keyCode == 39) {
			// console.log("RIGHT");
			enemy.changeAnimation(PlayerAnimation.Move_Backward);
			enemy.velocity.x = 7;
		} else if (event.keyCode == 38) {
			// console.log("JUMP");
			enemy.jump();
		} else if (event.keyCode == 13) {
			// console.log("KEY");
			enemy.kick();
		} else {
			// console.log("UNBINDED KEY", event.keyCode);
		}
	};

	window.onkeyup = () => {
		player.animation = PlayerAnimation.Idle;
		player.velocity.x = 0;
		enemy.animation = PlayerAnimation.Idle;
		enemy.velocity.x = 0;
	};
}

function update() {
	requestAnimationFrame(update);
	// draw background
	background.draw();
	flagA.draw();
	flagB.draw();

	countryFlagsBanner.forEach((countryFlagBanner) => {
		countryFlagBanner.draw();
	});

	player.update();
	enemy.update();

	ball.update();
	gawangA.draw();
	gawangB.draw();

	if (ball.x > gawangB.x) {
	}

	scoreBox.style.top = `${document.getElementsByTagName("canvas").item(0).getBoundingClientRect().top + 50}px`;
}

handleMovement();
generateCountryFlagsBanner();
update();
