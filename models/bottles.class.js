class Bottle extends DrawableObject{
    
    bottlesImages = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
    ];

    chooseRandomBottle(){
        let randomNumber = Math.random();
        if(randomNumber < 0.5){
            return this.bottlesImages[0];
        } else {
            return this.bottlesImages[1];
        }
    }

    constructor(){
        super().loadImage(this.chooseRandomBottle());
        
        this.x = 400 + Math.random() * 1500;
        this.y = 360;
        this.height = 70;
        this.width = 70;
    }
}