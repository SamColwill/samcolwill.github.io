const worldwidth = 300;
const worldheight = 150;
var world;
var nextworld;

var running;

//initialse both world and nextworld
var world = new Array(worldwidth);
for (var i = 0; i < world.length; i++) {
    world[i] = new Array(worldheight);
}
var nextworld = new Array(worldwidth);
for (var i = 0; i < world.length; i++) {
    nextworld[i] = new Array(worldheight);
}

emptyworld();

function emptyworld() {
//sets every cell to false in both world and nextworld
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
}

function aliveordead(x, y) {
//function to determine whether each cell is dead or alive
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
        //console.log("(" + x + "," + y + ") died undercrowding. aliveneighbours:" + aliveneighbours);
        nextworld[x][y] = false;
    }
    
    if (world[x][y] == true && (aliveneighbours == 2 || aliveneighbours == 3)) {
    //if alive cell has two or three alive neightbours then it stays alive.
        //console.log("(" + x + "," + y + ") stayed alive. aliveneighbours:" + aliveneighbours);
        nextworld[x][y] = true;
    }

    if (world[x][y] == true && aliveneighbours > 3) {
    //if alive cell has more than three alive neightbours then it dies.
        //console.log("(" + x + "," + y + ") died overcrowding. aliveneighbours:" + aliveneighbours);
        nextworld[x][y] = false;
    }

    if (world[x][y] == false && aliveneighbours == 3) {
    //if dead cell has exactly three alive neightbours then it becomes alive.
        //console.log("(" + x + "," + y + ") alived. aliveneighbours:" + aliveneighbours);
        nextworld[x][y] = true;
    }
}

function gameoflifetick() {
//one tick/generation of the game of life
    console.log("gameoflife tick");
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
}

function startgameoflife() {
    running = setInterval(gameoflifetick, 200);
}

function stopgameoflife() {
    clearInterval(running);
}

function resetgameoflife() {
    stopgameoflife();
    emptyworld();
    gameoflifedisplay();
}

function addlife(lifeform) {
    stopgameoflife();
    var x = Math.floor(Math.random() * (worldwidth - 20)) + 10;
    var y = Math.floor(Math.random() * (worldheight - 20)) + 10;

    switch(lifeform) {
        case 'block':
            world[x][y] = true;
            world[x + 1][y] = true;
            world[x][y + 1] = true;
            world[x + 1][y + 1] = true;
            console.log("added block at (" + x + "," + y + ")");
            break;
        case 'toad':
            world[x + 2][y] = true;
            world[x][y + 1] = true;
            world[x + 3][y + 1] = true;
            world[x][y + 2] = true;
            world[x + 3][y + 2] = true;
            world[x + 1][y + 3] = true;
            console.log("added toad at (" + x + "," + y + ")");
            break;
        case 'light-weight spaceship':
            world[x + 2][y] = true;
            world[x + 3][y] = true;
            world[x][y + 1] = true;
            world[x + 1][y + 1] = true;
            world[x + 3][y + 1] = true;
            world[x + 4][y + 1] = true;
            world[x][y + 2] = true;
            world[x + 1][y + 2] = true;
            world[x + 2][y + 2] = true;
            world[x + 3][y + 2] = true;
            world[x + 1][y + 3] = true;
            world[x + 2][y + 3] = true;
            console.log("added light-weight spaceship at (" + x + "," + y + ")");
            break;
        case 'glider gun':
            if (x > worldwidth - 30) {
                x -= 20;
            }
            world[x + 24][y] = true;
            world[x + 22][y + 1] = true;
            world[x + 24][y + 1] = true;
            world[x + 12][y + 2] = true;
            world[x + 13][y + 2] = true;
            world[x + 20][y + 2] = true;
            world[x + 21][y + 2] = true;
            world[x + 34][y + 2] = true;
            world[x + 35][y + 2] = true;
            world[x + 11][y + 3] = true;
            world[x + 15][y + 3] = true;
            world[x + 20][y + 3] = true;
            world[x + 21][y + 3] = true;
            world[x + 34][y + 3] = true;
            world[x + 35][y + 3] = true;
            world[x][y + 4] = true;
            world[x + 1][y + 4] = true;
            world[x + 10][y + 4] = true;
            world[x + 16][y + 4] = true;
            world[x + 20][y + 4] = true;
            world[x + 21][y + 4] = true;
            world[x][y + 5] = true;
            world[x + 1][y + 5] = true;
            world[x + 10][y + 5] = true;
            world[x + 14][y + 5] = true;
            world[x + 16][y + 5] = true;
            world[x + 17][y + 5] = true;
            world[x + 22][y + 5] = true;
            world[x + 24][y + 5] = true;
            world[x + 10][y + 6] = true;
            world[x + 16][y + 6] = true;
            world[x + 24][y + 6] = true;
            world[x + 11][y + 7] = true;
            world[x + 15][y + 7] = true;
            world[x + 12][y + 8] = true;
            world[x + 13][y + 8] = true;
            console.log("added glider gun at (" + x + "," + y + ")");
            break;
    }

    gameoflifedisplay();
}

document.addEventListener("DOMContentLoaded", gameoflifedisplay);
function gameoflifedisplay() {
//displays the game of life on a canvas on the webpage
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