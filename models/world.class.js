class World{
    character = new Character();
    level = level1;
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
    coins = [
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
    ];
    bottles= [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ]
    audioCoin = new Audio("audio/collect-points.mp3");
    audioBottle = new Audio("audio/pick.mp3");
    
    


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

        this.startAnimations();
    }


     startAnimations(){
        this.level.enemies.forEach(enemy => {
            if (enemy.animate){
                enemy.animate();
            }
        });
    }

    

    setWorld(){
        this.character.world = this;
        
    }

    run(){
        setInterval(()=>{
            
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionsCoins();
            this.checkCollisionsBottles();
        },200);
    }


    checkThrowObjects(){
    if(this.keyboard.D && this.statusBarBottle.percentage > 0){

        let bottle = new ThrowableObject(
            this.character.x + 100, 
            this.character.y + 100
        );

        this.throwableObjects.push(bottle);

        // Flasche "verbrauchen"
        this.statusBarBottle.setPercentage(
            this.statusBarBottle.percentage - 20
        );
    }
}


    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            })
    }
    

    checkCollisionsCoins(){
        this.coins.forEach((coin) => {
                if(this.character.isColliding(coin)) {
                    coin.x = -100; // Move the coin off-screen
                    this.audioCoin.play();
                    this.statusBarCoin.setPercentage(this.statusBarCoin.percentage + 10);
                    
                    
                }
            })
    }

    checkCollisionsBottles(){
        this.bottles.forEach((bottle) => {
                if(this.character.isColliding(bottle)&& this.statusBarBottle.percentage < 100) {
                    bottle.x = -100; // Move the bottle off-screen
                    this.audioBottle.play();
                    this.statusBarBottle.setPercentage(this.statusBarBottle.percentage + 20);
                    
                }
            })
    }


    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        //space for fixed objects
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.fullScreen);
        this.addToMap(this.speaker);
        this.ctx.translate(this.camera_x, 0);

        
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
        

        this.ctx.translate(-this.camera_x, 0);
        


        //Draw wird wieder aufgerufen
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }


    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection){
        this.flipImageBack(mo);
        }
    }


    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


}



