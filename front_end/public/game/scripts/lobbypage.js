const form = document.getElementById("form");
const usernameInput = document.getElementById("usernameInput");
const playGameBtn = document.getElementById("playGame");

const instructions = document.getElementById("instructions");
const openInstruction = document.getElementById("openInstruction");
const closeInstruction = document.getElementById("closeInstruction");

function getValue(inputElem) {
	return inputElem.value.trim();
}

form.addEventListener("submit", (ev) => {
	ev.preventDefault();

	const formData = {
		username: "",
		country: "",
		opponentCountry: "",
		level: "",
		ball: "",
	};

	formData.username = getValue(ev.target.username);
	formData.country = getValue(ev.target.country);
	formData.opponentCountry = getValue(ev.target.opponentCountry);
	formData.level = getValue(ev.target.level);
	formData.ball = getValue(ev.target.ball);

	localStorage.setItem("formData", JSON.stringify(formData));

	window.location.href = "/game";
});
usernameInput.addEventListener("input", () => {
	playGameBtn.disabled = usernameInput.value.trim() === "";
});

openInstruction.addEventListener("click", () => {
	instructions.classList.toggle("hidden");
});
closeInstruction.addEventListener("click", () => {
	instructions.classList.toggle("hidden");
});

if (localStorage.getItem("formData")) {
	if (confirm("Use previous data?")) {
		window.location.href = "/game";
	}
}
