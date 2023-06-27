const worldwidth = 300;
const worldheight = 150;

//initialse both world and nextworld
var world = new Array(worldwidth);
for (var i = 0; i < world.length; i++) {
    world[i] = new Array(worldheight);
}
var nextworld = new Array(worldwidth);
for (var i = 0; i < world.length; i++) {
    nextworld[i] = new Array(worldheight);
}

//set every cell to false in both world and nextworld
for (var i = 0; i < worldwidth; i++) {
    for (var j = 0; j < worldheight; j++) {
        world[i][j] = false;
    }
}
for (var i = 0; i < worldwidth; i++) {
    for (var j = 0; j < worldheight; j++) {
        nextworld[i][j] = false;
    }
}

//Testing Shapes

//still lifes - block
///*
world[100][75] = true;
world[101][75] = true;
world[100][76] = true;
world[101][76] = true;
//*/

//still lifes - bee-hive
///*
world[53][50] = true;
world[54][50] = true;
world[52][51] = true;
world[55][51] = true;
world[53][52] = true;
world[54][52] = true;
//*/

//oscillators - blinker
///*
world[149][155] = true;
world[149][156] = true;
world[149][157] = true;
//*/

//oscillators - toad
///*
world[53][50] = true;
world[54][50] = true;
world[52][51] = true;
world[55][51] = true;
world[53][52] = true;
world[54][52] = true;
//*/

//spaceships - glider
///*
world[249][155] = true;
world[249][156] = true;
world[249][157] = true;
world[248][157] = true;
world[247][156] = true;
//*/

function gameoflifetick() {
    console.log("run gameoflife");
    for (var i = 0; i < worldwidth; i++) {
        for (var j = 0; j < worldheight; j++) {
            aliveordead(i, j);
        }
    }
    for (var i = 0; i < worldwidth; i++) {
        for (var j = 0; j < worldheight; j++) {
            world[i][j] = nextworld[i][j];
        }
    }
    gameoflifedisplay();
    console.log(world);
    console.log(nextworld);
}

function aliveordead(x, y) {
    var aliveneighbours = 0
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            var checkx = x + i;
            var checky = y + j;
            if (!(checkx < 0  || checkx > worldwidth - 1 || checky < 0 || checky > worldheight - 1)) {
            //if not out of bounds neighbour
                if (!(i == 0 && j ==0)) {
                //if not itself
                    if (world[x + i][y + j] == true) {
                        aliveneighbours += 1;
                    }
                }
            }
        }
    }

    //the 4 rules of conway's game of life

    if (world[x][y] == true && aliveneighbours < 2) {
    //if alive cell has less than two alive neighbours then it dies.
        console.log("(" + x + "," + y + ") died undercrowding. aliveneighbours:" + aliveneighbours);
        nextworld[x][y] = false;
    }
    
    if (world[x][y] == true && (aliveneighbours == 2 || aliveneighbours == 3)) {
    //if alive cell has two or three alive neightbours then it stays alive.
        console.log("(" + x + "," + y + ") stayed alive. aliveneighbours:" + aliveneighbours);
        nextworld[x][y] = true;
    }

    if (world[x][y] == true && aliveneighbours > 3) {
    //if alive cell has more than three alive neightbours then it dies.
        console.log("(" + x + "," + y + ") died overcrowding. aliveneighbours:" + aliveneighbours);
        nextworld[x][y] = false;
    }

    if (world[x][y] == false && aliveneighbours == 3) {
    //if dead cell has exactly three alive neightbours then it becomes alive.
        console.log("(" + x + "," + y + ") alived. aliveneighbours:" + aliveneighbours);
        nextworld[x][y] = true;
    }
}

//all following fucntions handle dispalying gameoflife

function gameoflifedisplay() {
    var gameoflifecanvas = document.getElementById("gameoflifecanvas");
    var ctx = gameoflifecanvas.getContext("2d");

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, 1600, 800);

    ctx.fillStyle = "rgb(0, 0, 0)";

    for (var i = 0; i < worldwidth; i++) {
        for (var j = 0; j < worldheight; j++) {
            if (world[i][j] == true) {
                ctx.fillRect(4 * i, 4 * j, 4, 4);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", gameoflifedisplay);
//Run above fucntion once the page has loaded.