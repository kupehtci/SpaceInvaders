
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
        if(typeof(numColumns) != "number"){console.log("Incorrect number of columns")}
        
        //Position vars
        this.sepLeft = 20; 
        this.sepTop = 20; 
        this.sepWide = 30; 
        this.sepTall = 50; 

        //Create all the invasors
        this.invasors = [];
        for(var i = 0; i < numRows; i++){
            for(var j = 0; j < numColumns; i++){
                let index = (numColumns * i + j); 
                this.invasors[index] = new Alien();

                let invasorPosX = this.sepLeft + (j * this.sepWide); 
                let invasorPosY = this.sepHeight + (i * this.sepTall);
                this.invasors[index].SetPosition(invasorPosX,invasorPosY); 
            }
        }
        
    }

    /**
     * Render all the invasor in the matrix
     */
    Render(){
        this.invasors.forEach(invasor => {
            if(invasor.imageReady){
                invasor.Render(); 
            }
        });
    }
}