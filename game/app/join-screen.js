(function() {
	const TITLE_WIDTH = 854;
	const INSTRUCTIONS_Y = 500;
	
    function JoinScreen() {
		this.totalTime = 0;
    };

    JoinScreen.prototype = {	
		
		update: function(dt) {
			this.totalTime += dt;
        },

        render: function(ctx) {
			ctx.drawImage(RESOURCES.img.joinInstructions, RENDER_WIDTH/2 - TITLE_WIDTH/2, INSTRUCTIONS_Y);
        }
    };

    window.JoinScreen = JoinScreen;
})();