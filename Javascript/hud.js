/**
 * Class that contains the main stadistics of the game and
 * functions for renderizing the hud 
 */
class Hud{
    constructor(){
        this.score = 0; 
    }

    Render(context){
        context.fillStyle = "white"; 
        context.font = "20px Arial"; 
        context.fillText("SCORE: " + this.score, 15 , 20);
        console.log("render hud: " + this.score);  
    }
}