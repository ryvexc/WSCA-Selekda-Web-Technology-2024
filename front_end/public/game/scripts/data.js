const canvas = document.getElementsByTagName("canvas").item(0);
const context = canvas.getContext("2d");

const scoreBox = document.getElementById("score-box");

const flagPosition = {
	a: {
		x: 325,
		y: 50,
	},
	b: {
		x: 580,
		y: 50,
	},
};

const gawangPosition = {
	a: { x: 46, y: 342 },
	b: { x: 860, y: 342 },
};

class CanvasImage {
	constructor(x, y, width, height, source) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.image = new Image(this.width, this.height);
		this.image.src = source;
		this.isLoaded = false;

		this.image.onload = () => {
			this.isLoaded = true;
		};
	}

	draw(ctx) {
		if (this.isLoaded) {
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		}
	}

	update() {}
}

class Flag {
	static prefix = "assets/flag/";
	static suffix = ".png";
	static brazil = this.prefix + "brazil" + this.suffix;
	static england = this.prefix + "england" + this.suffix;
	static germany = this.prefix + "germany" + this.suffix;
	static italy = this.prefix + "italy" + this.suffix;
	static japan = this.prefix + "japan" + this.suffix;
	static netherlands = this.prefix + "netherlands" + this.suffix;
	static portugal = this.prefix + "portugal" + this.suffix;
	static spain = this.prefix + "spain" + this.suffix;

	constructor(x, y, source, scale = 1) {
		this.x = x;
		this.y = y;
		this.width = 231 * scale;
		this.height = 162 * scale;
		this.image = new Image(this.width, this.height);
		this.image.src = source;
	}

	draw(ctx) {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
}

class Gawang {
	constructor(x, y, scale = 1, mirror = false) {
		this.x = x;
		this.y = y;
		this.width = 198 * scale;
		this.height = 373 * scale;
		this.source = mirror ? "assets/sprites/goal-side-b.png" : "assets/sprites/goal-side-a.png";
		this.image = new CanvasImage(this.x, this.y, this.width, this.height, this.source);
	}

	draw(ctx) {
		this.image.draw(ctx);
	}
}

class PlayerAnimation {
	static Idle = { name: "Idle", max: 18 };
	static Jump = { name: "Jump", max: 4 };
	static Kick = { name: "Kick", max: 8 };
	static Move_Backward = { name: "Move Backward", max: 9 };
	static Move_Forward = { name: "Move Forward", max: 9 };
	static Falling_Down = { name: "Falling Down", max: 4 };

	static getStepFormat(step) {
		return step.toString().padStart(3, "0");
	}
}

class Player {
	animation_step = 0;

	constructor(x, y, playerFlag, scale = 1, velocity = { x: 0, y: 0 }) {
		this.defaultY = y;
		this.x = x;
		this.y = y;
		this.playerFlag = playerFlag;
		this.animation = PlayerAnimation.Idle;
		this.scale = scale;
		this.velocity = velocity;
		this.width = 360 * this.scale;
		this.height = 360 * this.scale;
		this.animationProgressDuration = 0;

		this.image = new Image(this.width, this.height);
		this.updateImage();
	}

	updateImage() {
		this.image.src = `assets/characters/${this.playerFlag}/${this.animation.name}/${
			this.animation.name
		}_${PlayerAnimation.getStepFormat(this.animation_step)}.png`;
	}

	changeAnimation(animation) {
		this.animationProgressDuration = 0;
		if (this.animation.name !== animation.name) this.animation_step = 0;
		this.animation = animation;
	}

	async jump() {
		if (this.y == this.defaultY) {
			player.changeAnimation(PlayerAnimation.Jump);
			for (let i = 10; i > 0; i--) {
				this.y -= i * 2;
				await new Promise((resolve) => setTimeout(resolve, 20));
			}
			await new Promise((resolve) => setTimeout(resolve, 200));
			for (let i = 0; i <= 10; i++) {
				this.y += i * 2;
				await new Promise((resolve) => setTimeout(resolve, 20));
			}
		}
	}

	async kick() {
		if (this.animation.name != PlayerAnimation.Kick) {
			if (ball.x < player.x + player.width * 0.9 && ball.x > player.x) {
				for (let i = 37; i > 0; i--) {
					ball.x += i;
					ball.y -= i * 0.5;
					await new Promise((resolve) => setTimeout(resolve, 20));
				}
			}
			player.changeAnimation(PlayerAnimation.Kick);
			await new Promise((resolve) => setTimeout(resolve, 50 * 8));
			player.changeAnimation(PlayerAnimation.Idle);
		}
	}

