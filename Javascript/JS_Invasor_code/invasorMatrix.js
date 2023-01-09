
class InvasorMatrix{
    
    /**
     * Stores all the aliens that form like a matrix and their functions. 
     * When instantiated this matrix create as much aliens as the columns x rows defined
     * @param {int} numColumns Number of columns in the matrix of aliens
     * @param {int} numRows Number of rows in the matrix of aliens
     * @param {int} screenWidth Width of the screen for calculating aliens position
     * @param {int} screenHeight Height of the screen for calculating aliens position and checking when invasors has reached earth and loose game
     */
    constructor(numColumns,numRows,screenWidth,screenHeight){
        
        //Position vars
        this.sepLeft = 20; 
        this.sepTop = 20; 
        this.sepWide = 30; 
        this.sepTall = 50; 

        //Create all the invasors
        this.invasors = [];
        this.CreateMatrix(numColumns,numRows);
        
        /** Count the number of invaders remaining*/
        this.numInvasorsAlive = (numRows * numColumns);             

        //VARS FOR INVASORS MOVEMENT
        /**Displacement that all aliens go down when the matrix touch the sides of the screen */
        this.dispDown = 10;             
        /**Direction of movement, 1 to move right and -1 to move left */
        this.direction = 1; 
        /**Define the invasors speed that increases when dificulty increases */
        this.invasorsSpeed = 3; 
    }

    /**
     * Render all the invasor in the matrix
     */
    Render(){
        this.invasors.forEach(invasor => {
            if(invasor.imageReady && invasor.active){
                invasor.Render(); 
            }
        });
    }

    Update(tick){

        //Move the invasors into the new direction
        var TicksQntBwMovement = 3; 
        if(tick % TicksQntBwMovement == 0){
            this.invasors.forEach(invasor => {
                invasor.SetPosition(invasor.x + this.invasorsSpeed,invasor.y);
            });
        }
    }

    CreateMatrix(numColumns, numRows){
        for(var i = 0; i < numRows; i++){
            for(var j = 0; j < numColumns; j++){
                let index = ((numColumns * i) + j); 
                this.invasors[index] = new Alien();

                let invasorPosX = this.sepLeft + (j * this.sepWide); 
                let invasorPosY = this.sepTop + (i * this.sepTall);
                this.invasors[index].SetPosition(invasorPosX,invasorPosY); 
            }
        }
    }

    InvasorsCollideBorders(){
        //Down all the invasors
        
        //Change direction
    }


}