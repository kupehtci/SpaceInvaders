
class fullBarrier{
    constructor(x, y){
        this.x = x; 
        this.y = y;

        this.barrierNumber = 15; 

        this.barrierBlocks = [];

        //LOAD IMAGE AND IMAGE VARS
        this.imageReady = false; 
        var image = new Image(); 
        image.src = "./Assets/squareBarrier.png"; 

        image.onload  = () => {

             

            for (var i = 0; i < this.barrierNumber; i++)
            {
                this.barrierBlocks[i] = new squareBarrier(image);
            }
            //first line
            this.barrierBlocks[0].x = this.x;
            this.barrierBlocks[0].y = this.y - this.barrierBlocks[1].height;
            this.barrierBlocks[1].x = this.x + this.barrierBlocks[1].width;
            this.barrierBlocks[1].y = this.y - this.barrierBlocks[1].height;
            this.barrierBlocks[2].x = this.x + 2*this.barrierBlocks[1].width;
            this.barrierBlocks[2].y = this.y - this.barrierBlocks[1].height;
            //second line
            this.barrierBlocks[3].x = this.x;
            this.barrierBlocks[3].y = this.y;
            this.barrierBlocks[4].x = this.x - this.barrierBlocks[1].width;
            this.barrierBlocks[4].y = this.y;
            this.barrierBlocks[5].x = this.x + this.barrierBlocks[1].width;
            this.barrierBlocks[5].y = this.y;
            this.barrierBlocks[6].x = this.x + 2*this.barrierBlocks[1].width;
            this.barrierBlocks[6].y = this.y;
            this.barrierBlocks[7].x = this.x + 3*this.barrierBlocks[1].width;
            this.barrierBlocks[7].y = this.y;
            //third line
            this.barrierBlocks[8].x = this.x;
            this.barrierBlocks[8].y = this.y + this.barrierBlocks[1].height;
            this.barrierBlocks[9].x = this.x - this.barrierBlocks[1].width;
            this.barrierBlocks[9].y = this.y + this.barrierBlocks[1].height;
            this.barrierBlocks[10].x = this.x + this.barrierBlocks[1].width;
            this.barrierBlocks[10].y = this.y + this.barrierBlocks[1].height;
            this.barrierBlocks[11].x = this.x + 2*this.barrierBlocks[1].width;
            this.barrierBlocks[11].y = this.y + this.barrierBlocks[1].height;
            this.barrierBlocks[12].x = this.x + 3*this.barrierBlocks[1].width;
            this.barrierBlocks[12].y = this.y + this.barrierBlocks[1].height;
            //fourth line
            this.barrierBlocks[13].x = this.x - this.barrierBlocks[1].width;
            this.barrierBlocks[13].y = this.y + 2*this.barrierBlocks[1].height;
            this.barrierBlocks[14].x = this.x + 3*this.barrierBlocks[1].width;
            this.barrierBlocks[14].y = this.y + 2*this.barrierBlocks[1].height;


            this.blocksReady = true;
        }

    }
    Render(){
        
        if(this.blocksReady == true)
        {
            for (var i = 0; i < this.barrierBlocks.length; i++)
            {
                this.barrierBlocks[i].Render();
            }
        }

    }

}