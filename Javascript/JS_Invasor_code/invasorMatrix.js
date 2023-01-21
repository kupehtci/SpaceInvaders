
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

        //Store matrix parameters 
        this.numColumns = numColumns;
        this.numRows = numRows;

        //Create the matrix 
        this.CreateMatrix(numColumns,numRows);
        
        
               

        //VARS FOR INVASORS MOVEMENT
        /**Displacement that all aliens go down when the matrix touch the sides of the screen */
        this.dispDown = 8;             
        /**Direction of movement, 1 to move right and -1 to move left */
        this.direction = 1; 
        /**Define the invasors speed that increases when dificulty increases */
        this.invasorsSpeed = 0.3; 
        /**Factor that increments the speed when an invasor dies */
        this.increaseSpeedFactor = 0.08; 
        this.lastInvasorSpeedIncrement = 6;
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

        //Change the sprite of the invasors at specific ticks
        if(tick % 30 == 0){
            this.ChangeInvadersSprite();
        }
        
        //If sides of the matrix has collisioned with the screen border, go a level down
        this.invasors.forEach(invasor => {
            if(invasor.active && invasor.CheckBorders()){
                this.direction = this.direction * -1;
                this.invasors.forEach(invasor => {
                    invasor.SetPosition(invasor.x + (this.invasorsSpeed * this.direction),invasor.y + this.dispDown); 
                }); 
            }
        }); 

        
        //A random invasor at the down line shoots each X ticks 
        if(tick % 70 == 10 && !invasorBullet?.imageReady){
            this.ShootInvaderBellow(); 
        }
    }

    /**
     * Create a matrix of aliens
     * @param {number} numColumns 
     * @param {number} numRows 
     */
    CreateMatrix(numColumns, numRows){
        for(let i = 0; i < numRows; i++){
            for(let j = 0; j < numColumns; j++){

                let index = ((numColumns * i) + j); 
                
                //Create different aliens depending on the line
                if(i == 0) {this.invasors[index] = new Alien(2);}
                else if(i == 1 || i == 2){this.invasors[index] = new Alien(3);}
                else if(i == 3 || i == 4){this.invasors[index] = new Alien(1);}
                else{this.invasors[index] = new Alien(1);}

                let invasorPosX = this.sepLeft + (j * this.sepWide); 
                let invasorPosY = this.sepTop + (i * this.sepTall);
                this.invasors[index].SetPosition(invasorPosX,invasorPosY); 
            }
        }
        //Store how many invasors exists initially
        this.numInvasorsAlive = (numRows * numColumns);

        //Update number of columns and rows
        this.numColumns = numColumns;
        this.numRows = numRows;
    }

    ClearMatrix(){
        this.invasors.forEach(invasor => {
            invasor.active = false;
        });
    }

    ShootInvaderBellow(){
        //Generate a random number for choosing a column
        let randomColumn = Math.floor(Math.random() * this.numColumns);

        //Check if there is an invasor in the column
        let i = randomColumn;
        let invasorDownColumn = this.invasors[i]; 
        
        while(this.invasors[i].active && (i+this.numColumns) < this.invasors.length && this.invasors[i + this.numColumns].active){
            i += this.numColumns; 
            invasorDownColumn = this.invasors[i]; 
        }
        if(invasorDownColumn.active == false){
            return; 
        }
        else{
            invasorDownColumn.Shoot(); 
        }
            
    }

    ChangeInvadersSprite(){
        this.invasors.forEach(invasor => {
            invasor.NextSprite(); 
        });
    }
}