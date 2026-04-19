class Coin extends DrawableObject{
    
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