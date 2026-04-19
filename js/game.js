let canvas;
let world;
let keyboard = new Keyboard();
let ctx;
let gameStarted = false;
let gameOver = false;
let gameState = "menu";
let fullscreenState;


/**
 * Initializes the game and starts the playing state.
 * Sets up canvas, hides menu and creates the world.
 * @function
 * @returns {void}
 */
function init() {
    gameState = "playing";

    setupCanvas();
    hideStartScreen();
    createWorld();
    registerCanvasEvents();
}


/**
 * Sets up the canvas element and registers basic events.
 * @function
 * @returns {void}
 */
function setupCanvas() {
    canvas = document.getElementById("canvas");
    canvas.classList.remove("d-none");

    canvas.addEventListener("contextmenu", (e) => e.preventDefault());
}


/**
 * Hides the start screen UI.
 * @function
 * @returns {void}
 */
function hideStartScreen() {
    let startScreen = document.getElementById("start-screen");
    startScreen.classList.add("d-none");
}


/**
 * Creates the game world instance.
 * @function
 * @returns {void}
 */
function createWorld() {
    world = new World(canvas, keyboard);
}


/**
 * Registers canvas-related event listeners.
 * @function
 * @returns {void}
 */
function registerCanvasEvents() {
    canvas.addEventListener("mousemove", handleMouseMove);
}


/**
 * Handles mouse movement over the canvas and updates cursor style.
 * @function
 * @param {MouseEvent} e - Mouse move event
 * @returns {void}
 */
function handleMouseMove(e) {
    const { x, y } = getMousePos(e);

    canvas.style.cursor = isOverInteractive(x, y)
        ? "pointer"
        : "default";
}


/**
 * Calculates the mouse position relative to the canvas.
 * @function
 * @param {MouseEvent} e - Mouse event
 * @returns {{x: number, y: number}} Scaled mouse coordinates
 */
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();

    return {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
}


/**
 * Checks if the mouse is over an interactive element.
 * @function
 * @param {number} x - Mouse x position
 * @param {number} y - Mouse y position
 * @returns {boolean} True if over interactive element
 */
function isOverInteractive(x, y) {
    return isMouseOver(world.speaker, x, y) ||
           isMouseOver(world.fullScreen, x, y);
}


/**
 * Checks if the mouse is over a given object.
 * @function
 * @param {{x: number, y: number, width: number, height: number}} obj - Target object
 * @param {number} x - Mouse x position
 * @param {number} y - Mouse y position
 * @returns {boolean} True if mouse is over object
 */
function isMouseOver(obj, x, y) {
    return x >= obj.x &&
           x <= obj.x + obj.width &&
           y >= obj.y &&
           y <= obj.y + obj.height;
}


/**
 * Handles click events on the canvas.
 * Triggers fullscreen toggle or sound toggle.
 * @function
 * @param {MouseEvent} event - Click event
 * @returns {void}
 */
function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);
    let fs = world.fullScreen;
    let sp = world.speaker;
    let container = document.getElementById("game-container")

    if (this.findFullscreenOnCanvas(x,y,fs)) {
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => console.log(err));
            fullscreenState = true;
        } else {
            document.exitFullscreen();
            fullscreenState = false;
        }
        checkFullscreenState();
        return; 
    }

    if (this.findSpeakerOnCanvas(x,y,sp)) {
        sp.toggleSound();
    }
}


/**
 * Checks whether a given point is inside the fullscreen button area.
 * @param {number} x - X coordinate of the pointer.
 * @param {number} y - Y coordinate of the pointer.
 * @param {Object} fs - Fullscreen object with position and size.
 * @returns {boolean} True if the point is inside the fullscreen area.
 */
function findFullscreenOnCanvas(x,y,fs){
    return x >= fs.x &&
        x <= fs.x + fs.width &&
        y >= fs.y &&
        y <= fs.y + fs.height
}


/**
 * Checks whether a given point is inside the speaker (audio) button area.
 * @param {number} x - X coordinate of the pointer.
 * @param {number} y - Y coordinate of the pointer.
 * @param {Object} sp - Speaker object with position and size.
 * @returns {boolean} True if the point is inside the speaker area.
 */
function findSpeakerOnCanvas(x,y,sp){
    return x >= sp.x &&
        x <= sp.x + sp.width &&
        y >= sp.y &&
        y <= sp.y + sp.height
}


/**
 * Checks if fullscreen button was clicked.
 * @function
 * @param {number} x - Mouse x position
 * @param {number} y - Mouse y position
 * @returns {void}
 */
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


/**
 * Toggles fullscreen mode for the canvas.
 * @function
 * @returns {void}
 */
function toggleFullscreen() {
    let container = document.getElementById("game-container");

    if (!document.fullscreenElement) {
        container.requestFullscreen();
        fullscreenState = true;
    } else {
        document.exitFullscreen();
        fullscreenState = false;
    }

    checkFullscreenState();
}


/**
 * checks the state of fullscreen and changes css property of canvas.
 */
function checkFullscreenState(){
    if (fullscreenState == true){
        canvas.classList.add("fs-mesure");
    }
    if (fullscreenState == false){
        canvas.classList.remove("fs-mesure");
    }
}


/**
 * Checks if speaker button was clicked.
 * @function
 * @param {number} x - Mouse x position
 * @param {number} y - Mouse y position
 * @returns {void}
 */
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


/**
 * Returns to the main menu and resets the game.
 * @function
 * @returns {void}
 */
function backToMenu() {
    resetGame();
    showMenu();
}


/**
 * Restarts the game from scratch.
 * @function
 * @returns {void}
 */
function restartGame() {
    resetGame();
    init();
}


/**
 * Resets the game state and stops the current world.
 * @function
 * @returns {void}
 */
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


/**
 * Displays the main menu.
 * @function
 * @returns {void}
 */
function showMenu() {
    gameState = "menu";
    document.getElementById("start-screen").classList.remove("d-none");
}


/**
 * Global click listener for the canvas.
 */
canvas = document.getElementById("canvas");
canvas.addEventListener("click", (event) => {
    handleCanvasClick(event);
});