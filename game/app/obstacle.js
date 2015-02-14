(function() {
	const WIDTH = 40;
	
    function Obstacle(posX, gapSize, gapPos) {
        //this.posX = WIN_WIDTH + 10;
		this.posX = posX;
		
		this.width = WIDTH;
		
		this.color = "lime";
		
		this.gapSize = gapSize > 0? gapSize:0;
		this.gapPos = gapPos;
    };
	
	Obstacle.prototype = {
		update: function(dt){
			//this.posX -= dt * GAME_SPEED;
		},
		
		render: function(ctx, worldX){
			var screenX = this.posX - worldX;
			
			ctx.fillStyle = this.color;
			ctx.fillRect(screenX+1, 0, WIDTH-1, this.gapPos);
			ctx.fillRect(screenX+1, this.gapPos+this.gapSize, WIDTH-1, WIN_HEIGHT);
			
			ctx.drawImage(
				RESOURCES.img.obstacle,
				0,
				WIN_HEIGHT - this.gapPos,
				WIDTH,
				this.gapPos,
				screenX, //this.posX,
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
				screenX,
				this.gapPos + this.gapSize,
				WIDTH,
				WIN_HEIGHT - this.gapPos - this.gapSize
			);
		}
	}
    window.Obstacle = Obstacle;
})();