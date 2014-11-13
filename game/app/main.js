/***** Global Defines *****/
var WIN_WIDTH = 1280;
var WIN_HEIGHT = 720;
var GAME_SPEED = 0.1;
var RESOURCES;

/* Move inside function after debug */
var canvas, ctx, lastFrame;
	
var players = [];
/* end move */

(function(){
	
	//Setup game
	var start = function(){
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		
		canvas.width = WIN_WIDTH;
		canvas.height = WIN_HEIGHT;
		
		//Load resources
		RESOURCES = new GameResources();
		RESOURCES.loadImages({
			playerShip: 'img/ship.png',
			explosion: 'img/explosion_sprite.png'
		});
		
		//Create players
		for(var i=0; i<20; i++){
			players.push(new Player(getRandomInt(64, WIN_WIDTH/2), getRandomInt(64, WIN_HEIGHT-64), intToChar(i+65)));
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
			players[i].renderShip(ctx);
		}
		
		for(var j in players){
			players[j].renderLabel(ctx);
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