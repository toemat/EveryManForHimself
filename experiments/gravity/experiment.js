var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var then;
var the_man;

//Setup stuff
var start = function(){
	then = Date.now();
	the_man = new Man(285, 50);
	main();
}


// The main game loop
var main = function(){
	var now = Date.now();
	var delta = now - then;
	
	//Draw ground
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,600,400);
	ctx.fillStyle = "#be6353";
	ctx.fillRect(0, 350, 600, 50);
	
	//Do man stuff
	the_man.update(delta);
	the_man.render(ctx);

	then = now;
	
	//Draw debug
	ctx.fillStyle = "black";
	ctx.font = "12px monospace";
	ctx.fillText("press F" , 5, 15);

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

document.addEventListener('keydown', function(event){
	if(event.keyCode==70){
		the_man.jump();
	}
});

//GO!
start();