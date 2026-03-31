class Speaker extends DrawableObject {
    IMAGES_ON = ["img/0_icons/volume_on.png"];
    IMAGES_OFF = ["img/0_icons/volume_off.png"];

    isMuted = true;
    audio = new Audio("audio/banjodoline.mp3");

    constructor() {
        super();
        this.loadImage(this.IMAGES_OFF);
        this.x = 620;
        this.y = 10;
        this.width = 35;
        this.height = 35;

        this.audio.loop = true;
    }

    toggleSound() {
        this.isMuted = !this.isMuted;

        if (this.isMuted) {
            this.loadImage(this.IMAGES_OFF);
            this.audio.pause();
        } else {
            this.loadImage(this.IMAGES_ON);
            this.audio.play();
            this.audio.volume = 0.4;
        }
    }
}