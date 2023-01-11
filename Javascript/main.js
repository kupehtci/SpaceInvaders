
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
	console.log("Reset Game"); 
}

//____________________________________________________________________
//GAMEOVER
function GameOver(){
	console.log("Game Over"); 
	//reload webpage
	window.location.reload();
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

	hud.Render(ctx,player); 

	//Render the barriers
	barriers.forEach(barrier => {
		barrier.Render(); 
	});
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

	//Check bullet collision with barriers
	// //check collisions with player bullet for shield1
	// for (var i = 0; i < shield[0].barrierBlocks.length; i++)
	// {
	// 	if(collision(pBullet, shield1.barrierBlocks[i]) == true)
	// 	{
	// 		shield1.barrierBlocks.splice(i, 1);
	// 		pBullet.imageReady = false;
	// 	}
	// }
	// //check collisions with player bullet for shield2
	// for (var i = 0; i < shield[1].barrierBlocks.length; i++)
	// {
	// 	if(collision(pBullet, shield2.barrierBlocks[i]) == true)
	// 	{
	// 		shield2.barrierBlocks.splice(i, 1);
	// 		pBullet.imageReady = false;
	// 	}
	// }
	// //check collisions with player bullet for shield3
	// for (var i = 0; i < shield[2].barrierBlocks.length; i++)
	// {
	// 	if(collision(pBullet, shield[2].barrierBlocks[i]) == true)
	// 	{
	// 		shield3.barrierBlocks.splice(i, 1);
	// 		pBullet.imageReady = false;
	// 	}
	// }

	//Check bullet collision with barriers
	for(var i = 0; i < barriers.length; i++){

		for(var j = 0; j < barriers[i].barrierBlocks.length; j++){

			if(collision(pBullet,barriers[i].barrierBlocks[j])){

				barriers[i].barrierBlocks.splice(j,1); 
				pBullet.imageReady = false; 
			}
		}
	}

	//Check if there are invasors remaining
	if(invasorMatrix.numInvasorsAlive <= 0){
		invasorMatrix.CreateMatrix(11,5); 
	}	

	//Check if the player is dead
	if(player.isDead()){
		GameOver();
	}
	
}


//____________________________________________________________________
//CHECK THE INPUTS
var keysDown = {}; 
addEventListener("keydown",function(e){
	keysDown[e.keyCode] = true;
}, false); 
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
var alien1 = new Alien(); 

var barriers = []; 
barriers[0] = new fullBarrier((canvas.width/4)-50, 3*canvas.height/4);
barriers[1] = new fullBarrier(canvas.width/2, 3*canvas.height/4);
barriers[2] = new fullBarrier((3*canvas.width/4)+50, 3*canvas.height/4);

var invasorMatrix = new InvasorMatrix(11,5); 


//MAIN GAME LOOP
Reset(); 
Start(); 

main();		//Start the main loop of the game 