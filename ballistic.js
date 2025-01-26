// Canvas setup
const canvas = document.createElement("canvas");
canvas.width = 1920;
canvas.height = 1080;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height); // Draws a white 800x800 square

// Utility functions
function randomColor() {
    return `rgb(${Math.floor(Math.random() * 156 + 100)}, ${Math.floor(Math.random() * 156 + 100)}, ${Math.floor(Math.random() * 156 + 100)})`;
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}


function update() {

}

function draw() {

    // the phone overlay:
    ctx.beginPath();
    ctx.fillStyle = "black"; // Fill with grey
    dimension_scale = 42;
    phone_case = 50;
    ctx.rect(
        960 - (9 * dimension_scale) / 2 - phone_case,
        450 - (16 * dimension_scale) / 2 - phone_case,
        9 * dimension_scale + phone_case * 2,
        16 * dimension_scale + phone_case * 2
    );
    ctx.fill(); // Fill the rectangle
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "white"; // Fill with white
    ctx.rect(
        960 - (9 * dimension_scale) / 2,
        450 - (16 * dimension_scale) / 2,
        9 * dimension_scale,
        16 * dimension_scale
    );
    ctx.fill(); // Fill the rectangle
    ctx.strokeStyle = "white";
    ctx.stroke();

    ctx.fillStyle = "black"; // Text color
    ctx.font = "24px Arial"; // Font size and family
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.textBaseline = "middle"; // Center the text vertically
    ctx.fillText("Hello, Canvas!", 960, 450); // Draw the text at the center of the canvas

}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();
