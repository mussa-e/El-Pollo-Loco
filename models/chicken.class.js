class Chicken extends MovableObject{
    height = 90;
    width = 70;
    y = 335;
    audioBottleHit = new Audio("audio/chicken3.mp3");
    soundWanted = false;

    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];


    IMAGE_DEAD = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
    

    /**
     * Creates a new Chicken enemy instance with default size, position,
     * speed, and image assets. Initializes walking and dead animations.
     */
    constructor(){
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.x = 600 + Math.random() * 800;
        this.speed = 0.15 + Math.random() * 0.5;
        this.isDead = false;
    }
    

    /**
     * Starts the movement and animation loops for the chicken.
     * The chicken moves left continuously and plays walking animation
     * while it is not marked as dead.
     */
    animate(){
        this.moveInterval = setInterval(()=> {
            if(!this.isDead){
                this.moveLeft();
            }
        }, 1000/60);
            
        this.animationInterval = setInterval(()=> {
            if(!this.isDead){
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }


    /**
     * Handles damage taken by the chicken.
     * Plays a sound effect if enabled and triggers the death sequence.
     */
    takeHit(){
        if (this.soundWanted == true){
            this.audioBottleHit.play();
        }
    
        this.die();
    }

    
    /**
     * Sets the chicken to a dead state, stops all movement and animation,
     * switches to the dead image, and marks it for later removal.
     */
    die(){
        this.isDead = true;

        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);

        let deadImg = new Image();
        deadImg.src = this.IMAGE_DEAD;

        deadImg.onload = () => {
            this.img = deadImg;
        };

        setTimeout(() => {
            this.isDeadFlag = true; 
        }, 1000);
    }


    /**
     * Stops all running intervals for movement and animation.
     */
    stop() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
}