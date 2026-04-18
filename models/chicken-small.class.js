class ChickenSmall extends MovableObject{
    height = 80;
    width = 60;
    y = 340;
    audioBottleHit = new Audio("audio/chicken3.mp3");
    soundWanted = false;

    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png"
    ];
    

    IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";


    /**
     * Creates a new small chicken enemy and initializes its properties,
     * including position, speed, images, and state.
     */
    constructor(){
        super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.loadImage(this.IMAGE_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 600;
        this.speed = 0.15 + Math.random() * 0.5;
        this.isDead = false;
    }
    

    /**
     * Starts the movement and animation loops for the chicken.
     * The chicken moves left and cycles through walking images
     * while it is not dead.
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
     * Handles the event when the chicken takes a hit.
     * Plays a sound effect if enabled and triggers the death sequence.
     */
    takeHit(){
        if(this.soundWanted == true){
            this.audioBottleHit.play();
        }
    
        this.die();
    }

    
    /**
     * Marks the chicken as dead, stops all animations and movement,
     * and switches the image to the dead state.
     * Also sets a delayed flag indicating full removal.
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
     * Stops all active intervals for movement and animation.
     */
    stop() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
}

