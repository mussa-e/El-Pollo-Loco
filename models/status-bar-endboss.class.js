class StatusBarEndboss extends DrawableObject {

    IMAGES = [
        "img/7_statusbars/2_statusbar_endboss/green/green0.png",
        "img/7_statusbars/2_statusbar_endboss/green/green20.png",
        "img/7_statusbars/2_statusbar_endboss/green/green40.png",
        "img/7_statusbars/2_statusbar_endboss/green/green60.png",
        "img/7_statusbars/2_statusbar_endboss/green/green80.png",
        "img/7_statusbars/2_statusbar_endboss/green/green100.png"
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 50;
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