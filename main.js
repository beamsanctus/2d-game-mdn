const canvas = document.getElementById("myCanvas");     // get canvas ref
const ctx = canvas.getContext("2d");                    // get rendering context for painting

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

const ballRadius = 10;

function drawBall() {
    // draw ball
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);            // arc(x, y, radius, startAngle, endAngle, [opt] counterclockwise=true) // 1PI = 180 deg
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    // clear canvas every frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();

    // check wall collision
    // check right and left 
    if (x + dx > canvas.width - ballRadius || x + dx < 0 + ballRadius) {
        dx = -dx;                                       // reverse ball direction
    }
    // check top and bottom
    if (y + dy > canvas.height - ballRadius || y + dy < 0 + ballRadius) {
        dy = -dy;                                       // reverse ball direction
    }

    // move ball
    x += dx;
    y += dy;
}
setInterval(draw, 10);                                  //  draw every 10 millisec