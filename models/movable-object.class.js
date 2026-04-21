class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accerelation = 2.5;
    energy = 100; // old 100
    lastHit = 0;
    lastY = 0;


    /**
     * Starts the gravity simulation for the object.
     * Continuously updates the vertical position and applies acceleration
     * when the object is in the air or moving upward.
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            this.lastY = this.y;

            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accerelation;
            }
        }, 1000 / 25);
    }


    /**
     * Stops the gravity interval and freezes vertical movement updates.
     */
    stop() {
        clearInterval(this.gravityInterval);
    }


    /**
     * Determines whether the object is above the ground.
     * Throwable objects are always considered airborne.
     * @returns {boolean} True if the object is above ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 225;
        }
    }


    /**
     * Checks whether this object is colliding with another movable object
     * using bounding box collision detection with offsets.
     * @param {MovableObject} mo - The other object to check collision against.
     * @returns {boolean} True if a collision is detected.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
     * Checks if this object is colliding with another object from above.
     * Used to detect stomping or top-down collisions.
     * @param {MovableObject} mo - The object to check against.
     * @returns {boolean} True if collision occurs from above.
     */
    isCollidingFromAbove(mo) {
        return this.isColliding(mo) &&
            this.speedY < 0 &&
            this.lastY + this.height <= mo.y + 10;
    }


    /**
     * Reduces the object's energy when it is hit.
     * Also records the time of the hit for hurt-state tracking.
     */
    hit() {
        if(this.isHurt()){
            return;
        }
        else{
            this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        this.lastActionTime = new Date().getTime();
        }
        
    }


    /**
     * Checks whether the object is currently in a hurt state.
     * @returns {boolean} True if the object was hit within the last second.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in seconds
        return timepassed < 1;
    }


    /**
     * Checks whether the object is dead (energy depleted).
     * @returns {boolean} True if energy is zero.
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Plays an animation by cycling through an array of image paths.
     * @param {string[]} images - Array of image paths for animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Moves the object to the right based on its speed.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Moves the object to the left based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    
    /**
     * Makes the object jump by setting an upward speed.
     */
    jump() {
        this.speedY = 30;
    }
}