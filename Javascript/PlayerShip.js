const shootPlayer = new Audio("sounds/laserPlayer.wav");
class PlayerShip{
    constructor(){
        //VARS FOR MOVEMENT
        this.x = canvas.width/2; 
        
        this.y = canvas.height * 11/12; 
        this.speedX = 0; 
        this.speedY = 0; 
        this.speed = 300; 

        //LOAD IMAGE AND IMAGE VARS
        this.imageReady = false; 
        var image = new Image(); 

        this.scale = 3; 

        image.onload  = () => {
            this.height = image.height * this.scale; 
            this.width = image.width * this.scale; 

            this.sprite = image; 
            this.imageReady = true; 
        }

        image.src = "./Assets/player.png"; 

        //VARS FOR SHOOTING
        this.zeroBullets = true;
        this.enableShoot = true; 

        //VARS FOR LIVES 
        this.lives = 1; 
    }

    //Set position of the PlayerShip
    SetPosition(newX,newY){
        this.x = newX; 
        this.y = newY;
    }

    //Render the object
    Render(){
        
        if(this.imageReady && this.lives > 0){ 
            ctx.drawImage(this.sprite,this.x,this.y,this.width,this.height); 
        }
    }

    //Update the movement using l_keysDown that its an array that contains the keys pressed
    Update(l_keysDown,modifier){
        
        //Right
        if(39 in l_keysDown || 68 in l_keysDown){
            this.speedX += this.speed * modifier; 
        }
        //Left
        if(37 in l_keysDown || 65 in l_keysDown){
            this.speedX -= this.speed * modifier; 
        }

        //Shoot when Space is pressed and desativate the shooting until the key is released
        if(32 in l_keysDown && this.enableShoot){
            this.Shoot();
            this.enableShoot = false; 
        }
        if(!(32 in l_keysDown)){
            this.enableShoot = true;
        }




        //if bullet image is hidden means you can fire again
        if (pBullet.imageReady == false){
            this.zeroBullets = true;
        }

        //Apply the speed into the position
        this.x += this.speedX;

        this.CheckScreenBorders(); 

        //Reset the speed to avoid linear acceleration
        this.speedX = 0; 
        this.speedY = 0; 
    }

    //Check if its going out of screen 
    CheckScreenBorders(){
        var windowWidth = canvas.width; 
        var windowHeight = canvas.height; 

        //Check if getting out
        var gettingOutRight = (this.x + this.width >= windowWidth); 
        var gettingOutLeft = (this.x <= 0); 

        //If getting out change the direction of the movement and set a position to avoid getting out
        if(gettingOutLeft){
            this.speedX = -this.speedX; 
            this.x = 0; 
        }

        if(gettingOutRight){
            this.speedX = -this.speedX; 
            this.x = windowWidth - this.width; 
        }
    }

    //Shoot a bullet
    Shoot()
    {
        if (this.zeroBullets == true)//there can only be one player bullet at a time
        {
            shootPlayer.currentTime = 0;
            shootPlayer.play();
            this.zeroBullets = false;
            pBullet.imageReady = true;
            pBullet.x = this.x + (this.width/2) - 5;
            pBullet.y = this.y-30;
        }   
    }

    //Check if the player is dead
    isDead(){
        if(this.lives <= 0){
            return true; 
        }
        return false;
    }
}