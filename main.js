const canvas = document.getElementById("myCanvas");     // get canvas ref
const ctx = canvas.getContext("2d");                    // get rendering context for painting

// draw red rectangle
ctx.beginPath();
ctx.rect(20, 40, 50, 50);                               // rect(top, left, width, height)
ctx.fillStyle = "#FF0000";                              // red color
ctx.fill();                                             // paint all
ctx.closePath();

// draw green circle
ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI * 2, false);           // arc(x, y, radius, startAngle, endAngle, counterclockwise=true) // 1PI = 180 deg
ctx.fillStyle = "green";
ctx.fill();                                             // paint all
ctx.closePath();

// draw blue rectangle just stroke
ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();                                           // draw stroke
ctx.closePath();