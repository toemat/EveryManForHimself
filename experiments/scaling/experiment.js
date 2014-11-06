var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var	last_update;
var angle = 0;
var ship_img;

//Setup stuff
var start = function(){
	ship_img = new Image();
	ship_img.src = "ship.png";
	
	ctx.imageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
	
	last_update = Date.now();
	main();
}


// The main game loop
var main = function(){
	var now = Date.now();
	var delta = now - last_update;
	last_update = now;
	
	//Draw ground
	ctx.fillStyle = "#2f3852";
	ctx.fillRect(0,0,1280,720);
	ctx.fillStyle = "#be6353";
	ctx.fillRect(0, 680, 1280, 50);
	
	
	//Draw the ship!
	var x = 640;
	var y = 300;
	var w = 64;
	var h = 64;
	
	ctx.fillStyle = "#42dcf0";
	
	ctx.save();
	ctx.translate(x,y);
	ctx.rotate(angle);
	//ctx.fillRect(-(w/2), -(h/2), w, h);
	ctx.drawImage(ship_img, -(w/2), -(h/2));
	ctx.restore();
	
	angle += 0.02;
	
	// Request to do this again ASAP
	requestAnimationFrame(main);
};

//GO!
start();