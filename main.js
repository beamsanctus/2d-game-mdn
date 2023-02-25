const canvas = document.getElementById("myCanvas");         // get canvas ref
const ctx = canvas.getContext("2d");                        // get rendering context for painting

let x = canvas.width / 2;
let y = canvas.height - 30;

// ball speed
let dx = 2;
let dy = -2;

const ballRadius = 10;

// paddle properties
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;             // define starting x point of paddle. // align center on horizontal

// control
let rightPressed = false;
let leftPressed = false;


// key press listener
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX,
        canvas.height - paddleHeight,                       // make Paddle move to bottom of canvas
        paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    // draw ball
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);              // arc(x, y, radius, startAngle, endAngle, [opt] counterclockwise=true) // 1PI = 180 deg
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    // clear canvas every frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle();
    drawBall();

    // Ball Part
    // check wall collision
    // check right and left 
    if (x + dx > canvas.width - ballRadius || x + dx < 0 + ballRadius) {
        dx = -dx;                                           // reverse ball direction
    }
    // check top and bottom
    if (y + dy > canvas.height - ballRadius || y + dy < 0 + ballRadius) {
        dy = -dy;                                           // reverse ball direction
    }
    // move ball
    x += dx;
    y += dy;

    // Paddle Part
    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, 
            canvas.width - paddleWidth);                    // prevent paddle move out of canvas on the right
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 
            0);                                             // prevent paddle move out of canvas on the left
    }
    
}


setInterval(draw, 10);                                      //  draw every 10 millisec