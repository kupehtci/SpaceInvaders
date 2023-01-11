/**
 * Class that contains the main stadistics of the game and
 * functions for renderizing the hud 
 */
class Hud{
    constructor(){
        this.score = 0; 
    }

    /**
     * Render the hud
     * @param {Canvas.Context} context canvas context to render the text in
     * @param {PlayerShip} player player class
     */
    Render(context, player){
        this.RenderScore(context); 
        this.RenderLives(context, player.lives); 
    }

    //Display on screen the player score
    RenderScore(context){
        context.fillStyle = "white"; 
        context.font = "20px Arial"; 
        context.fillText("SCORE: " + this.score, 15 , 20);
    }

    //Display on screen the player lives
    RenderLives(context, lives){
        context.fillStyle = "white"; 
        context.font = "20px Arial"; 
        context.fillText("LIVES: " + lives, 15 , 40);
    }
}