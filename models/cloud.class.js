class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    /**
     * Creates a new Cloud instance, initializes its image and random position,
     * and starts its movement animation.
     */
    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/1.png");
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Starts the cloud movement by moving it to the left.
     * Typically used to simulate background cloud drifting.
     */
    animate() {
        this.moveLeft();
    }
}