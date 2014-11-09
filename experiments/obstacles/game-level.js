const LEVEL_STATE_WAIT = 0;
const LEVEL_STATE_PLAY = 1;

(function() {
    function Obstacle(gapSize, gapPos) {
        this.pos_x = WIN_WIDTH + 10;
		this.width = 35;
		
		this.color = "lime";
		
		this.gapSize = gapSize;
		this.gapPos = gapPos;
    };
	
    window.Obstacle = Obstacle;
})();

(function() {
    function GameLevel() {
		this.state = LEVEL_STATE_WAIT;
		this.levelTime = 0;
		this.levelSpeed = 0.1;
		
		this.obstacles = [];
		this.obstacleInterval = 2500;
		this.timeToNext = 0;
    };

	GameLevel.prototype = {
		
		start: function(){
			this.state = LEVEL_STATE_PLAY;
		},
		
		pause: function(){
			this.state = LEVEL_STATE_WAIT;
		},

		update: function(dt) {
			if(this.state == LEVEL_STATE_PLAY){
				this.levelTime += dt;
		
				//Generate a new obstacle?
				this.timeToNext -= dt;
				if(this.timeToNext < 0){
					this.obstacles.push(new Obstacle(150, getRandomInt(50, WIN_HEIGHT-150-50)));
					
					this.timeToNext = this.obstacleInterval;
				}
				
				//Update obstacle positions
				for(var i=0; i<this.obstacles.length; i++){
					this.obstacles[i].pos_x -= this.levelSpeed * dt;
				}
				
				//Remove old obstacles
				if(this.obstacles.length > 0 && this.obstacles[0].pos_x < -100){
					this.obstacles.shift();
				}
			}
		},
		
		detectCollisions: function(players){
			//Check each player
			for(var i=0; i<players.length; i++){
				//Against each obstacle
				var p = players[i];
				for(var j=0; j<this.obstacles.length; j++){
					var o = this.obstacles[j];
					if((p.pos_x+p.radius > o.pos_x && p.pos_x-p.radius < o.pos_x+o.width)
						&& (p.pos_y+p.radius > o.gapPos+o.gapSize || p.pos_y-p.radius < o.gapPos)) {
						o.color = "red";
						p.die();
					} else {
						o.color = "lime";
					}
				}
			}	
		},

		render: function(ctx) {
			ctx.fillStyle = "lime";
			for(var i=0; i<this.obstacles.length; i++){
				var obs = this.obstacles[i];
				ctx.fillStyle = obs.color;
				ctx.fillRect(obs.pos_x, 0, obs.width, obs.gapPos);
				ctx.fillRect(obs.pos_x, obs.gapPos+obs.gapSize, obs.width, WIN_HEIGHT);
			}
			
			ctx.fillStyle = "white";
			ctx.fillText(this.levelTime + "ms", 5, 30);
		}
	};

    window.GameLevel = GameLevel;
})();