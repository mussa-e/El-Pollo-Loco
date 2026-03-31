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
    




function init(){

    canvas = document.getElementById("canvas");
    canvas.classList.remove("d-none");

    startScreen = document.getElementById("start-screen");
    startScreen.classList.add("d-none");
    
    world = new World(canvas, keyboard);

    canvas.addEventListener("click", (event) => {
    handleCanvasClick(event);
});
}


function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();

    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);

    checkFullscreenClick(x, y);
    checkSpeakerClick(x, y);
}


function checkFullscreenClick(x, y) {
    let fs = world.fullScreen;

    if (
        x >= fs.x &&
        x <= fs.x + fs.width &&
        y >= fs.y &&
        y <= fs.y + fs.height
    ) {
        toggleFullscreen();
    }
}


function toggleFullscreen() {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}


function checkSpeakerClick(x, y) {
    let sp = world.speaker;

    if (
        x >= sp.x &&
        x <= sp.x + sp.width &&
        y >= sp.y &&
        y <= sp.y + sp.height
    ) {
        sp.toggleSound();
    }
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


