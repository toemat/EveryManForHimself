/***** Global Defines *****/
var WIN_WIDTH = 600;
var WIN_HEIGHT = 400;
var RESOURCES;

(function(){
	var canvas, ctx, lastFrame;
	
	var players = [];
	
	//Setup game
	var start = function(){
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		
		//Load resources
		RESOURCES = new GameResources();
		RESOURCES.loadImages({
			playerShip: 'img/ship.png'
		});
		
		//Create players
		for(var i=0; i<20; i++){
			players.push(new Player(getRandomInt(64, WIN_WIDTH-64), getRandomInt(64, WIN_HEIGHT-64)));
		}

		lastFrame = Date.now();
		main();
	}

	// The main game loop
	var main = function(){
		var now = Date.now();
		var delta = now - lastFrame;
		lastFrame = now;

		//Draw bg
		ctx.fillStyle = "#383952";
		ctx.fillRect(0, 0, WIN_WIDTH, WIN_HEIGHT);
		
		for(var i in players){
			players[i].update(delta);
			players[i].render(ctx);
		}
		
		//Draw debug
		ctx.fillStyle = "white";
		ctx.font = "12px monospace";
		ctx.fillText(delta + "ms" , 5, 15);

		// Request to do this again ASAP
		requestAnimationFrame(main);
	};

	//GO!
	start();
})();