const canvas = document.getElementById("myCanvas");         // get canvas ref
const ctx = canvas.getContext("2d");                        // get rendering context for painting

// ball position
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

// brick properties
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };           // status 1 = alive, 0 = dead(destroy)
    }
}

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

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {                // check is brick destroyed or not 0 = destroyed
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];                         // Store All Bricks
            // calculations
            // if center of ball is inside the coordinates of one bricks -> change ball direction
            /*
                The x position of the ball is greater than the x position of the brick.
                The x position of the ball is less than the x position of the brick plus its width.
                The y position of the ball is greater than the y position of the brick.
                The y position of the ball is less than the y position of the brick plus its height.
            */
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                dy = -dy;
                b.status = 0;                               // this brick is destroyed
            }
        }
    }
}

function draw() {
    // clear canvas every frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawPaddle();
    drawBall();
    collisionDetection();

    // Ball Part
    // check wall collision
    // check right and left 
    if (x + dx > canvas.width - ballRadius || x + dx < 0 + ballRadius) {
        dx = -dx;                                           // reverse ball direction
    }

    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) { // is ball x position inside paddle width
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
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


const interval = setInterval(draw, 10);                                      //  draw every 10 millisec