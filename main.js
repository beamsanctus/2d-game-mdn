const canvas = document.getElementById("myCanvas");     // get canvas ref
const ctx = canvas.getContext("2d");                    // get rendering context for painting

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

function drawBall() {
    // draw ball
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);                // arc(x, y, radius, startAngle, endAngle, [opt] counterclockwise=true) // 1PI = 180 deg
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    // clear canvas every frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
}
setInterval(draw, 10);                                  //  draw every 10 millisec