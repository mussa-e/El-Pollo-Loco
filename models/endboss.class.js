class Endboss extends MovableObject{
    height = 400;
    width = 250;
    y = 60;
    hits = 0;
    maxHits = 10;

    IMAGES_WALKING = [
            "img/4_enemie_boss_chicken/2_alert/G5.png",
            "img/4_enemie_boss_chicken/2_alert/G6.png",
            "img/4_enemie_boss_chicken/2_alert/G7.png",
            "img/4_enemie_boss_chicken/2_alert/G8.png",
            "img/4_enemie_boss_chicken/2_alert/G9.png",
            "img/4_enemie_boss_chicken/2_alert/G10.png",
            "img/4_enemie_boss_chicken/2_alert/G11.png",
            "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_DEAD = [
                "img/4_enemie_boss_chicken/5_dead/G24.png",
                "img/4_enemie_boss_chicken/5_dead/G25.png",
                "img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    constructor(){
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 2200;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();

        this.isDead = false;
    }

    
    animate(){

        
    this.animationInterval = setInterval(()=> {
        if(!this.isDead){
            this.playAnimation(this.IMAGES_WALKING);
        }
    }, 150);
}


    takeHit(){
    this.hits++;
    if(this.hits >= 6){
        this.die();
    }
    console.log("Endboss hit");
    }

    // die(){
    //     this.isDeadFlag = true;
    // }
    die(){
        this.isDead = true;
        
        clearInterval(this.animationInterval);

        // Spielt die Death-Animation
        let i = 0;
        this.deathInterval = setInterval(() => {
            if(i < this.IMAGES_DEAD.length){
                this.img = this.imageCache[this.IMAGES_DEAD[i]];
                i++;
                this.y = 140; // Endboss sinkt etwas ab, um den Tod zu verdeutlichen
            } else {
                clearInterval(this.deathInterval);
            }
        }, 800); // Frame-Rate der Death-Animation

        // Danach entfernen
        // setTimeout(() => {
        //     this.isDeadFlag = true;
        // }, this.IMAGES_DEAD.length * 800); // passt zur Animation
    }
        
}
