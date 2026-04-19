class Bottle extends DrawableObject{
    offset = {
        top: 45,
        left: 45,
        right: 45,
        bottom: 45
    };
    
    bottlesImages = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
    ];


    /**
     * Selects a random bottle image from the available images.
     * 
     * @returns {string} The file path of the selected bottle image.
     */
    chooseRandomBottle(){
        let randomNumber = Math.random();
        if(randomNumber < 0.5){
            return this.bottlesImages[0];
        } else {
            return this.bottlesImages[1];
        }
    }


    /**
     * Creates a new Bottle instance with a random image and default position and size.
     * The horizontal position is randomized within a defined range.
     * 
     * @constructor
     */
    constructor(){
        super().loadImage(this.chooseRandomBottle());
        
        this.x = 400 + Math.random() * 1500;
        this.y = 360;
        this.height = 70;
        this.width = 70;
    }
}