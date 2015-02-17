(function() {
    function Smoke(x,y) {
        this.x = x;
		this.y = y;
		this.opacity = getRandomInt(40,75) / 100.0;
    };
	
    window.Smoke = Smoke;
})();

(function() {
	const DISTANCE_BETWEEN_SMOKE_BURSTS = 5;
	const MAX_SMOKIES = 100;
	
    function ExhaustPipe(x, y) {
		this.smokies = [];
		
		this.lastX = x;
		this.lastY = y;
		this.distanceTimer = 0;
    };

    ExhaustPipe.prototype = {
		update: function(dt, x, y, rotation) {
			
			if(gameState != GS_PLAYING){
				return;
			}

			this.distanceTimer -= distanceBetween(this.lastX, this.lastY, x, y);
			this.lastX = x; this.lastY = y;
			
			for(var i=0; i<this.smokies.length; i++){
				this.smokies[i].opacity -= 0.0005 * dt;
				if(this.smokies[i].opacity < 0.00){
					this.smokies[i].opacity = 0.00;
				}
			}
			
			if(this.distanceTimer < 0){
				//console.log(this.distanceTimer); ///REMOVE!!!!
				var xJitter = getRandomInt(-1, 1);
				var yJitter = getRandomInt(-1, 1);
				
				//this.smokies.push(new Smoke(x + xJitter - 35, y + yJitter));
				
				var offsetScale = 35;
				var offsetX = offsetScale * Math.cos(rotation);
				var offsetY = offsetScale * Math.sin(rotation);
				
				
				this.smokies.push(new Smoke(x - offsetX, y - offsetY - 5));
				
				
				if(this.smokies.length > MAX_SMOKIES){
					this.smokies.shift();
				}
				
				this.distanceTimer = DISTANCE_BETWEEN_SMOKE_BURSTS;
			}
        },

        render: function(ctx, worldX) {
			
			if(gameState != GS_PLAYING){
				return;
			}
			
			ctx.fillStyle = "white";
			
			for(var i=0; i<this.smokies.length; i++){
				if(this.smokies[i].opacity > 0.001){
					ctx.globalAlpha = this.smokies[i].opacity;
					ctx.fillRect(this.smokies[i].x-worldX, this.smokies[i].y, 10, 10);	
				}
			}
			
			ctx.globalAlpha = 1.0;
		}		
    };

    window.ExhaustPipe = ExhaustPipe;
})();