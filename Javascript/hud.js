/**
 * Class that contains the main stadistics of the game and
 * functions for renderizing the hud 
 */
class Hud{
    constructor(){
        this.score = 0; 


        //GAME OVER TEXT VARS
        this.gameOverActive = false; 
        this.gameOverImageReady = false;
        this.gameOverSprite = null;
        this.gameOverScale = 0.4; 
        let image = new Image();
        image.onload = () => {
            this.gameOverSprite = image;
            this.gameOverImageReady = true;
            this.gameOverH = image.height * this.gameOverScale; 
            this.gameOverW = image.width * this.gameOverScale; 
        }
        image.src = "./Assets/GameOver_Distorsionated_Text.png";

        this.pressEnterTextReady = false;
        let image2 = new Image();
        image2.onload = () => {
            this.pressEnterText = image2;
            this.pressEnterTextReady = true;
            this.textEnterH = image2.height * this.gameOverScale; 
            this.textEnterW = image2.width * this.gameOverScale; 
        }
        image2.src = "./Assets/PressEnterToTryAgain.png";

    }
    /**
     * Render the hud
     * @param {Canvas.Context} context canvas context to render the text in
     * @param {PlayerShip} player player class
     */
    Render(context, player){
        this.RenderScore(context); 
        this.RenderLives(context, player.lives);
        
        //Render game over text if the player is dead and the text "Press ENTER TO TRY AGAIN" is active
        if(this.gameOverActive && this.gameOverImageReady){
            context.globalAlpha = 0.8; 
            context.drawImage(this.gameOverSprite, canvas.width/2 - this.gameOverW/2, canvas.height/2 - this.gameOverH/2, this.gameOverW, this.gameOverH);
            context.globalAlpha = 1;
            
            if(this.pressEnterTextReady){
                context.drawImage(this.pressEnterText, canvas.width/2 - this.textEnterW/2, canvas.height * 3/4, this.textEnterW, this.textEnterH); 
            }
        }
    }

    //Display on screen the player score
    RenderScore(context){
        context.fillStyle = "white"; 
        context.font = "20px Montserrat"; 
        context.fillText("SCORE: " + this.score, screenWidth - 100 , screenHeight - 20);
    }

    //Display on screen the player lives
    RenderLives(context, lives){
        context.fillStyle = "white"; 
        context.font = "20px Montserrat"; 
        context.fillText("LIVES: " + lives, screenWidth - 200, screenHeight - 20);
    }

    GameOver(){
        this.gameOverActive = true; 
    }
    GameOverShutDown(){
        this.gameOverActive = false;
    }
}