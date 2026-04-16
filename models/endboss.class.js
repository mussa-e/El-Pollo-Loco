class Endboss extends MovableObject{
    height = 400;
    width = 250;
    y = 60;
    hits = 0;
    maxHits = 10;
    audioBottleHit = new Audio("audio/chicken1.mp3");
    audioAlert = new Audio("audio/highnoon.mp3");
    audioWin = new Audio("audio/orchestral-win.mp3")
    soundWanted = false;
    
    offset = {
    top: 50,
    left: 30,
    right: 30,
    bottom: 20
    };
    
    

    IMAGES_WALKING = [
            "img/4_enemie_boss_chicken/1_walk/G1.png",
            "img/4_enemie_boss_chicken/1_walk/G2.png",
            "img/4_enemie_boss_chicken/1_walk/G3.png",
            "img/4_enemie_boss_chicken/1_walk/G4.png",
            
            "img/4_enemie_boss_chicken/3_attack/G13.png",
            "img/4_enemie_boss_chicken/3_attack/G14.png",
            "img/4_enemie_boss_chicken/3_attack/G15.png",
            "img/4_enemie_boss_chicken/3_attack/G16.png",
            "img/4_enemie_boss_chicken/3_attack/G17.png",
            "img/4_enemie_boss_chicken/3_attack/G18.png",
            "img/4_enemie_boss_chicken/3_attack/G19.png",
            "img/4_enemie_boss_chicken/3_attack/G20.png",
            
    ];


    IMAGES_ALERT = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
            "img/4_enemie_boss_chicken/2_alert/G6.png",
            "img/4_enemie_boss_chicken/2_alert/G7.png",
            "img/4_enemie_boss_chicken/2_alert/G8.png",
            "img/4_enemie_boss_chicken/2_alert/G9.png",
            "img/4_enemie_boss_chicken/2_alert/G10.png",
            "img/4_enemie_boss_chicken/2_alert/G11.png",
            "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];


    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];


    IMAGES_DEAD = [
                "img/4_enemie_boss_chicken/5_dead/G24.png",
                "img/4_enemie_boss_chicken/5_dead/G25.png",
                "img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.x = 2200;
        this.speed = 1.8;
        this.isDead = false;
        this.isActivated = false;
    }

    
    animate(){
        this.moveInterval = setInterval(()=> {
            if(!this.isDead ){
                this.moveLeft();
                
                
            }
        }, 1000/60);
  
        this.animationInterval = setInterval(()=> {
            if(!this.isDead){
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150); 
    }


    takeHit(){
        this.hits++;
        if (this.soundWanted == true){
                this.audioBottleHit.play();
            }

        let i = 0;
            this.hurtInterval = setInterval(() => {
                if(i < this.IMAGES_HURT.length){
                    this.img = this.imageCache[this.IMAGES_HURT[i]];
                    i++;
                    
                } else {
                    clearInterval(this.hurtIntervalInterval);
                }
            }, 500); 


        if(this.hits >= 4){
            this.die();
            this.world.character.audioSnoring.pause();
        }
    }

    
    die(){
        this.isDead = true;
        
        clearInterval(this.animationInterval);

        let i = 0;
        this.deathInterval = setInterval(() => {
            if(i < this.IMAGES_DEAD.length){
                this.img = this.imageCache[this.IMAGES_DEAD[i]];
                i++;
                this.y = 140; 
            } else {
                clearInterval(this.deathInterval);
            }
        }, 800); 

        this.showWinScreen();
    }


    playAnimationOnce(images, intervalTime = 150){
         let i = 0;

        let interval = setInterval(() => {
            if(i < images.length){
                let path = images[i];
                this.img = this.imageCache[path];
                i++;
            } else {
                clearInterval(interval); 
            }
        }, intervalTime);
    }


    showWinScreen(){
        gameState = "win";

        let canvas = document.getElementById("canvas");
        let winScreen = document.getElementById("win-screen");
        let gameContainer = document.getElementById("game-container");

        this.world.character.soundWanted = false;
        
        setTimeout(() => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }

            winScreen.classList.remove("d-none");
            canvas.classList.add("d-none");
            gameContainer.classList.add("d-none");

            this.world.speaker.audioBG.pause();
            
            if(this.soundWanted == true){
                this.audioWin.play();
                this.audioWin.volume = 0.3;
            }
        }, 2000);
    }
        


    stop() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }
        
}
