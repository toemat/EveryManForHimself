(function() {
	const RUNNING   = 1;
	const FINISHED  = 2;
	const WIDTH		= 112;
	const HEIGHT 	= 168;
	const FRAMES 	= 12;
	const FRAMETIME = 80;
	
	const DIR_UP 	= 0;
	const DIR_DOWN	= 1;
	
    function Fireball(dir) {
		this.state = RUNNING;
		this.frame = 0;
		this.frameTime = FRAMETIME;
		
		if(dir == 'up'){
			this.direction = DIR_UP;
		} else {
			this.direction = DIR_DOWN;
		}
    };

    Fireball.prototype = {		
	
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
				if(this.direction == DIR_UP){
					ctx.drawImage(
						RESOURCES.img.fireball,
						this.frame * WIDTH,
						0,
						WIDTH,
						HEIGHT,
						(0-WIDTH/2)+5,
						(0-HEIGHT/2)-80,
						WIDTH,
						HEIGHT
					);
				} else {
					ctx.save();
					ctx.rotate(Math.PI);
					ctx.drawImage(
						RESOURCES.img.fireball,
						this.frame * WIDTH,
						0,
						WIDTH,
						HEIGHT,
						(0-WIDTH/2)+5,
						(0-HEIGHT/2)-80,
						WIDTH,
						HEIGHT
					);
					ctx.restore();
				}
			}
        }
    };

    window.Fireball = Fireball;
})();