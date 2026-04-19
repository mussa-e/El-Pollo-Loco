class Coin extends DrawableObject{
    offset = {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50
    };


    /**
     * Creates a new Coin instance with a random position on the map.
     * Initializes image, size, and coordinates.
     */
    constructor(){
        super().loadImage("img/8_coin/coin_1.png");
        this.x = 400 + Math.random() * 1500;
        this.y = 200 + Math.random() * 100;
        this.height = 150;
        this.width = 150;
    }
}