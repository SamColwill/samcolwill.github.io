//Canvas Properties
const canvasname = "graph";
const canvaswidth = 1200;
const canvasheight = 600;

//Graph Properies
const border_to_axis = 25;

const origin_x = border_to_axis;
const origin_y = canvasheight - border_to_axis;

const x_axis_length = canvaswidth - (border_to_axis * 2);
const y_axis_length = canvasheight - (border_to_axis * 2);

const distance_between_plots = 10;

//Points Properties
var plot_count = 0;

var current_number = undefined;

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
    draw_axis(ctx);
}

function draw_axis(ctx) {
    //draw x axis
    draw_line(ctx, origin_x, origin_y, origin_x, origin_y - y_axis_length);
    draw_line(ctx, origin_x, origin_y, origin_x + x_axis_length, origin_y);
}

function draw_line(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
}

function plot() {
    var canvas = document.getElementById(canvasname);
    var ctx = canvas.getContext("2d");
    console.log(current_number);
    if (current_number == undefined) {
        current_number = jQuery('#startingnumber').val();
    }
    draw_line(ctx, origin_x + (distance_between_plots * plot_count), origin_y - current_number, origin_x + (distance_between_plots * (plot_count + 1)), origin_y - collatz_operation(current_number));
    current_number = collatz_operation(current_number);
    plot_count += 1;
}

function start_plot() {
    var plotting = setInterval(plot, 200);
}

function collatz_operation(number) {
    if(number % 2 == 0) {
        return number / 2;
    } else {
        return number * 3 + 1;
    }
}