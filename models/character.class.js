class Character extends MovableObject {
    height = 200;
    width = 120;
    y = 225;
    lastActionTime = new Date().getTime();
    audioJump = new Audio("audio/jump3.mp3");
    audioSnoring = new Audio("audio/snoring.mp3");
    audioLose = new Audio("audio/losing-horn.mp3");
    audioHurt = new Audio("audio/manhurt1.mp3");
    audioDied = new Audio("audio/manhurt3.mp3");
    
    soundWanted = false;
    hasPlayedLoseSound = false;

    intervals = [];


    IMAGES_STANDING = [
    "img/2_character_pepe/2_walk/W-21.png"
    ];
    IMAGES_WALKING = [
            "img/2_character_pepe/2_walk/W-21.png",
            "img/2_character_pepe/2_walk/W-22.png",
            "img/2_character_pepe/2_walk/W-23.png",
            "img/2_character_pepe/2_walk/W-24.png",
            "img/2_character_pepe/2_walk/W-25.png",
            "img/2_character_pepe/2_walk/W-26.png"
    ];
    IMAGES_JUMPING = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png"
    ];
    IMAGES_DEAD = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png"
    ];
    IMAGES_HURT = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png",
    ];
    IMAGES_IDLE = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png",
    ];
    IMAGES_LONG_IDLE = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];  


    world;
    speed = 10;
    

    
    constructor(){
        super().loadImage("img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_STANDING);
        this.applyGravity();
        this.animate();
        
    }

    animate(){

        let moveInterval = setInterval(()=> {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
                this.moveRight();
                this.otherDirection = false;
                this.lastActionTime = new Date().getTime();
            }

            if (this.world.keyboard.LEFT && this.x > 0){
                this.moveLeft();
                this.otherDirection = true;
                this.lastActionTime = new Date().getTime();
            }

            if(this.world.keyboard.SPACE && !this.isAboveGround()){
                this.jump();
                if(this.soundWanted == true){
                    this.audioJump.play();
                }
                
                this.lastActionTime = new Date().getTime();
                
            }


            this.world.camera_x = -this.x + 100;
        }, 1000/60);
        this.intervals.push(moveInterval);



        let animationInterval = setInterval(()=> {
            let timepassed = (new Date().getTime() - this.lastActionTime) / 1000;

            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
                this.audioSnoring.pause();
                this.characterDied();
            }
            
            else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);
                this.audioSnoring.pause();
            }
            
            else if(this.isAboveGround()){
                this.playAnimation(this.IMAGES_JUMPING);
                this.audioSnoring.pause();
            } 
            
            else 
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT){

                this.playAnimation(this.IMAGES_WALKING);
                this.audioSnoring.pause();
                
            }
            

            else if (timepassed > 10){
                this.playAnimation(this.IMAGES_LONG_IDLE);
                if(this.soundWanted == true){
                    this.audioSnoring.play();
                    this.audioSnoring.volume = 0.3;
                }
                
            }

            else if (timepassed > 3){
                this.playAnimation(this.IMAGES_IDLE);
                this.audioSnoring.pause();
            }

            else {
                this.playAnimation(this.IMAGES_STANDING);
                this.audioSnoring.pause();
            }
        }, 50);
        this.intervals.push(animationInterval);
    }


    stop() {
        this.intervals.forEach(i => clearInterval(i));
        clearInterval(this.gravityInterval);
    }


    characterDied(){
        gameOver = true;
        gameState = "gameover";

        if (document.fullscreenElement) {
            document.exitFullscreen();
        }

        let canvas = document.getElementById("canvas");
        let loseScreen = document.getElementById("lose-screen");

        if (this.hasPlayedLoseSound) return; 

        this.hasPlayedLoseSound = true; 

        if(this.soundWanted == true){
            this.audioDied.play();
            this.audioDied.volume = 0.3;
        }

        setTimeout(() => {
        loseScreen.classList.remove("d-none");
        canvas.classList.add("d-none");

        this.y = 3000;

        this.world.speaker.audioBG.pause();

        if(this.soundWanted == true){
            this.audioLose.play();
            this.audioLose.volume = 0.3;
            
        }
        }, 2000);
    }



}