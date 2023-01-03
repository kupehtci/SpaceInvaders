
var canvas; 
var ctx; 

//____________________________________________________________________
//CREATE CANVAS IN SCREEN
canvas = document.createElement("canvas"); 
ctx = canvas.getContext("2d"); 

canvas.width = 1080; 
canvas.height = 720;

document.body.appendChild(canvas);      //Create the canvas in the HTML document

//____________________________________________________________________
//START - Load things the start of the game
function Start(){
	console.log("Start Game"); 
}
//____________________________________________________________________
//RESET THE GAME
function Reset(){
	console.log("reset"); 
}

//____________________________________________________________________
//RENDER THE GAME
function Render(){
	
	//Render a Background with colour Black aa
	console.log("Background black"); 
	ctx.fillStyle = "black"; 
	ctx.fillRect(0,0,canvas.width,canvas.height); 

	//Render the player
	player.Render(); 
}

function Update(keysDownArray, modifier){
	player.Update(keysDownArray,modifier); 
}


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
// THE MAIN GAME LOOP
var main = function () {
	var now = Date.now();
	var delta = now - then;

	Update(keysDown, delta / 1000);
	Render();

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
player.SetPosition(canvas.width/2,canvas.height * 5/6); 	//set player initial position
var alien1 = new Alien(); 	

//MAIN GAME LOOP
Reset(); 
Start(); 

main();		//Start the main loop of the game 