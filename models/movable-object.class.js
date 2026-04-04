class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accerelation = 2.5;
    energy = 100;
    lastHit = 0;


    applyGravity(){
        setInterval(()=>{
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.accerelation;
            } 
            
        },1000/25);
    }
    


    isAboveGround(){
        if(this instanceof ThrowableObject){
            return true; // throwableObjects should allways fall
        } else {
            return this.y < 225;
        }
    }


    // isColliding(mo){
    //     return this.x + this.width > mo.x &&
    //         this.y + this.height > mo.y &&
    //         this.x < mo.x &&
    //         this.y < mo.y + mo.height;
    // }
    isColliding(mo){
    return  this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
}


    hit(){
        this.energy -= 5;
        if(this.energy < 0){
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        this.lastActionTime = new Date().getTime();
    }


    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; //difference in ms
        timepassed = timepassed / 1000; // difference in sec
        return timepassed < 1;
    } 


    isDead(){
        return this.energy == 0;    
    }


    playAnimation(images){
        let i = this.currentImage % images.length;//i=0,1,2,3,4,5,0,0...
                let path = images[i];
                this.img = this.imageCache[path];
                this.currentImage++;
    }


    moveRight(){
        this.x += this.speed;
        
    }


    moveLeft(){
            this.x -= this.speed;
            
    }


    jump(){
        this.speedY = 30;
    }
}