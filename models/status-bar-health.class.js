class StatusBarHealth extends DrawableObject {

    IMAGES = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png"
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 39;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }


    /**
     * Updates the health status bar based on the given percentage.
     * Selects the appropriate image that represents the current health level.
     * @param {number} percentage - The current health percentage (0–100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[resolveImageIndex(this.percentage)];
        this.img = this.imageCache[path];
    }
}