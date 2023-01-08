
class PlayerShip{
    constructor(){
        //VARS FOR MOVEMENT
        this.x = 40; 
        this.y = 100; 
        this.speedX = 0; 
        this.speedY = 0; 
        this.speed = 300; 

        //LOAD IMAGE AND IMAGE VARS
        this.imageReady = false; 
        var image = new Image(); 

        this.scale = 2; 

        image.onload  = () => {
            this.height = image.height * this.scale; 
            this.width = image.width * this.scale; 

            this.sprite = image; 
            this.imageReady = true; 
        }

        image.src = "./Assets/player.png"; 

        //VARS FOR SHOOTING
        this.zeroBullets = true;

    }

    //Set position of the PlayerShip
    SetPosition(newX,newY){
        this.x = newX; 
        this.y = newY;
    }

    //Render the object
    Render(){
        
        if(this.imageReady){

            console.log("Player render"); 
            ctx.drawImage(this.sprite,this.x,this.y,this.width * this.scale,this.height * this.scale); 
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

        //shoot
        if(32 in l_keysDown){
            this.Shoot();
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

    Shoot()
    {

        if (this.zeroBullets == true)//there can only be one player bullet at a time
        {
            this.zeroBullets = false;
            pBullet.imageReady = true;
            pBullet.x = this.x + (this.width/2)*this.scale - 5;
            pBullet.y = this.y-30;
        }
        
    }
}