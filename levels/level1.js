/**
 * Creates and returns the first game level.
 * 
 * The level includes enemies, clouds, background layers,
 * collectible coins and throwable bottles.
 *
 * @function
 * @returns {Level} Configured Level instance
 */
function createLevel1() {
    return new Level(

        /**
         * Enemies in the level
         * @type {Array.<Chicken|ChickenSmall|Endboss>}
         */
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
        ],


        /**
         * Cloud objects for background animation
         * @type {Cloud[]}
         */
        [
            new Cloud()
        ],


        /**
         * Background layers (parallax scrolling)
         * @type {BackgroundObject[]}
         */
        [
            new BackgroundObject("img/5_background/layers/air.png", -720),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -720),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -720),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -720),

            new BackgroundObject("img/5_background/layers/air.png", 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

            new BackgroundObject("img/5_background/layers/air.png", 720),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720),

            new BackgroundObject("img/5_background/layers/air.png", 720 * 2),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 720 * 2),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 720 * 2),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 720 * 2),

            new BackgroundObject("img/5_background/layers/air.png", 720 * 3),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720 * 3),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720 * 3),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720 * 3)
        ],


        /**
         * Collectible coins
         * @type {Coin[]}
         */
        [
            new Coin(), 
            new Coin(), 
            new Coin(), 
            new Coin(), 
            new Coin(),
            new Coin(), 
            new Coin(), 
            new Coin(), 
            new Coin(), 
            new Coin()
        ],

        
        /**
         * Throwable bottles
         * @type {Bottle[]}
         */
        [
            new Bottle(), 
            new Bottle(), 
            new Bottle(), 
            new Bottle(),
            new Bottle(), 
            new Bottle(), 
            new Bottle(), 
            new Bottle()
        ]
    );
}