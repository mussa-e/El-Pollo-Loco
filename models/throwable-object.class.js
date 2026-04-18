class ThrowableObject extends MovableObject {
    soundBottleBreak = new Audio("audio/bottle-breaking.mp3");
    hasPlayedSound = false;
    world;

    IMAGES_THROW = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    IMAGES_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    constructor(x, y) {
        super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    /**
     * Initiates the throwing behavior of the object.
     * Applies upward force, gravity, and horizontal movement while playing animation.
     */
    throw() {
        this.hasPlayedSound = true;

        this.throwInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_THROW);
        }, 80);

        this.speedY = 30;
        this.applyGravity();

        this.moveInterval = setInterval(() => {
            this.x += 10;
        }, 25);
    }

    /**
     * Stops all intervals related to the throwing motion and animation.
     */
    stopThrow() {
        clearInterval(this.throwInterval);
        clearInterval(this.moveInterval);
    }

    /**
     * Plays the splash animation and triggers the bottle breaking sound effect.
     * Sound is played only once per throw based on sound settings.
     */
    splash() {
        if (world.soundWanted == true && this.hasPlayedSound == true) {
            this.soundBottleBreak.play();
            this.hasPlayedSound = false;
        }

        let i = 0;
        let splashInterval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_SPLASH[i]];
            i++;

            if (i >= this.IMAGES_SPLASH.length) {
                clearInterval(splashInterval);
            }
        }, 80);
    }
}

