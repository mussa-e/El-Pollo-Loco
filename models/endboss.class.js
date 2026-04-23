class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    hits = 0;
    maxHits = 10;
    audioBottleHit = new Audio("audio/chicken1.mp3");
    audioAlert = new Audio("audio/highnoon.mp3");
    audioWin = new Audio("audio/orchestral-win.mp3");
    audioEndbossBoost = new Audio("audio/endboss-alarm-1.mp3");
    energy = 160;

    offset = {
        top: 50,
        left: 30,
        right: 30,
        bottom: 20
    };

    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png",

        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    IMAGES_ALERT = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.x = 2200;
        this.speed = 4;
        this.isDead = false;
        this.isActivated = false;
    }


    animate() {
        this.moveInterval = setInterval(() => {
            if (!this.isDead && this.isActivated) {
                this.followCharacter();
            }
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);

        this.boostInterval = setInterval(() => {
            this.endbossBoost();
        }, 3000);
    }


        followCharacter() {
        let character = this.world.character;
        let distance = character.x - this.x;

        let stopDistance = 100;

        if (Math.abs(distance) > stopDistance) {
            if (distance < 0) {
                this.moveLeft();
                this.otherDirection = false;
            } else {
                this.moveRight();
                this.otherDirection = true;
            }
        }
    }


    /**
     * Activates a boost for the endboss based on his direction.
     */
    endbossBoost(){
        if(this.isDead){return};
        
        if(this.world.character.x < this.x){
            this.x -= 80;
        }
        else{
            this.x += 80;
        }
        
        if (this.world.soundWanted == true && this.x >= 100) {
            this.audioEndbossBoost.play();
        }
    }

    
    /**
     * Applies damage to the endboss, plays hit sound if enabled,
     * and triggers hurt animation. If enough hits are reached,
     * the boss dies.
     */
    takeHit() {
        this.hits++;
        this.world.statusBarEndboss.setPercentage(this.energy -= 10);

        if (this.world.soundWanted == true) {
            this.audioBottleHit.play();
        }

        let i = 0;
        this.hurtInterval = setInterval(() => {
            if (i < this.IMAGES_HURT.length) {
                this.img = this.imageCache[this.IMAGES_HURT[i]];
                i++;
            } else {
                clearInterval(this.hurtInterval);
            }
        }, 500);

        if (this.hits >= 15) {
            this.die();
            this.world.character.audioSnoring.pause();
        }
    }


    /**
     * Triggers the death sequence of the endboss including animation,
     * stopping movement and showing the win screen.
     */
    die() {
        this.isDead = true;
        this.audioEndbossBoost.pause();

        clearInterval(this.animationInterval);

        let i = 0;
        this.deathInterval = setInterval(() => {
            if (i < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[i]];
                i++;
                this.y = 140;
            } else {
                clearInterval(this.deathInterval);
            }
        }, 800);

        this.showWinScreen();
    }


    /**
     * Plays a one-time animation sequence using the given images.
     * @param {string[]} images - Array of image paths.
     * @param {number} intervalTime - Time between frames in ms.
     */
    playAnimationOnce(images, intervalTime = 150) {
        let i = 0;

        let interval = setInterval(() => {
            if (i < images.length) {
                let path = images[i];
                this.img = this.imageCache[path];
                i++;
            } else {
                clearInterval(interval);
            }
        }, intervalTime);
    }


    /**
     * Displays the win screen after the boss is defeated.
     * Handles UI changes, fullscreen exit, and win audio.
     */
    showWinScreen() {
        gameState = "win";

        const canvas = document.getElementById("canvas");
        const winScreen = document.getElementById("win-screen");
        const gameContainer = document.getElementById("game-container");

        this.audioEndbossBoost.pause();

        setTimeout(() => {
            this.exitFullscreenIfNeeded();
            this.toggleEndscreen(canvas, gameContainer, winScreen);
            this.handleWinAudio();
        }, 2000);
    }


    /**
     * Exits fullscreen mode if the game is currently in fullscreen.
     */
    exitFullscreenIfNeeded() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }


    /**
     * Toggles visibility of game and win screen elements.
     * @param {HTMLElement} canvas - Game canvas element.
     * @param {HTMLElement} gameContainer - Main game container.
     * @param {HTMLElement} winScreen - Win screen overlay.
     */
    toggleEndscreen(canvas, gameContainer, winScreen) {
        winScreen.classList.remove("d-none");
        canvas.classList.add("d-none");
        gameContainer.classList.add("d-none");
    }


    /**
     * Handles background music and win sound playback after victory.
     */
    handleWinAudio() {
        this.world.speaker.audioBG.pause();

        if (this.world.soundWanted) {
            this.audioWin.volume = 0.3;
            this.audioWin.play();
        }
    }


    /**
     * Stops all running intervals for movement and animation.
     */
    stop() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
        clearInterval(this.boostInterval);
    }
}
