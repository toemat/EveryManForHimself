var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var then;

var the_pod;
var game_level;

var deep_space;
var RESOURCES = {};

var WIN_WIDTH = 600;
var WIN_HEIGHT = 400;

//Setup stuff
var start = function(){
	RESOURCES.pod_img = new Image();
	RESOURCES.pod_img.src = "ship.png";
	
	then = Date.now();
	the_pod = new Pod(285, 75);
	game_level = new GameLevel();
	game_level.start();
	
	deep_space = new Space(100, 20);
	main();
}


// The main game loop
var main = function(){
	var now = Date.now();
	var delta = now - then;
	
	//Draw bg
	ctx.fillStyle = "#383952";
	ctx.fillRect(0, 0, WIN_WIDTH, WIN_HEIGHT);
	
	//Update game
	deep_space.update(delta);
	game_level.update(delta);
	the_pod.update(delta);
	
	//Collisions
	game_level.detectCollisions([the_pod]);
	
	if(!the_pod.alive){
		game_level.pause();
	}
	
	//Render
	deep_space.render(ctx);	
	game_level.render(ctx);
	the_pod.render(ctx);
	
	then = now;
	
	//Draw debug
	ctx.fillStyle = "white";
	ctx.font = "12px monospace";
	ctx.fillText("press F" , 5, 15);

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

document.addEventListener('keydown', function(event){
	if(event.keyCode==70){
		the_pod.thrust();
	}
});

//GO!
start();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}