(function() {
	const WIDTH = 40;
	
    function Obstacle(gapSize, gapPos) {
        this.posX = WIN_WIDTH + 10;
		
		this.width = WIDTH;
		
		this.color = "lime";
		
		this.gapSize = gapSize;
		this.gapPos = gapPos;
    };
	
	Obstacle.prototype = {
		update: function(dt){
			this.posX -= dt * GAME_SPEED;
		},
		
		render: function(ctx){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.posX+1, 0, WIDTH-1, this.gapPos);
			ctx.fillRect(this.posX+1, this.gapPos+this.gapSize, WIDTH-1, WIN_HEIGHT);
			
			ctx.drawImage(
				RESOURCES.img.obstacle,
				0,
				WIN_HEIGHT - this.gapPos,
				WIDTH,
				this.gapPos,
				this.posX,
				0,
				WIDTH,
				this.gapPos
			);
			
			ctx.drawImage(
				RESOURCES.img.obstacle,
				0,
				0,
				WIDTH,
				WIN_HEIGHT - this.gapPos - this.gapSize,
				this.posX,
				this.gapPos + this.gapSize,
				WIDTH,
				WIN_HEIGHT - this.gapPos - this.gapSize
			);
		}
	}
    window.Obstacle = Obstacle;
})();