(function() {
    function Player(x,y) {
		this.alive = 1;
		
        this.posX = x;
		this.posY = y;
		
		this.veloX = 0;
		this.accelX = 0;
		
		this.veloY = -3;
		this.accelY = 0.02;
		
		this.rotation = 0.0;	//0.80 max?
		
		this.width = 64;
		this.height = 64;
		
		this.radius = 26;
    };

    Player.prototype = {
		thrust: function(){
			if(this.alive){	
				this.velo_y = -7;
			}
		},
		
		die: function(){
			this.alive = 0;
		},
		
        update: function(dt) {
            
        },

        render: function(ctx) {
			ctx.save();
			
			ctx.translate(this.posX, this.posY);
			ctx.rotate(this.rotation);
			ctx.drawImage(RESOURCES.img.playerShip, -(this.width/2), -(this.height/2));
			
			ctx.restore();
        }
    };

    window.Player = Player;
})();