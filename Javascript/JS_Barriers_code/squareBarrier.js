
class squareBarrier{
    constructor(image){
        this.x = 0; 
        this.y = 0; 
        this.sprite = image;

        this.scale = 1; 
        this.imageReady = true;
        this.height = image.height * this.scale; 
        this.width = image.width * this.scale;

    }


    Render(){
        
        if(this.imageReady){

            //console.log("PlayerBullet render"); 
            ctx.drawImage(this.sprite,this.x,this.y,this.width * this.scale,this.height * this.scale); 
        }
    }

}