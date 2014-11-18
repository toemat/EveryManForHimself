(function() {
	const TITLE_WIDTH = 854;
	const TITLE_Y 	  = 100;
	const INSTRUCTIONS_Y = 500;
	const SHIP_SIZE = 64;
	
    function TitleScreen() {
		this.podY = WIN_HEIGHT/2 - 32 + 60;
		this.podOffset = 0;
		this.totalTime = 0;
    };

    TitleScreen.prototype = {	
		
		update: function(dt) {
			this.totalTime += dt;
			this.podOffset = 15*Math.sin(this.totalTime/1000);
        },

        render: function(ctx) {
			ctx.drawImage(RESOURCES.img.mainTitle, WIN_WIDTH/2 - TITLE_WIDTH/2, TITLE_Y);
			ctx.drawImage(RESOURCES.img.mainInstructions, WIN_WIDTH/2 - TITLE_WIDTH/2, INSTRUCTIONS_Y);
			
			ctx.drawImage(
				RESOURCES.img.playerShip,
				SHIP_SIZE * 5,
				0,
				SHIP_SIZE,
				SHIP_SIZE,
				WIN_WIDTH/2 - SHIP_SIZE/2, 
				Math.floor(this.podY + this.podOffset),
				SHIP_SIZE,
				SHIP_SIZE
			);
        }
    };

    window.TitleScreen = TitleScreen;
})();