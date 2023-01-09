
class InvasorMatrix{
    
    /**
     * Stores all the aliens that form like a matrix and their functions. 
     * When instantiated this matrix create as much aliens as the columns x rows defined
     * @param {int} numColumns Number of columns in the matrix of aliens
     * @param {int} numRows Number of rows in the matrix of aliens
     */
    constructor(numColumns,numRows){
        
        //Position vars
        this.sepLeft = 50; 
        this.sepTop = 20; 
        this.sepWide = (screenWidth - (this.sepLeft * 2)) / (numColumns - 1); 
        this.sepTall = 50; 

        //CREATE ALL THE INVASORS
        this.invasors = [];
        /** Count the number of invaders remaining*/
        this.numInvasorsAlive = 0; 
        this.CreateMatrix(numColumns,numRows);
        
        
               

        //VARS FOR INVASORS MOVEMENT
        /**Displacement that all aliens go down when the matrix touch the sides of the screen */
        this.dispDown = 8;             
        /**Direction of movement, 1 to move right and -1 to move left */
        this.direction = 1; 
        /**Define the invasors speed that increases when dificulty increases */
        this.invasorsSpeed = 0.3; 
        /**Factor that increments the speed when an invasor dies */
        this.increaseSpeedFactor = 0.07; 
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
        let goDown = false; 

        //Move the invasors into the new direction
        var TicksQntBwMovement = 5; 
        if(tick % TicksQntBwMovement == 0){
            this.invasors.forEach(invasor => {
                invasor.SetPosition(invasor.x + (this.invasorsSpeed * this.direction),invasor.y);
            });
        }
        
        //Check if sides of the matrix has collisioned with the screen border
        this.invasors.forEach(invasor => {
            if(invasor.active && invasor.CheckBorders()){
                goDown = true; 
            }
        }); 
        //Go a row down and change direction of movement
        if(goDown == true){
            this.direction = this.direction * -1;
            this.invasors.forEach(invasor => {
                invasor.SetPosition(invasor.x + (this.invasorsSpeed * this.direction),invasor.y + this.dispDown); 
            }); 
            goDown = false; 
        }

        if(tick % 10 == 0){
            this.ShootInvaderBellow(); 
        }
    }

    CreateMatrix(numColumns, numRows){
        for(let i = 0; i < numRows; i++){
            for(let j = 0; j < numColumns; j++){
                let index = ((numColumns * i) + j); 
                this.invasors[index] = new Alien();

                let invasorPosX = this.sepLeft + (j * this.sepWide); 
                let invasorPosY = this.sepTop + (i * this.sepTall);
                this.invasors[index].SetPosition(invasorPosX,invasorPosY); 
            }
        }
        this.numInvasorsAlive = (numRows * numColumns);
    }

    ShootInvaderBellow(){
        const invasorsAlive = this.invasors.filter(invader => invader.active); 

        /**Generate a random number that select one of the remaining Invaders */
        let randomNumber = Math.floor(Math.random * invasorsAlive.length); 

        //invasorsAlive[randomNumber].Shoot(); 
    }
}