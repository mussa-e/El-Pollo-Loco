class World{
    character = new Character();
    level = createLevel1();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    throwableObjects = [];
    fullScreen = new Fullscreen();
    speaker = new Speaker();
    audioCoin = new Audio("audio/collect-points.mp3");
    audioBottle = new Audio("audio/pick.mp3");
    thrownBottle;
    lastThrowTime = 0;
    throwCooldown = 500;
    soundWanted = false;
    intervals = [];
    
    
    /**
     * Creates a new World instance and initializes the game.
     * @param {HTMLCanvasElement} canvas - The game canvas.
     * @param {Keyboard} keyboard - Keyboard input handler.
     */
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = createLevel1();
        this.draw();
        this.setWorld();
        this.run();
        this.startAnimations();
    }


    /**
     * Starts animations for all enemies that support animation.
     */
    startAnimations(){
        this.level.enemies.forEach(enemy => {
            if (enemy.animate && !(enemy instanceof Endboss)){
                enemy.animate();
            }
        });
    }


    /**
     * Links world references between character, enemies, and throwable objects.
     */
    setWorld(){
        this.character.world = this;

        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });

        this.throwableObjects.forEach(object => {
            object.world = this;
        });
    }


    /**
     * Starts the main game loop and repeatedly checks game logic.
     */
    run(){
        let runInterval = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionsCoins();
            this.checkCollisionsBottles();
            this.checkCollisionsThrownBottle();
            this.checkEndbossActivation();
            this.level.enemies = this.level.enemies.filter(e => !e.isDeadFlag);
        }, 20);//old 50

        this.intervals.push(runInterval);
    }


    /**
     * Stops all running intervals and game-related processes.
     */
    stop() {
        this.intervals.forEach(i => clearInterval(i));
        this.character.stop();
        this.level.enemies.forEach(enemy => {
            if (enemy.stop) {
                enemy.stop();
            }
        });
    }


    /**
     * Activates the endboss when the character reaches a certain distance.
     */
    checkEndbossActivation(){
        this.level.enemies.forEach(enemy => {
            if(enemy instanceof Endboss && !enemy.isActivated){
                
                if(this.character.x > enemy.x - 550){ 
                    enemy.isActivated = true;
                    enemy.playAnimationOnce(enemy.IMAGES_ALERT);
                    this.statusBarEndboss = new StatusBarEndboss();
                    if(enemy.soundWanted == true){
                        enemy.audioAlert.play();
                        enemy.audioAlert.volume = 0.3;
                    }
                    
                    setTimeout(() => {
                        enemy.animate();
                    }, enemy.IMAGES_ALERT.length * 150);
                }
            }
        });
    }


    /**
     * Handles throwing objects when the player presses the throw key.
     */
    checkThrowObjects(){
        let now = new Date().getTime();

        if(this.keyboard.D 
            && this.statusBarBottle.percentage > 0
            && now - this.lastThrowTime > this.throwCooldown
            && this.character.otherDirection == false){

            let bottle = new ThrowableObject(
                this.character.x + 100, 
                this.character.y + 100
            );

            this.throwableObjects.push(bottle);
            this.lastThrowTime = now; 
            this.statusBarBottle.setPercentage(
                this.statusBarBottle.percentage - 20
            );

            this.character.lastActionTime = new Date().getTime();
            this.character.playAnimation(this.character.IMAGES_STANDING);
        }
    }


    /**
     * Checks collisions between the character and enemies.
     */
    checkCollisions(){
        let stompedEnemy = this.level.enemies.some(enemy => 
            !enemy.isDead && this.character.isCollidingFromAbove(enemy)
        );

        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead && this.character.isCollidingFromAbove(enemy)) {
                enemy.takeHit();
                enemy.isDeadFlag = true;
                this.character.speedY = 15;
            } 
            else if (!stompedEnemy && this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);

                if(this.soundWanted == true && !this.character.isDead()){
                    this.character.audioHurt.play();
                }
            }
        });
    }
    

    /**
     * Checks collisions between the character and coins.
     */
    checkCollisionsCoins(){
        this.level.coins.forEach((coin) => {
            if(this.character.isColliding(coin)) {
                coin.x = -500; 
                if(this.soundWanted == true){
                    this.audioCoin.play();
                }
                this.statusBarCoin.setPercentage(this.statusBarCoin.percentage + 10);
            }
        })
    }


    /**
     * Checks collisions between the character and bottles.
     */
    checkCollisionsBottles(){
        this.level.bottles.forEach((bottle) => {
            if(this.character.isColliding(bottle) && this.statusBarBottle.percentage < 100) {
                bottle.x = -500;
                if(this.soundWanted == true){
                    this.audioBottle.play();
                }
                this.statusBarBottle.setPercentage(this.statusBarBottle.percentage + 20);
            }
        })
    }


    /**
     * Checks collisions between thrown bottles and enemies or ground.
     */
    checkCollisionsThrownBottle(){
        this.throwableObjects.forEach((bottle) => {

            if (bottle.hasHit) return;

            setTimeout(() => {
                if (bottle.y >= 280) { 
                    bottle.stopThrow();
                    bottle.splash();
                    bottle.markedForDeletion = true;
                    return;
                }
            }, 600); 
            
            this.level.enemies.forEach((enemy) => {
                if(bottle.isColliding(enemy)) {
                    bottle.hasHit = true;
                    bottle.stopThrow();
                    bottle.splash();
                    enemy.takeHit();
                    bottle.markedForDeletion = true;
                }
            });
        });
    }


    /**
     * Renders the game world and all visible objects.
     */
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);

        if(this.statusBarEndboss){
            this.addToMap(this.statusBarEndboss);
        }
        
        this.addToMap(this.fullScreen);
        this.addToMap(this.speaker);
        
        this.ctx.translate(this.camera_x, 0);

        // this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        
        this.ctx.translate(-this.camera_x, 0);
        
        this.drawControls();

        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }


    /**
     * Adds multiple objects to the canvas.
     * @param {Array} objects - Array of drawable objects.
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    /**
     * Adds a single movable object to the canvas.
     * @param {Object} mo - Movable object to render.
     */
    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
    }


    /**
     * Flips an image horizontally before rendering.
     * @param {Object} mo - Movable object to flip.
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Restores image orientation after flipping.
     * @param {Object} mo - Movable object to restore.
     */
    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * Draws control instructions on the canvas.
     */
    drawControls() {
        this.ctx.font = "16px Rye";
        this.ctx.fillStyle = "black";

        const lines = [
            "Left / Right = Arrow keys",
            "Jump = Space",
            "Throw Salsa Bottle = D"
        ];

        lines.forEach((line, index) => {
            let x = 280;
            let y = 30 + index * 30;

            this.ctx.fillText(line, x, y);
        });
    }
}

