/**
 * Every Man For Himself
 * 2014 Thomas Renck
 */

/***** Global Defines *****/
var WIN_WIDTH = 1280;
var WIN_HEIGHT = 720;
var GAME_SPEED = 0.1;
var RESOURCES;

//Game states
const GS_LOADING 	= 0;
const GS_TITLE		= 1;
const GS_JOINGAME	= 2;
const GS_PLAYING	= 3;
const GS_GAMEOVER	= 4;

/* Move inside function after debug */
var canvas, ctx, lastFrame;
var actualFrameTime = 0;

var input;
var gameState;
	
var players = {};
var playerCount = 0;
var spaceBg;
var titleScreen;
var joinScreen;
var gameLevel;
var gameoverScreen;
/* end move */

(function(){
	//Setup game
	var start = function(){
		canvas = document.getElementById('canvas');
		canvas.width = WIN_WIDTH;
		canvas.height = WIN_HEIGHT;
		ctx = canvas.getContext('2d');

		reset();
		
		//Load resources
		RESOURCES = new GameResources();
		RESOURCES.loadImages({
			playerShip: 'img/ships.png',
			obstacle: 'img/obstacle1.png',
			explosion: 'img/explosion_sprite.png',
			fireball: 'img/fireball_sprite.png',
			mainTitle: 'img/main_title.png',
			mainInstructions: 'img/main_instructions.png',
			joinInstructions: 'img/join_instructions.png',
			countdown3: 'img/game_start_3.png',
			countdown2: 'img/game_start_2.png',
			countdown1: 'img/game_start_1.png',
			countdownGo: 'img/game_start_go.png',
			gameoverTitle: 'img/game_over_title.png',
			gameoverSub: 'img/game_over_subtitle.png',
			gameoverInstructions: 'img/game_over_instructions.png'
		});
		
		lastFrame = window.performance.now(); //Date.now();
		main();
	}
	
	var reset = function(){
		gameState = GS_LOADING;
		players = {};
		playerCount = 0;
		spaceBg = new Space(200, 50);
		titleScreen = new TitleScreen();
		joinScreen = new JoinScreen();
		input = new InputHandler();
		gameLevel = new GameLevel();
	}

	// The main game loop
	var main = function(){
		var now = window.performance.now();
		var delta = Math.round(now - lastFrame);
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
						var pos = getJoinScreenPosition(playerCount, WIN_WIDTH, WIN_HEIGHT);
						players[keys[i]] = new Player(pos.x, pos.y, keys[i], charToIndex(keys[i]));
						players[keys[i]].veloX = 0;
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
					players[k].renderShip(ctx, 0);
					players[k].renderLabel(ctx, 0);
				}
				
				//Join new players to the game
				if(keys.length > 0){
					for(var i in keys){
						if(players[keys[i]] === undefined){
							var pos = getJoinScreenPosition(playerCount, WIN_WIDTH, WIN_HEIGHT);
							players[keys[i]] = new Player(pos.x, pos.y, keys[i], charToIndex(keys[i]));
							players[keys[i]].veloX = 0;
							playerCount++;
						}
					}
				}
				
				//Press enter to start
				if(input.getReturnPressed()){
					if(playerCount > 1){
						gameState = GS_PLAYING;
						gameLevel.start(players);
					}
				}
			break;
			case GS_PLAYING:
				spaceBg.update(delta);
				gameLevel.update(delta, players, keys);
				
				spaceBg.render(ctx);
				gameLevel.render(ctx, players);

				if(gameLevel.isGameOver()){
					gameState = GS_GAMEOVER;
					
					var winner;
					for(var i in players){
						if(!players[i].isDead()){ winner = players[i] }
					}
					gameoverScreen = new GameOverScreen(winner);	//WINNER?
				}
			break;
			case GS_GAMEOVER:
				spaceBg.update(delta);
				gameoverScreen.update(delta);
				
				spaceBg.render(ctx);
				gameoverScreen.render(ctx);
				
				//Press enter to start
				if(input.getReturnPressed()){
					reset();
				}
			break;
		}
		
		//Draw debug
		ctx.fillStyle = "white";
		ctx.font = "12px monospace";
		ctx.fillText(delta + "ms " + actualFrameTime.toFixed(3) + "ms / " + gameLevel.lastGapSize, 5, 15);

		// Request to do this again ASAP
		requestAnimationFrame(main);
		
		actualFrameTime = window.performance.now() - now;
	};

	//GO!
	start();
})();