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

    constructor(){
        super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.loadImage(this.IMAGE_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        

        this.x = 500 + Math.random() * 600;
        this.speed = 0.15 + Math.random() * 0.5;

        this.isDead = false;
    }
    

    
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


    takeHit(){
        if(this.soundWanted == true){
            this.audioBottleHit.play();
        }
    
        this.die();
    }

    

die(){
    this.isDead = true;

    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);

    // Neues Bild erstellen
    let deadImg = new Image();
    deadImg.src = this.IMAGE_DEAD;

    // Sobald geladen, setzen
    deadImg.onload = () => {
        this.img = deadImg;
    };

    setTimeout(() => {
        this.isDeadFlag = true;
    }, 1000);
}


stop() {
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);
}

    
} 


