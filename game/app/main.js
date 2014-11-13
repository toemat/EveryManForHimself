/***** Global Defines *****/
var WIN_WIDTH = 1280;
var WIN_HEIGHT = 720;
var GAME_SPEED = 0.1;
var RESOURCES;

/* Move inside function after debug */
var canvas, ctx, lastFrame;

var gameState;
	
var players = [];
var space_bg;

var title;
/* end move */

(function(){
	//Game states
	const GS_LOADING 	= 0;
	const GS_TITLE		= 1;
	const GS_JOINGAME	= 2;
	const GS_PLAYING	= 3;
	
	//Setup game
	var start = function(){
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		
		canvas.width = WIN_WIDTH;
		canvas.height = WIN_HEIGHT;
		
		gameState = GS_LOADING;
		
		//Load resources
		RESOURCES = new GameResources();
		RESOURCES.loadImages({
			playerShip: 'img/ship.png',
			explosion: 'img/explosion_sprite.png',
			mainTitle: 'img/main_title.png',
			mainInstructions: 'img/main_instructions.png'
		});
		
		//Stars
		space_bg = new Space(200, 50);
		
		//Create players
	//	for(var i=0; i<20; i++){
	//		players.push(new Player(getRandomInt(64, WIN_WIDTH/2), getRandomInt(64, WIN_HEIGHT-64), intToChar(i+65)));
	//	}
		
		//Title
		title = new TitleScreen();

		lastFrame = Date.now();
		main();
	}

	// The main game loop
	var main = function(){
		var now = Date.now();
		var delta = now - lastFrame;
		lastFrame = now;

		//Clear screen
		ctx.fillStyle = "#383952";
		ctx.fillRect(0, 0, WIN_WIDTH, WIN_HEIGHT);
		
		switch(gameState){
			case GS_LOADING:
				if(RESOURCES.finishedLoading()){
					gameState = GS_TITLE;
				}
			break;
			case GS_TITLE:
				space_bg.update(delta);
				title.update(delta);
				
				space_bg.render(ctx);
				title.render(ctx);
			break;
			case GS_JOINGAME:
			break;
			case GS_PLAYING:
			break;
		}
		
		
		
		
		
		
		
		
		
		
		/*
		for(var i in players){
			players[i].update(delta);
			players[i].renderShip(ctx);
		}
		
		for(var j in players){
			players[j].renderLabel(ctx);
		}
		
		*/
		
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