(function() {
	const DEAD      = 0;
	const ALIVE     = 1;
	const WAITING   = 2;
	const EXPLODING = 3;
	
	const THRUST_VALUE = -5;
	
    function Player(x,y, label) {
		this.state = WAITING;
		this.label = label;
		
        this.posX = x;
		this.posY = y;
		
		this.veloX = 0;
		this.accelX = 0;
		
		this.veloY = -3;
		this.accelY = 0.01;
		
		this.rotation = 0.0;	//0.80 max?
		
		this.width = 64;
		this.height = 64;
		
		this.radius = 26;
		
		this.timeAlive = 0;
		
		this.explosion = null;
    };

    Player.prototype = {
		thrust: function(){
			if(this.state == ALIVE){	
				this.veloY = THRUST_VALUE;
			}
		},
		
		move: function(x, y){
			this.posX = x;
			this.posY = y;
		},
		
		start: function(){
			this.state = ALIVE;
			this.timeAlive = 0;
		},
		
		isAlive: function(){
			return this.state == ALIVE;
		},
		
		isDead: function() {
			if(this.state == EXPLODING || this.state == DEAD){
				return true;
			} else {
				return false;
			}
		},
			
		setWaiting: function(){
			this.state = WAITING;
			this.veloY = 0;
			this.rotation = 0;
		},
		
		die: function(){
			if(this.state == ALIVE || this.state == WAITING){	//TODO: remove waiting - just testing
				this.state = EXPLODING;
				this.explosion = new Explosion();
			}
		},
		
		dieTooLow: function(){
			if(this.state == ALIVE){
				this.state = EXPLODING;
				this.posY = WIN_HEIGHT;
				this.explosion = new Fireball('up');
			}
		},
		
		dieTooHigh: function(){
			if(this.state == ALIVE){
				this.state = EXPLODING;
				this.posY = 0;
				this.explosion = new Fireball('down');
			}
		},
		
        update: function(dt) {
			switch(this.state){
				case ALIVE:
					//New velocity based on how long it's been since last update
					this.veloY = this.veloY + (this.accelY * dt);

					//Rotate based on velocity
					this.rotation = this.veloY * 0.05;
					
					//New position based on velocity
					this.posY = this.posY + this.veloY;

					//Keep track of how long they're alive
					this.timeAlive += dt;
					
					//Die if off screen!
					if(this.posY + this.radius < 0){
						this.dieTooHigh();
					}
					if(this.posY > WIN_HEIGHT + this.radius){
						this.dieTooLow();
					}
				break;
				case EXPLODING:
					if(this.explosion.isFinished()){
						this.state = DEAD;	
					} else {
						this.posX -= GAME_SPEED * dt;
						this.explosion.update(dt);
					}
				break;
			}
        },

        renderShip: function(ctx) {
			switch(this.state){
				case ALIVE:
				case WAITING:
					ctx.save();
			
					ctx.translate(this.posX, this.posY);
					ctx.rotate(this.rotation);
					ctx.drawImage(RESOURCES.img.playerShip, -(this.width/2), -(this.height/2));

					ctx.restore();
				break;
				case EXPLODING:
					ctx.save();
					ctx.translate(this.posX, this.posY);
					this.explosion.render(ctx);
					ctx.restore();
				break;
			}
        },
		
		renderLabel: function(ctx) {
			if(this.state != DEAD){
				ctx.save();

				ctx.fillStyle = "white";
				ctx.font = "16px monospace";

				ctx.translate(this.posX, this.posY);
				ctx.fillText(this.label, 0, -40);

				ctx.beginPath();
				ctx.moveTo(0,-35);
				ctx.lineTo(10, -35);
				ctx.lineTo(5,-30);
				ctx.fill();

				ctx.restore();
			}
		}
    };

    window.Player = Player;
})();