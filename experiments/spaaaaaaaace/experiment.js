var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var then;

var the_pod;
var the_p2;

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
	the_p2 = new Pod(150, 75);
	deep_space = new Space(100, 20);
	main();
}


// The main game loop
var main = function(){
	var now = Date.now();
	var delta = now - then;
	
	//Draw ground
	ctx.fillStyle = "#383952";
	ctx.fillRect(0, 0, WIN_WIDTH, WIN_HEIGHT);
	
	deep_space.update(delta);
	deep_space.render(ctx);
	
	
	
	ctx.fillStyle = "#27292f";
	ctx.fillRect(0, 350, WIN_WIDTH, 50);
	
	//Do pod stuff
	the_pod.update(delta);
	the_pod.render(ctx);
	
	the_p2.update(delta);
	the_p2.render(ctx);

	then = now;
	
	//Draw debug
	ctx.fillStyle = "white";
	ctx.font = "12px monospace";
	ctx.fillText("press A or F" , 5, 15);

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

document.addEventListener('keydown', function(event){
	if(event.keyCode==70){
		the_pod.thrust();
	}
	if(event.keyCode==65){
		the_p2.thrust();
	}
});

//GO!
start();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}