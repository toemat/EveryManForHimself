var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var	last_update;
var angle = 0;

//Setup stuff
var start = function(){
	last_update = Date.now();
	main();
}


// The main game loop
var main = function(){
	var now = Date.now();
	var delta = now - last_update;
	last_update = now;
	
	//Draw ground
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,600,400);
	ctx.fillStyle = "#be6353";
	ctx.fillRect(0, 350, 600, 50);
	
	
	//Draw rectangle dude by transforming the canvas
	var x = 300;
	var y = 200;
	var w = 50;
	var h = 70;
	
	ctx.fillStyle = "#42dcf0";
	
	ctx.save();
	ctx.translate(x,y);
	ctx.rotate(angle);
	ctx.fillRect(-(w/2), -(h/2), w, h);
	ctx.restore();
	
	angle += 0.02;
	
	// Request to do this again ASAP
	requestAnimationFrame(main);
};

//GO!
start();