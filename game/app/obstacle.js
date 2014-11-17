(function() {
    function Obstacle(gapSize, gapPos) {
        this.posX = WIN_WIDTH + 10;
		this.width = 35;
		
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
			ctx.fillRect(this.posX, 0, this.width, this.gapPos);
			ctx.fillRect(this.posX, this.gapPos+this.gapSize, this.width, WIN_HEIGHT);
		}
	}
    window.Obstacle = Obstacle;
})();