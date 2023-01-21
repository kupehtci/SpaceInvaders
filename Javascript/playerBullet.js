
class playerBullet{
    constructor(){
        this.x = 0; 
        this.y = 0; 
        this.speedY = 600;

        //LOAD IMAGE AND IMAGE VARS
        this.imageReady = false; 
        var image = new Image(); 

        this.scale = 4; 

        image.onload  = () => {
            this.height = image.height * this.scale; 
            this.width = image.width * this.scale; 

            this.sprite = image; 
            this.imageReady = false; 
        }

        image.src = "./Assets/playerBullet.png"; 
    }
    Update (modifier)
    {
        //Check if it reaches the top of the screen    
        this.CheckScreenBorders()

        //Move the bullet if bullet is active 
        if (!this.imageReady){
            this.y = 0;
        }
        else{
            this.y -= this.speedY * modifier;
        }
    }

    //Check if it reaches the top of the screen 
    CheckScreenBorders(){

        //Check if getting out
        var gettingOut = (this.y + this.height <= 0); 

        //If getting out change the direction of the movement and set a position to avoid getting out
        if(gettingOut)
        {
            //this.speedY = 0; 
            this.y = 0; 
            this.imageReady = false; //stop rendering image
        }

    }

    Render(){
        
        if(this.imageReady){ 
            ctx.drawImage(this.sprite,this.x,this.y,this.width,this.height); 
        }
    }

}