
class InvasorMatrix{
    
    /**
     * Stores all the aliens that form like a matrix and their functions. 
     * When instantiated this matrix create as much aliens as the columns x rows defined
     * @param {int} numColumns Number of columns in the matrix of aliens
     * @param {int} numRows Number of rows in the matrix of aliens
     * @param {int} screenWidth 
     * @param {int} screenHeight 
     */
    constructor(numColumns,numRows,screenWidth,screenHeight){
        if(typeof(numColumns) != "number"){console.log("Incorrect number of columns")}
        
        //Create all the invasors
        this.invasors = [];
        for(var i = 0; i < numRows; i++){
            for(var j = 0; j < numColumns; i++){
                this.invasors[numColumns * i + j] = new Alien(); 
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