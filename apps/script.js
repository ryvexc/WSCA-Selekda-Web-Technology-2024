const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let painting = false;

const colors = {
	eraser: "white",
};

const brushSize = 1;

function startPosition(e) {
	painting = true;
	draw(e);
}

function endPosition() {
	painting = false;
	ctx.beginPath();
}

function draw(e) {
	if (!painting) return;

	ctx.lineWidth = brushSize;
	ctx.lineCap = "round";
	ctx.strokeStyle = "rgb(0,0,0)";

	const canvasClientRect = canvas.getBoundingClientRect();

	ctx.lineTo(e.clientX - canvasClientRect.x, e.clientY - canvasClientRect.y);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(e.clientX - canvasClientRect.x, e.clientY - canvasClientRect.y);
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