	async update(ctx) {
		this.animationProgressDuration++;
		if (this.animation_step >= this.animation.max - 1) {
			this.animation_step = 0;
		} else {
			if (this.animationProgressDuration > 6) {
				this.animationProgressDuration = 0;
				this.animation_step += 1;
			}
		}

		if (ball.x < this.x + this.width * 0.75 && ball.x > this.x - 10 && ball.y < this.y + this.height - 10) {
			for (let i = 10; i > 0; i--) {
				ball.x += i;
				await new Promise((resolve) => setTimeout(resolve, 20));
			}
		}

		if (this.x > 30 && this.x < 825) this.x += this.velocity.x;
		if (this.x <= 30) this.x += 20;
		if (this.x >= 825) this.x -= 20;
		this.y += this.velocity.y;

		this.draw(ctx);
	}

	draw(ctx) {
		const image = new Image(this.width, this.height);
		image.src = `assets/characters/${this.playerFlag}/${this.animation.name}/${
			this.animation.name
		}_${PlayerAnimation.getStepFormat(this.animation_step)}.png`;
		ctx.drawImage(image, this.x, this.y, this.width, this.height);
	}
}

class Enemy {
	animation_step = 0;

	constructor(x, y, playerFlag, scale = 1, velocity = { x: 0, y: 0 }) {
		this.defaultY = y;
		this.x = x;
		this.y = y;
		this.playerFlag = playerFlag;
		this.scale = scale;
		this.animation = PlayerAnimation.Idle;
		this.velocity = velocity;
		this.width = 360 * this.scale;
		this.height = 360 * this.scale;
		this.animationProgressDuration = 0;

		this.image = new Image(this.width, this.height);
		this.updateImage();
	}

	updateImage() {
		this.image.src = `assets/characters/${this.playerFlag}/${this.animation.name}/${
			this.animation.name
		}_${PlayerAnimation.getStepFormat(this.animation_step)}.png`;
	}

	changeAnimation(animation) {
		if (this.animation.name !== animation.name) this.animation_step = 0;
		this.animation = animation;
	}

	async jump() {
		if (this.y == this.defaultY) {
			player.changeAnimation(PlayerAnimation.Jump);
			for (let i = 10; i > 0; i--) {
				this.y -= i * 2;
				await new Promise((resolve) => setTimeout(resolve, 20));
			}
			await new Promise((resolve) => setTimeout(resolve, 200));
			for (let i = 0; i <= 10; i++) {
				this.y += i * 2;
				await new Promise((resolve) => setTimeout(resolve, 20));
			}
		}
	}

	async kick() {
		if (this.animation.name != PlayerAnimation.Kick) {
			if (ball.x > enemy.x - 20) {
				for (let i = 37; i > 0; i--) {
					ball.x -= i;
					ball.y -= i * 0.5;
					await new Promise((resolve) => setTimeout(resolve, 20));
				}
			}
			enemy.changeAnimation(PlayerAnimation.Kick);
			await new Promise((resolve) => setTimeout(resolve, 50 * 8));
			enemy.changeAnimation(PlayerAnimation.Idle);
		}
	}

	async update(ctx) {
		this.animationProgressDuration++;
		if (this.animation_step >= this.animation.max - 1) {
			this.animation_step = 0;
		} else {
			if (this.animationProgressDuration > 6) {
				this.animationProgressDuration = 0;
				this.animation_step += 1;
			}
		}

		if (ball.x < this.x + this.width * 0.75 && ball.x > this.x - 10 && ball.y < this.y + this.height - 10) {
			for (let i = 10; i > 0; i--) {
				ball.x -= i;
				await new Promise((resolve) => setTimeout(resolve, 20));
			}
		}

		if (this.x > 30 && this.x < 825) this.x += this.velocity.x;
		if (this.x <= 30) this.x += 20;
		if (this.x >= 825) this.x -= 20;
		this.y += this.velocity.y;

		this.draw(ctx);
	}

	draw(ctx) {
		const image = new Image(this.width, this.height);
		image.src = `assets/characters/${this.playerFlag}/${this.animation.name}/${
			this.animation.name
		}_${PlayerAnimation.getStepFormat(this.animation_step)}.png`;
		ctx.save();
		ctx.scale(-1, 1);
		ctx.drawImage(image, -this.x - this.width, this.y, this.width, this.height);
		ctx.restore();
	}
}

class Ball {
	constructor(x, y, scale, velocity = { x: 0, y: 0 }) {
		this.x = x;
		this.y = y;
		this.velocity = velocity;
		this.width = 130 * scale;
		this.height = 130 * scale;
		this.gravityForce = 0;
		this.gravityStrength = 0.7;
		this.image = new Image(this.width, this.height);
		this.image.src = ["assets/sprites/Ball 01.png", "assets/sprites/Ball 02.png"][Math.floor(Math.random() * 2)];
	}

	draw(ctx) {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}

	update(ctx) {
		if (this.y < 447) {
			this.y += ++this.gravityForce * this.gravityStrength;
		} else {
			this.gravityForce = 0;
		}

		this.draw(ctx);
	}
}
