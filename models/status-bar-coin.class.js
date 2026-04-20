class StatusBarCoin extends DrawableObject {

    IMAGES = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png"
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 82;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }


    /**
     * Updates the coin status bar according to the given percentage.
     * Selects and applies the appropriate image based on progress.
     * @param {number} percentage - The current coin percentage value.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[resolveImageIndex(this.percentage)];
        this.img = this.imageCache[path];
    }
}