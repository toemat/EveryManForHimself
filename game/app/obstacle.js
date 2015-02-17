(function() {
	const WIDTH = 40;
	
    function Obstacle(posX, gapSize, gapPos) {
        //this.posX = VIEWPORT_WIDTH + 10;
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
			ctx.fillRect(screenX+1, this.gapPos+this.gapSize, WIDTH-1, RENDER_HEIGHT);
			
			ctx.drawImage(
				RESOURCES.img.obstacle,
				0,
				RENDER_HEIGHT - this.gapPos - 40,	//TODO(thomas): -40 is because the image is 720h which _used_ to be the
													//size of the canvas so the math worked out okay. Now the image should be
													//expanded to be 720+40px height?
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
				RENDER_HEIGHT - this.gapPos - this.gapSize,
				screenX,
				this.gapPos + this.gapSize,
				WIDTH,
				RENDER_HEIGHT - this.gapPos - this.gapSize
			);
		}
	}
    window.Obstacle = Obstacle;
})();