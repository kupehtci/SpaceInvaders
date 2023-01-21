const shootSound = new Audio("sounds/laser.wav");
class Alien{
    constructor(invasorType){
        //VARS FOR MOVEMENT
        this.x = 0; 
        this.y = 0; 
        this.speedX = 0; 
        this.speedX = 0; 

        //VARS FOR IMAGE 
        this.scale = 2; 

        //LOAD IMAGE AND IMAGE VARS 1
        this.imageReady = false; 
        this.spriteIndex = 0; 
        this.sprite = [2]; 

        var image1 = new Image(); 
        image1.onload = () => {
            this.height = image1.height * this.scale; 
            this.width = image1.width * this.scale; 

            this.sprite[0] = image1;        //Assign the image to the var sprite and set ready
            this.imageReady = true; 
        }
        
        
        //LOAD IMAGE AND IMAGE VARS 2
        var image2 = new Image();   
        image2.onload = () => {
            this.height = image2.height * this.scale; 
            this.width = image2.width * this.scale; 

            this.sprite[1] = image2;        //Assign the image to the var sprite and set ready 
            this.imageReady = true; 
        }
        
        this.scoreEarned = 0; 

        switch (invasorType) {
            case 1:
                image1.src = "./Assets/alien1.1.png";
                image2.src = "./Assets/alien1.2.png";
                this.scoreEarned = 10; 
                break;
            case 2: 
                image1.src = "./Assets/alien2.1.png";
                image2.src = "./Assets/alien2.2.png";
                this.scoreEarned = 30; 
                break; 
            case 3: 
                image1.src = "./Assets/alien3.1.png";
                image2.src = "./Assets/alien3.2.png";
                this.scoreEarned = 20; 
                break; 
            default:
                break;
        }
        
        //Destroy vars
        this.active = true; 
        
    }

    /**
     * Set the position of the invasor
     * @param {int} newX New x position for the invasor
     * @param {int} newY New y position for the invasor
     */
    SetPosition(newX, newY){
        this.x = newX; 
        this.y = newY; 
    }

    /**Render the Invasor
     * Takes on account the scale defined in the invasor when rendering
     */
    Render(){
        if(this.imageReady && this.active){
            //console.log("Invasor render at: " + this.x + " _ " + this.y); 
            ctx.drawImage(this.sprite[this.spriteIndex],this.x,this.y,this.width,this.height); 
        }
    }
    
    //Change into next image of the sprite
    NextSprite(){
        this.spriteIndex++;
        if(this.spriteIndex > 1){
            this.spriteIndex = 0;
        }
    }


    /**Check if alien is colliding the screen borders */
    CheckBorders(){
        var windowWidth = screenWidth; 

        //Check if getting out
        var gettingOutRight = (this.x + this.width >= windowWidth); 
        var gettingOutLeft = (this.x <= 0); 

        //If getting out change the direction of the movement and set a position to avoid getting out
        if(gettingOutLeft || gettingOutRight){
            return true; 
        }

        return false; 
    }

    Shoot(){
        shootSound.currentTime = 0;
        shootSound.play();
        console.log("Alien shooted shoot"); 
        invasorBullet.SetPosition(this.x + this.width/2, this.y);
        invasorBullet.imageReady = true;

    }
}