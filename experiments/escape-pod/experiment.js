var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var then;
var the_pod;
var RESOURCES = {};

//Setup stuff
var start = function(){
	RESOURCES.pod_img = new Image();
	RESOURCES.pod_img.src = "ship.png";
	
	then = Date.now();
	the_pod = new Pod(285, 75);
	main();
}


// The main game loop
var main = function(){
	var now = Date.now();
	var delta = now - then;
	
	//Draw ground
	ctx.fillStyle = "#383952";
	ctx.fillRect(0,0,600,400);
	ctx.fillStyle = "#27292f";
	ctx.fillRect(0, 350, 600, 50);
	
	//Do pod stuff
	the_pod.update(delta);
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