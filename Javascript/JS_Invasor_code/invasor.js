
class Alien{
    constructor(){
        //VARS FOR MOVEMENT
        this.x = 0; 
        this.y = 0; 
        this.speedX = 0; 
        this.speedX = 0; 

        //VARS FOR IMAGE 
        this.scale = 1; 

        this.imageReady = false; 
        var image = new Image(); 
        image.onload = () => {
            this.height = image.height * this.scale; 
            this.width = image.width * this.scale; 

            this.sprite = image;        //Assign the image to the var sprite and set ready 
            this.imageReady = true; 
        }
        image.src = "./Assets/alien1.1.png"; 
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
        if(this.imageReady){
            console.log("Player render"); 
            ctx.drawImage(this.sprite,this.x,this.y,this.width * this.scale,this.height * this.scale); 
        }
    }


}