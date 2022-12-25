
//Class for managing the basic behaviour of the main game

class Game{
    constructor(windowW,windowH){
        this.windowWidth = windowW; 
        this.windowHeight = windowH; 
    }
    
    InitializateCanvas(){
        //Create canvas
        canvas = document.createElement("canvas"); 
        ctx = canvas.getContext("2d"); 

        canvas.width = 1080; 
        canvas.height = 720;

        document.body.appendChild(canvas);      //Create the canvas in the HTML document
    }
    
    //START - Load things the start of the game
    Start(){
        console.log("Start Game"); 
    }

    //RESET THE GAME
    Reset(){
        console.log("reset"); 
    }

    Render(){
        
        //Render a Background with colour Black 
        console.log("Background black"); 
        ctx.fillStyle = "black"; 
        ctx.fillRect(0,0,canvas.width,canvas.height); 

        //Render the player
        player.Render(); 
    }

    Update(keysDownArray, modifier){
        player.Update(keysDownArray,modifier); 
    }

    HandleInputs(){
        addEventListener("keydown",function(e){
            keysDown[e.keyCode] = true;}, 
            false); 
        addEventListener("keyup",function(e){
            delete keysDown[e.keyCode];}, 
            false); 
    }
}
