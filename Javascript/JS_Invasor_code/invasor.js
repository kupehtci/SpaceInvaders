
class Alien{
    constructor(){
        //VARS FOR MOVEMENT
        this.x = 0; 
        this.y = 0; 
        this.speedX = 0; 
        this.speedX = 0; 

        //VARS FOR IMAGE 
        this.scale = 2; 

        this.imageReady = false; 
        var image = new Image(); 
        image.onload = () => {
            this.height = image.height * this.scale; 
            this.width = image.width * this.scale; 

            this.sprite = image;        //Assign the image to the var sprite and set ready 
            this.imageReady = true; 
            console.log("Created alien"); 
        }
        image.src = "./Assets/alien1.1.png";
        
        //Destroy vars
        this.active = true; 
        this.scoreEarned = 10; 
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
            ctx.drawImage(this.sprite,this.x,this.y,this.width,this.height); 
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
        console.log("shoot"); 
    }
}