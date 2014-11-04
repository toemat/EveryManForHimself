var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var	last_update;
var the_men = new Array();
var the_lands = new Array();

//Setup stuff
var start = function(){
	last_update = Date.now();
	
	the_lands.push(new Land(0, 350, 600, 50));
	the_lands.push(new Land(300, 250, 200, 30));
	the_lands.push(new Land(100, 225, 80, 30));
	
	setInterval(function(){
		the_men.push(new Man(getRandomInt(0, 600), 50));
	}, 350);
	
	main();
}


// The main game loop
var main = function(){
	var now = Date.now();
	var delta = now - last_update;
	last_update = now;
	
	//Reset canvas
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,600,400);
	
	//Draw world
	for(var i=0; i<the_lands.length; i++){
		the_lands[i].render(ctx);
	}
	
	//Do man stuff
	for(var i=0; i<the_men.length; i++){
		the_men[i].update(delta);
		the_men[i].resolveCollisions(the_lands);
		the_men[i].render(ctx);
	}
  
    //Draw debug
	ctx.fillStyle = "black";
	ctx.font = "12px monospace";
	ctx.fillText(delta + "ms - " + the_men.length + " drops - " + "press F" , 5, 15);

	// Request to do this again ASAP
	requestAnimationFrame(main);
};


document.addEventListener('keydown', function(event){
	if(event.keyCode==70){
		for(var i=0; i<the_men.length; i++){	
			the_men[i].jump();
		}
	}
});


//GO!
start();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}