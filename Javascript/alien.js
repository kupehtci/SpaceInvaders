
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
    }
}