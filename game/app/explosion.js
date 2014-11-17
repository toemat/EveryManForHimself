(function() {
	const RUNNING   = 1;
	const FINISHED  = 2;
	const SIZE		= 160;
	const FRAMES 	= 12;
	const FRAMETIME = 60;
	
    function Explosion() {
		this.state = RUNNING;
		this.frame = 0;
		this.frameTime = FRAMETIME;
    };

    Explosion.prototype = {		
	
		isFinished: function(){
			return this.state == FINISHED;
		},
		
		update: function(dt) {
            if(this.state == RUNNING){
				this.posX -= GAME_SPEED * dt;
				
				this.frameTime -= dt;
				
				if(this.frameTime < 0){
					this.frame++;
					if(this.frame > FRAMES){
						this.state = FINISHED;
					}
					this.frameTime = FRAMETIME;
				}
			}
        },

        render: function(ctx) {
			if(this.state == RUNNING){
				ctx.drawImage(
					RESOURCES.img.explosion,
					this.frame * SIZE,
					0,
					SIZE,
					SIZE,
					(0-SIZE/2),
					(0-SIZE/2),
					SIZE,
					SIZE
				);
			}
        }
    };

    window.Explosion = Explosion;
})();