const worldwidth = 300;
const worldheight = 150;
var world;
var nextworld;

var running = false;
var runfunction;
var gamespeed = 200;

var worldmouseposx = 0;
var worldmouseposy = 0;

var drawshape = "square";
var drawsize = 1;

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
    if(running == false) {
        runfunction = setInterval(gameoflifetick, gamespeed);
        running = true;
    }
}

function decreasegameoflifespeed() {
    if(gamespeed < 500) {
        if(running = true) {
            clearInterval(runfunction);
            running = false;
        }
        gamespeed += 10;
        updategamespeed();
        runfunction = setInterval(gameoflifetick, gamespeed);
        running = true;
    }
}

function increasegameoflifespeed() {
    if(gamespeed > 10) {
        if(running = true) {
            clearInterval(runfunction);
            running = false;
        }
        gamespeed -= 10;
        updategamespeed();
        runfunction = setInterval(gameoflifetick, gamespeed);
        running = true;
    }
}

function resetgameoflifespeed() {
    gamespeed = 200;
    updategamespeed();
}

function updategamespeed() {
    if(gamespeed < 100) {
        jQuery('#gamespeed').attr("value", " " + gamespeed)
    } else {
        jQuery('#gamespeed').attr("value", gamespeed)
    }
}

function stopgameoflife() {
    if(running = true) {
        clearInterval(runfunction);
        running = false;
    }
}

function cleargameoflife() {
    stopgameoflife();
    emptyworld();
    gameoflifedisplay();
    clearInterval(runfunction);
    running = false;
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

jQuery(document).ready(function () {
    var canvaspos = jQuery("#gameoflifecanvas").position();
    jQuery(document).on("mousemove", function (event) {
        worldmouseposx = ((event.pageX - 2 - canvaspos.left) / 4).toFixed(0);
        worldmouseposy = ((event.pageY - 2 - canvaspos.top) / 4).toFixed(0);
    });

    jQuery("#gameoflifecanvas").mousedown(function () {
        if(running = true) {
            clearInterval(runfunction);
            running = false;
        }
        drawshapefunction(worldmouseposx, worldmouseposy)
        gameoflifedisplay();
    });

    function drawshapefunction(x, y) {
        switch(drawshape) {
            case "square":
                console.log("here")
                switch(drawsize) {
                    case 1:
                        world[parseInt(worldmouseposx)][parseInt(worldmouseposy)] = !world[parseInt(worldmouseposx)][parseInt(worldmouseposy)];
                        break;
                    case 2:
                        if(world[parseInt(worldmouseposx)][parseInt(worldmouseposy)] == false) {
                            world[parseInt(worldmouseposx) - 1][parseInt(worldmouseposy) - 1] = true;
                            world[parseInt(worldmouseposx) - 1][parseInt(worldmouseposy)] = true;
                            world[parseInt(worldmouseposx) - 1][parseInt(worldmouseposy) + 1] = true;
                            world[parseInt(worldmouseposx)][parseInt(worldmouseposy) - 1] = true;
                            world[parseInt(worldmouseposx)][parseInt(worldmouseposy)] = true;
                            world[parseInt(worldmouseposx)][parseInt(worldmouseposy) + 1] = true;
                            world[parseInt(worldmouseposx) + 1][parseInt(worldmouseposy) - 1] = true;
                            world[parseInt(worldmouseposx) + 1][parseInt(worldmouseposy)] = true;
                            world[parseInt(worldmouseposx) + 1][parseInt(worldmouseposy) + 1] = true;
                        } else {
                            world[parseInt(worldmouseposx) - 1][parseInt(worldmouseposy) - 1] = false;
                            world[parseInt(worldmouseposx) - 1][parseInt(worldmouseposy)] = false;
                            world[parseInt(worldmouseposx) - 1][parseInt(worldmouseposy) + 1] = false;
                            world[parseInt(worldmouseposx)][parseInt(worldmouseposy) - 1] = false;
                            world[parseInt(worldmouseposx)][parseInt(worldmouseposy)] = false;
                            world[parseInt(worldmouseposx)][parseInt(worldmouseposy) + 1] = false;
                            world[parseInt(worldmouseposx) + 1][parseInt(worldmouseposy) - 1] = false;
                            world[parseInt(worldmouseposx) + 1][parseInt(worldmouseposy)] = false;
                            world[parseInt(worldmouseposx) + 1][parseInt(worldmouseposy) + 1] = false;
                        }
                        break;
                }
                break;
            case "circle":
                switch(drawsize) {
                    case 1:
                        world[parseInt(worldmouseposx)][parseInt(worldmouseposy)] = !world[parseInt(worldmouseposx)][parseInt(worldmouseposy)];
                        break;
                    case 2:
                        if(world[parseInt(worldmouseposx)][parseInt(worldmouseposy)] == false) {
                            world[parseInt(worldmouseposx) - 1][parseInt(worldmouseposy)] = true;
                            world[parseInt(worldmouseposx)][parseInt(worldmouseposy) - 1] = true;
                            world[parseInt(worldmouseposx)][parseInt(worldmouseposy)] = true;
                            world[parseInt(worldmouseposx)][parseInt(worldmouseposy) + 1] = true;
                            world[parseInt(worldmouseposx) + 1][parseInt(worldmouseposy)] = true;
                        } else {
                            world[parseInt(worldmouseposx) - 1][parseInt(worldmouseposy)] = false;
                            world[parseInt(worldmouseposx)][parseInt(worldmouseposy) - 1] = false;
                            world[parseInt(worldmouseposx)][parseInt(worldmouseposy)] = false;
                            world[parseInt(worldmouseposx)][parseInt(worldmouseposy) + 1] = false;
                            world[parseInt(worldmouseposx) + 1][parseInt(worldmouseposy)] = false;
                        }
                        break;
                }
                break;
        }
    }
});

function decreasedrawsize() {
    if(drawsize > 1) {
        drawsize -= 1;
    }
    updatedrawoption()
}

function increasedrawsize() {
    if(drawsize < 2) {
        drawsize += 1;
    }
    updatedrawoption()
}

function changedrawshape() {
    if (drawshape == "square") {
        drawshape = "circle";
    } else {
        drawshape = "square";
    }
    updatedrawoption()
}

function updatedrawoption() {
    jQuery('#drawoption').attr("value", drawshape.toString() + " " + drawsize);
}