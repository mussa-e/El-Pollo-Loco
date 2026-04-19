class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    /**
     * Loads a single image and assigns it to the object.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Draws the current image on the provided canvas context.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * Draws a blue frame around the object if it is an instance of
     * Character, Chicken, ChickenSmall, or Endboss.
     * Useful for debugging collision boundaries.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    drawFrame(ctx) {
        if (
            this instanceof Character ||
            this instanceof Chicken ||
            this instanceof ChickenSmall ||
            this instanceof Endboss
        ) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    
    /**
     * Preloads multiple images and stores them in the image cache.
     * @param {string[]} arr - Array of image paths to load.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}