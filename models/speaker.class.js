class Speaker extends DrawableObject {
    IMAGES_ON = ["img/0_icons/volume_on.png"];
    IMAGES_OFF = ["img/0_icons/volume_off.png"];
    isMuted = false;
    audioBG = new Audio("audio/banjodoline.mp3");

    
    constructor() {
        super();
        // this.loadImage(this.IMAGES_ON);
        if (this.isMuted) {
            this.loadImage(this.IMAGES_OFF);
        } else {
            this.loadImage(this.IMAGES_ON);
        }

        const savedState = localStorage.getItem("isMuted");
        this.isMuted = savedState === null ? false : JSON.parse(savedState);

        this.x = 620;
        this.y = 10;
        this.width = 35;
        this.height = 35;
        this.audioBG.loop = true;
    }
    

    /**
     * Toggles the sound state between soundOn and soundOff.
     */
    applySoundState() {
        if (this.isMuted) {
            this.soundOff();
        } else {
            this.soundOn();
        }
    }


    /**
     * Toggles the sound state between muted and unmuted.
     * Calls the appropriate method to enable or disable audio.
     */
    toggleSound() {
        this.isMuted = !this.isMuted;
        localStorage.setItem("isMuted", JSON.stringify(this.isMuted));
        this.applySoundState();
    }
    

    /**
     * Disables all game sounds and switches the speaker icon to "off".
     * Pauses background music and disables sound flags for world entities.
     */
    soundOff() {
        this.loadImage(this.IMAGES_OFF);
        this.audioBG.pause();
        world.soundWanted = false;
        world.character.audioSnoring.pause();

        world.level.enemies.forEach(enemy => {
            enemy.soundWanted = false;
        });
    }


    /**
     * Enables all game sounds and switches the speaker icon to "on".
     * Starts background music and enables sound flags for world entities.
     */
    soundOn() {
        this.loadImage(this.IMAGES_ON);
        this.audioBG.play().catch(() => {});
        this.audioBG.volume = 0.2;
        world.character.soundWanted = true;
        world.soundWanted = true;

        world.level.enemies.forEach(enemy => {
            enemy.soundWanted = true;
        });
    }
}
