
class InvasorBullet{
    constructor(){
        this.x = 0; 
        this.y = 0; 
        this.speedY = -410;

        //LOAD IMAGE AND IMAGE VARS
        this.imageReady = false; 
        this.chargedImage = false; 
        var image = new Image(); 

        this.scale = 3; 

        image.onload  = () => {
            this.height = image.height * this.scale; 
            this.width = image.width * this.scale; 

            this.sprite = image;  
            this.chargedImage = true; 
        }

        image.src = "./Assets/alienBullet2.png";
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

    /**
     * Check if it reaches the bottom of the screen
     */
    CheckScreenBorders(){

        //Check if getting out
        var gettingOut = (this.y + this.height >= screenHeight); 

        //If getting out change the direction of the movement and set a position to avoid getting out
        if(gettingOut)
        {
            this.y = 0; 
            this.imageReady = false; //stop rendering image
        }

    }

    Render(){
        if(this.imageReady){ 
            ctx.drawImage(this.sprite,this.x,this.y,this.width,this.height); 
        }
    }

    /**
     * Check collision with another object
     * @param {Object} obj1 object to check the collition with
     */
    CollisionWith(obj1){
        if(this.active){
            return collision(this,obj1);
        }
        else{
            return false; 
        }
    }
    SetPosition(newX,newY){
        this.x = newX; 
        this.y = newY;
    }
}