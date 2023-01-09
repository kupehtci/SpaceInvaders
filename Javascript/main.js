
//____________________________________________________________________
//MAIN VARS

var canvas; 
var ctx; 
var screenWidth = 640; 
var screenHeight = 480; 


//____________________________________________________________________
//CREATE CANVAS IN SCREEN
canvas = document.createElement("canvas"); 
ctx = canvas.getContext("2d"); 

canvas.width = screenWidth; 
canvas.height = screenHeight;

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
	ctx.fillStyle = "black"; 
	ctx.fillRect(0,0,canvas.width,canvas.height); 

	//Render the player
	player.Render(); 

	//Render the bullet
	pBullet.Render();

	invasorMatrix.Render(); 

	hud.Render(ctx); 
}

function Update(keysDownArray, modifier, ticks){
	

	player.Update(keysDownArray,modifier); 
	pBullet.Update(modifier);
	invasorMatrix.Update(ticks); 

	//Check bullet collision with invasors
	invasorMatrix.invasors.forEach(invasor => {
		if(collision(invasor,pBullet) && pBullet.imageReady && invasor.active){
			//Destroy invasor and bullet
			invasor.active = false; 
			pBullet.imageReady = false; 

			//Increase the counter of invasors and increase its speed
			invasorMatrix.numInvasorsAlive--; 
			invasorMatrix.invasorsSpeed += invasorMatrix.increaseSpeedFactor; 

			//Increase the score
			hud.score += invasor.scoreEarned
			console.log("Score: " + hud.score); 
		}
	});

	//Check if there are invasors remaining
	if(invasorMatrix.numInvasorsAlive <= 0){
		invasorMatrix.CreateMatrix(6,6); 
	}	

	
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

	Update(keysDown, delta / 1000,tick);
	Render();

	//Update time vars
	then = now;
	tick++; 

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

//____________________________________________________________________
//Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//TIME VARS
var then = Date.now(); 
var tick = 0; 

//INSTANCES VARS
var hud = new Hud(); 

var player = new PlayerShip();
var pBullet = new playerBullet();
player.SetPosition(canvas.width/2,canvas.height * 5/6); 	//set player initial position
var alien1 = new Alien(); 	

var invasorMatrix = new InvasorMatrix(4,4); 


//MAIN GAME LOOP
Reset(); 
Start(); 

main();		//Start the main loop of the game 