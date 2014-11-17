(function() {
	const COUNTDOWN_WIDTH = 854;
	const COUNTDOWN_Y = 200;
	
	const TIME_PER_COUNTDOWN_STEP = 1000;
	const TIME_BETWEEN_COUNTDOWN_STEP = 200;
	
	const OBSTACLE_INTERVAL = 2500;
	
	const TIME_TO_WAIT_BEFORE_GAMEOVER_SCREEN = 2000;
	
	//Countdown states
	const CDS_3  = 0;
	const CDS_2  = 1;
	const CDS_1  = 2;
	const CDS_GO = 3;
	const CDS_DONE = 4;
	
    function GameLevel() {
		this.totalTime = 0;
		this.countdown_state = CDS_DONE;
		this.countdown_timer = TIME_PER_COUNTDOWN_STEP;
		
		this.obstacles = [];
		this.obstacleTimer = 0;
		
		this.gameover = false;
		this.waitingToGameover = false;
		this.countdownToGameover = TIME_TO_WAIT_BEFORE_GAMEOVER_SCREEN;
    };

    GameLevel.prototype = {
		
		start: function(players){
			this.totalTime = 0;
			this.countdown_state = CDS_3;
			this.countdown_timer = TIME_PER_COUNTDOWN_STEP;
			
			for(var i in players){
				//Place each player at random on the left side
				players[i].move(getRandomInt(50, WIN_WIDTH/2), getRandomInt(50, WIN_HEIGHT-50));
			}
		},
		
		isGameOver: function(){
			return this.gameover;	
		},
		
		update: function(dt, players, keys) {
			this.totalTime += dt;
			
			//3 2 1 GO!
			if(this.countdown_state != CDS_DONE){
				this.countdown_timer -= dt;
				if(this.countdown_timer < 0){
					this.countdown_timer = TIME_PER_COUNTDOWN_STEP;
					this.countdown_state++;
					
					if(this.countdown_state == CDS_GO){
						//Start the game!!! Players gonna play!
						for(var i in players){
							players[i].start();	
						}
					}
				}
			}
			
			//Gereate new obstacle?
			this.obstacleTimer -= dt;
			if(this.obstacleTimer < 0){
				this.obstacles.push(new Obstacle(200, getRandomInt(50, WIN_HEIGHT-150-50)));
				this.obstacleTimer = OBSTACLE_INTERVAL;
			}
			
			//Update obstacles!
			for(var k=0; k<this.obstacles.length; k++){
				this.obstacles[k].update(dt);
			}
			
			//Handle input!
			for(var j=0; j<keys.length; j++){
				if(players[keys[j]] !== undefined){
					players[keys[j]].thrust();
				}
			}
			
			//Update players
			for(var i in players){
				players[i].update(dt);	
			}
			
			var playersAlive = 0;
			var lastAlive;
			for(var i in players){
				if(!players[i].isDead()){
					playersAlive++;
					lastAlive = i;
				}
			}
			if(playersAlive == 1){
				players[lastAlive].setWaiting();
				this.waitingToGameover = true;
			} else {
				//Detect collisions between players and obstacles
				this.detectCollisions(players);
			}
			
			if(this.waitingToGameover){
				this.countdownToGameover -= dt;
				if(this.countdownToGameover < 0){
					this.gameover = true;
				}
			}
        },

        render: function(ctx, players) {
			//Render obstacles
			for(var k=0; k<this.obstacles.length; k++){
				this.obstacles[k].render(ctx);
			}
			
			
			//Render players
			for(var i in players){
				players[i].renderShip(ctx);	
			}
			for(var j in players){
				players[j].renderLabel(ctx);	
			}
			
			//3 2 1 GO!
			if(this.countdown_state != CDS_DONE && this.countdown_timer > TIME_BETWEEN_COUNTDOWN_STEP){
				switch(this.countdown_state){
					case CDS_3: ctx.drawImage(RESOURCES.img.countdown3, WIN_WIDTH/2 - COUNTDOWN_WIDTH/2, COUNTDOWN_Y); break;
					case CDS_2: ctx.drawImage(RESOURCES.img.countdown2, WIN_WIDTH/2 - COUNTDOWN_WIDTH/2, COUNTDOWN_Y); break;
					case CDS_1: ctx.drawImage(RESOURCES.img.countdown1, WIN_WIDTH/2 - COUNTDOWN_WIDTH/2, COUNTDOWN_Y); break;
					case CDS_GO: ctx.drawImage(RESOURCES.img.countdownGo, WIN_WIDTH/2 - COUNTDOWN_WIDTH/2, COUNTDOWN_Y); break;
				}
			}
        },
		
		/**
		 * Private
		 */
		detectCollisions: function(players){
			//Check each player
			for(var i in players){
				//Against each obstacle
				var p = players[i];
				if(!p.isDead()){
					for(var j=0; j<this.obstacles.length; j++){
						var o = this.obstacles[j];
						if((p.posX+p.radius > o.posX && p.posX-p.radius < o.posX+o.width)
							&& (p.posY+p.radius > o.gapPos+o.gapSize || p.posY-p.radius < o.gapPos)) {
							p.die();
						}
					}
				}
			}	
		}
    };

    window.GameLevel = GameLevel;
})();
