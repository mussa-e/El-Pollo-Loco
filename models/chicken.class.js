class Chicken extends MovableObject{
    height = 90;
    width = 70;
    y = 335;

    IMAGES_WALKING = [
            "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
            "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
            "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"
    ];

    IMAGE_DEAD = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
    

    constructor(){
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);

        this.x = 400 + Math.random() * 500;
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
    this.die();
    console.log("Chicken hit");
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
        this.isDeadFlag = true; //entfernt das Objekt nach 1 Sekunde aus dem Spiel
    }, 1000);
}
    
} 