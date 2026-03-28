let canvas;
let world;
let keyboard = new Keyboard();
let ctx;
let gameStarted = false;

let colors = {
  0: "rgb(253,229,142)",
  1: "rgb(85,182,212)",
  2: "rgb(176,212,227)",
  3: "rgb(160,34,10)",
  4: "rgb(232,68,129)",
  5: "rgb(199,103,88)",
  6: "rgb(245,177,92)",
  7: "rgb(67,145,41)",
  8: "rgb(234,142,68)"
};
    

function showStartScreen(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    drawStartScreen();
    canvas.addEventListener("click", startGame);
}


function drawStartScreen(){
    ctx.fillStyle = colors[3];
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = colors[0];
    ctx.font = "40px Rye";
    ctx.textAlign = "center";
    ctx.fillText("el pollo loco", canvas.width / 2, 150);

    ctx.font = "24px Rye";
    ctx.fillText("Click to Start", canvas.width / 2, 250);
}


function startGame(){
    if (gameStarted) return; // verhindert mehrfaches Starten
    gameStarted = true;

    canvas.removeEventListener("click", startGame);

    init();
}


function init(){
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}


window.addEventListener("keydown", (e) => {

    if (e.keyCode == 39){
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37){
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38){
        keyboard.UP = true;
    }

    if (e.keyCode == 40){
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32){
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68){
        keyboard.D = true;
    }
    
});

window.addEventListener("keyup", (e) => {

    if (e.keyCode == 39){
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37){
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38){
        keyboard.UP = false;
    }

    if (e.keyCode == 40){
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32){
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68){
        keyboard.D = false;
    }
});