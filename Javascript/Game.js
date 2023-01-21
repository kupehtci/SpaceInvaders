
//____________________________________________________________________
//MAIN VARS

var canvas; 
var ctx; 
// var screenWidth = 640; 
// var screenHeight = 500; 
var screenWidth = 720; 
var screenHeight = 840; 


//____________________________________________________________________
//CREATE CANVAS IN SCREEN
canvas = document.createElement("canvas"); 
ctx = canvas.getContext("2d"); 

canvas.width = screenWidth; 
canvas.height = screenHeight;

document.body.appendChild(canvas);      //Create the canvas in the HTML document

//___________________________________________________________________
//SOUNDS
const enemyDeathSound = new Audio("sounds/deathscream.wav");
const gameLoose = new Audio("sounds/explosion.wav");
const gameWin = new Audio("sounds/win.wav");
const bulletClash = new Audio("sounds/hitmarker.wav");
const bulletBlocked = new Audio("sounds/ping gun.wav");

//___________________________________________________________________
//EMPTY


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
//RESTART THE GAME
function Restart(){

	//Restart all the variables
	hud.score = 0;
	hud.GameOverShutDown();  

	player = new PlayerShip(); 
	pBullet.imageReady = false; 

	barriers[0] = new fullBarrier((canvas.width/4)-50, 3*canvas.height/4);
	barriers[1] = new fullBarrier(canvas.width/2, 3*canvas.height/4);
	barriers[2] = new fullBarrier((3*canvas.width/4)+50, 3*canvas.height/4);

	invasorBullet.imageReady = false; 
	invasorMatrix.ClearMatrix(); 
	invasorMatrix.CreateMatrix(11,5); 

	//Reset time vars
	tick = 0; 
	then = Date.now();
} 

//____________________________________________________________________
//RENDER THE GAME
function Render(){
	
	//Render a Background with colour Black aa
	ctx.fillStyle = "black"; 
	ctx.fillRect(0,0,canvas.width,canvas.height); 

	//Render the player
	player.Render(); 
	//Render the bullets
	pBullet.Render();
	invasorBullet.Render();

	invasorMatrix.Render(); 



	//Render the barriers
	barriers.forEach(barrier => {
		barrier.Render(); 
	});

	//Render the HUD that contain the lives and the score
	hud.Render(ctx,player); 
}

function Update(keysDownArray, modifier, ticks){
	

	player.Update(keysDownArray,modifier); 
	pBullet.Update(modifier);
	invasorBullet.Update(modifier);
	invasorMatrix.Update(ticks); 

	//Check player collision with invasor
	invasorMatrix.invasors.forEach(invasor => {
		if(collision(invasor,player) && invasor.active){
			gameLoose.currentTime = 0;
    		gameLoose.play();
			player.lives--;
		}
	});

	//Check bullet collision with invasors
	invasorMatrix.invasors.forEach(invasor => {
		if(collision(invasor,pBullet) && pBullet.imageReady && invasor.active){
			enemyDeathSound.currentTime = 0;
    		enemyDeathSound.play();
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

	//Check invaderBullet collision with player
	if(collision(player, invasorBullet) && invasorBullet.imageReady && player.lives > 0){
		gameLoose.currentTime = 0;
    	gameLoose.play();
		//Destroy bullet and take out player life
		invasorBullet.imageReady = false; 
		player.lives--; 

		//Check if the player is dead
		if(player.isDead()){
			hud.GameOver();
		}	
	}

	//Check invaderBullet collision with playerBullet
	if(collision(invasorBullet,pBullet) && pBullet.imageReady && invasorBullet.imageReady){
			bulletClash.currentTime = 0;
    		bulletClash.play();
			//Destroy invasorBullet and playerBullet
			invasorBullet.imageReady = false; 
			pBullet.imageReady = false; 
			console.log("Collision bw bullets")
		}

	//Check bullet collision with barriers
	for(var i = 0; i < barriers.length; i++){

		for(var j = 0; j < barriers[i].barrierBlocks.length; j++){

			if(collision(pBullet,barriers[i]?.barrierBlocks[j])){
				bulletBlocked.currentTime = 0;
    			bulletBlocked.play();
				barriers[i]?.barrierBlocks?.splice(j,1); 
				pBullet.imageReady = false; 
			}
			if(collision(invasorBullet,barriers[i].barrierBlocks[j])){
				bulletBlocked.currentTime = 0;
    			bulletBlocked.play();
				barriers[i].barrierBlocks.splice(j,1); 
				invasorBullet.imageReady = false; 
			}
		}
	}

	//Check if there are invasors remaining
	if(invasorMatrix.numInvasorsAlive <= 0){
		gameWin.currentTime = 0;
        gameWin.play();
		invasorMatrix.invasorsSpeed -= invasorMatrix.lastInvasorSpeedIncrement;
		invasorMatrix.CreateMatrix(11,5); 
		lastInvaderSpeedIncremented = false;
	}
	//Increase a lot the speed of the last invader
	if (invasorMatrix.numInvasorsAlive == 1 && lastInvaderSpeedIncremented == false){
		invasorMatrix.invasorsSpeed += invasorMatrix.lastInvasorSpeedIncrement;
		lastInvaderSpeedIncremented = true;
	}

	//If player dies, game over
	if(player.isDead()){
		hud.GameOver();
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

//if click enter restart the game
addEventListener("keydown",function(e){
	if(e.keyCode == 13 && hud.gameOverActive){
		Restart(); 
	}
}, false);

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

//LAST INVADER CONTROL VAR
var lastInvaderSpeedIncremented = false;

//INSTANCES VARS

var hud = new Hud(); 
var player = new PlayerShip();
var pBullet = new playerBullet();

var barriers = []; 
barriers[0] = new fullBarrier((canvas.width/4)-50, 3*canvas.height/4);
barriers[1] = new fullBarrier(canvas.width/2, 3*canvas.height/4);
barriers[2] = new fullBarrier((3*canvas.width/4)+50, 3*canvas.height/4);

var invasorBullet = new InvasorBullet();
var invasorMatrix = new InvasorMatrix(11,5); 



//MAIN GAME LOOP
Reset(); 
Start(); 

main();		//Start the main loop of the game 