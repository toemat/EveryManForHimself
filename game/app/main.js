/***** Global Defines *****/
var WIN_WIDTH = 1280;
var WIN_HEIGHT = 720;
var GAME_SPEED = 0.1;
var RESOURCES;

/* Move inside function after debug */
var canvas, ctx, lastFrame;

var gameState;
	
var players = {};
var playerCount = 0;
var spaceBg;
var titleScreen;
var joinScreen;
var input;
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
		canvas.width = WIN_WIDTH;
		canvas.height = WIN_HEIGHT;
		ctx = canvas.getContext('2d');
		
		gameState = GS_LOADING;
		spaceBg = new Space(200, 50);
		titleScreen = new TitleScreen();
		joinScreen = new JoinScreen();
		input = new InputHandler();
		
		//Load resources
		RESOURCES = new GameResources();
		RESOURCES.loadImages({
			playerShip: 'img/ship.png',
			explosion: 'img/explosion_sprite.png',
			mainTitle: 'img/main_title.png',
			mainInstructions: 'img/main_instructions.png',
			joinInstructions: 'img/join_instructions.png'
		});
		
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
		
		//Get input
		var keys = input.getKeypresses();
		
		switch(gameState){
			case GS_LOADING:
				if(RESOURCES.finishedLoading()){
					gameState = GS_TITLE;
				}
			break;
			case GS_TITLE:
				spaceBg.update(delta);
				titleScreen.update(delta);
				
				spaceBg.render(ctx);
				titleScreen.render(ctx);
				
				//Join the keypresses on title screen to the game, then move to joingame screen
				if(keys.length > 0){
					for(var i in keys){
						console.log("ADDING PLAYER: ", keys[i]);	//Todo: remove
						var pos = getJoinScreenPosition(playerCount, WIN_WIDTH, WIN_HEIGHT);
						players[keys[i]] = new Player(pos.x, pos.y, keys[i]);
						playerCount++;
					}
					gameState = GS_JOINGAME;
				}
			break;
			case GS_JOINGAME:
				spaceBg.update(delta);
				joinScreen.update(delta);
				
				spaceBg.render(ctx);
				joinScreen.render(ctx);
				
				for(var k in players){
					players[k].update(delta);
					players[k].renderShip(ctx);
					players[k].renderLabel(ctx);
				}
				
				//Join new players to the game
				if(keys.length > 0){
					for(var i in keys){
						if(players[keys[i]] === undefined){
							console.log("ADDING PLAYER: ", keys[i]);	//Todo: remove
							var pos = getJoinScreenPosition(playerCount, WIN_WIDTH, WIN_HEIGHT);
							players[keys[i]] = new Player(pos.x, pos.y, keys[i]);
							playerCount++;
						}
					}
				}
				
				//Press enter to start
				if(input.getReturnPressed()){
					console.log("Starting game!");
					gameState = GS_PLAYING;
				}
			break;
			case GS_PLAYING:
			break;
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