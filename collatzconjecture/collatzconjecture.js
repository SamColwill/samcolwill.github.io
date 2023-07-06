const canvasname = "graph";
const canvaswidth = 1200;
const canvasheight = 600;

document.addEventListener("DOMContentLoaded", initialsecanvas);
function initialsecanvas() {
//initialise a blank canvas
    var canvas = document.getElementById(canvasname);
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, canvaswidth, canvasheight);

    drawcanvas(ctx);
}

function drawcanvas(ctx) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(50, 50, canvaswidth - 100, canvasheight - 100);
}

function drawaxis() {
    
}