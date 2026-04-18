/**
 * Represents a background object used for parallax scrolling.
 * Extends MovableObject and positions itself on the ground level.
 * 
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    
    /**
     * Creates a new BackgroundObject instance.
     * 
     * @constructor
     * @param {string} imagePath - Path to the background image
     * @param {number} x - Horizontal position of the object
     */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}