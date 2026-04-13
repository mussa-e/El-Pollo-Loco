let canvas;
let world;
let keyboard = new Keyboard();
let ctx;
let gameStarted = false;
let gameOver = false;
let gameState = "menu"; 
    

function init(){ 
    gameState = "playing";

    canvas = document.getElementById("canvas"); 
    canvas.classList.remove("d-none"); 

    startScreen = document.getElementById("start-screen"); 
    startScreen.classList.add("d-none"); 

    world = new World(canvas, keyboard); 

    
    canvas.addEventListener("mousemove", (e) => { 
        const rect = canvas.getBoundingClientRect(), 
        x = (e.clientX - rect.left) * (canvas.width / rect.width), 
        y = (e.clientY - rect.top) * (canvas.height / rect.height); 
        canvas.style.cursor = (isMouseOver(world.speaker, x, y) 
        || isMouseOver(world.fullScreen, x, y)) ? "pointer" : "default"; 
    }); 
    
    function isMouseOver(obj, x, y) { 
        return x >= obj.x && x <= obj.x + obj.width 
        && y >= obj.y && y <= obj.y + obj.height; } 
    }


function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();

    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);

    let fs = world.fullScreen;
    let sp = world.speaker;

    if (
        x >= fs.x &&
        x <= fs.x + fs.width &&
        y >= fs.y &&
        y <= fs.y + fs.height
    ) {
        if (!document.fullscreenElement) {
            canvas.requestFullscreen().catch(err => console.log(err));
        } else {
            document.exitFullscreen();
        }
        return; 
    }

    
    if (
        x >= sp.x &&
        x <= sp.x + sp.width &&
        y >= sp.y &&
        y <= sp.y + sp.height
    ) {
        sp.toggleSound();
    }
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


// window.addEventListener("keydown", (e) => {

//     if (gameOver) return;

//     if (e.keyCode == 39){
//         keyboard.RIGHT = true;
//     }

//     if (e.keyCode == 37){
//         keyboard.LEFT = true;
//     }

//     if (e.keyCode == 38){
//         keyboard.UP = true;
//     }

//     if (e.keyCode == 40){
//         keyboard.DOWN = true;
//     }

//     if (e.keyCode == 32){
//         keyboard.SPACE = true;
//     }

//     if (e.keyCode == 68){
//         keyboard.D = true;
//     }
    
// });

// window.addEventListener("keyup", (e) => {

//     if (e.keyCode == 39){
//         keyboard.RIGHT = false;
//     }

//     if (e.keyCode == 37){
//         keyboard.LEFT = false;
//     }

//     if (e.keyCode == 38){
//         keyboard.UP = false;
//     }

//     if (e.keyCode == 40){
//         keyboard.DOWN = false;
//     }

//     if (e.keyCode == 32){
//         keyboard.SPACE = false;
//     }

//     if (e.keyCode == 68){
//         keyboard.D = false;
//     }
// });


function restartGame() {
    resetGame();
    showMenu();
}


function resetGame() {
    gameOver = false;

    if (world) {
        world.stop(); 
    }

    world = null;

    document.getElementById("canvas").classList.add("d-none");
    document.getElementById("lose-screen").classList.add("d-none");
    document.getElementById("win-screen").classList.add("d-none");
    document.getElementById("game-container").classList.remove("d-none");
}


function showMenu() {
    gameState = "menu";
    document.getElementById("start-screen").classList.remove("d-none");
}


canvas = document.getElementById("canvas");
canvas.addEventListener("click", (event) => {
    handleCanvasClick(event);
});

