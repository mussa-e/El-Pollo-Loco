class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2200;

    
    /**
     * Creates a new Level instance containing all game entities such as enemies,
     * clouds, background objects, coins, and bottles.
     * @param {Array} enemies - Array of enemy objects in the level.
     * @param {Array} clouds - Array of cloud objects in the level.
     * @param {Array} backgroundObjects - Array of background objects used for scenery.
     * @param {Array} coins - Array of collectible coin objects.
     * @param {Array} bottles - Array of collectible or usable bottle objects.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }


}

