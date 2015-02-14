(function() {
	const TITLE_WIDTH = 854;
	const TITLE_Y = 115;
	const SUBTITLE_Y = 280;
	const INSTRUCTIONS_Y = 600;
	
	const WINNER_Y = 240;
	
    function GameOverScreen(winner) {
		this.totalTime = 0;
		this.winner = winner;
		this.winner.setWaiting();
		this.winner.veloX = 0;
		this.winner.move(WIN_WIDTH/2, WINNER_Y);
    };

    GameOverScreen.prototype = {	
		
		update: function(dt) {
			this.totalTime += dt;
			this.winner.update(dt);
        },

        render: function(ctx) {
			ctx.drawImage(RESOURCES.img.gameoverTitle, WIN_WIDTH/2 - TITLE_WIDTH/2, TITLE_Y);
			ctx.drawImage(RESOURCES.img.gameoverSub, WIN_WIDTH/2 - TITLE_WIDTH/2, SUBTITLE_Y);
			ctx.drawImage(RESOURCES.img.gameoverInstructions, WIN_WIDTH/2 - TITLE_WIDTH/2, INSTRUCTIONS_Y);
			
			this.winner.renderShip(ctx, 0);
			this.winner.renderLabel(ctx, 0);
        }
    };

    window.GameOverScreen = GameOverScreen;
})();