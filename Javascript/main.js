var game = new Game(1080,720); 
var canvas; 
var ctx; 
game.InitializateCanvas(); 


//____________________________________________________________________
//CHECK THE INPUTS
var keysDown = {}; 
addEventListener("keydown",function(e){
	keysDown[e.keyCode] = true;}, 
	false); 
addEventListener("keyup",function(e){
	delete keysDown[e.keyCode];}, 
	false);  

//____________________________________________________________________
// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	game.Update(keysDown, delta / 1000);
	game.Render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

//____________________________________________________________________
//Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now(); 

var player = new PlayerShip();
player.SetPosition(canvas.width/2,canvas.height/2); 
var alien1 = new Alien(); 

//MAIN GAME LOOP
game.Reset(); 
game.Start(); 
main();