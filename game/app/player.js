(function() {
	const DEAD      = 0;
	const ALIVE     = 1;
	const WAITING   = 2;
	const EXPLODING = 3;
	
	const THRUST_VALUE = -5;
	
    function Player(x,y, label, spriteIndex) {
		this.state = WAITING;
		this.label = label;
		this.spriteIndex = spriteIndex;
		this.timeAlive = 0;
		
        this.posX = x;
		this.posY = y;
		
		this.veloX = GAME_SPEED;
		this.veloY = -3;
		this.accelX = 0;
		this.accelY = 0.01;
		
		this.rotation = 0.0;
		
		this.width = 64;
		this.height = 64;
		this.radius = 23;
		
		this.explosion = null;
		this.exhaustPipe = new ExhaustPipe(x, y);
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
			if(this.state == ALIVE){
				this.state = EXPLODING;
				this.explosion = new Explosion();
				
				viewport.shake();	//TODO(thomas): This globalness needs to stop...
			}
		},
		
		dieTooLow: function(){
			if(this.state == ALIVE){
				this.state = EXPLODING;
				this.posY = RENDER_HEIGHT;
				this.explosion = new Fireball('up');
				viewport.shake();	//TODO(thomas): This globalness needs to stop...
			}
		},
		
		dieTooHigh: function(){
			if(this.state == ALIVE){
				this.state = EXPLODING;
				this.posY = 0;
				this.explosion = new Fireball('down');
				viewport.shake();	//TODO(thomas): This globalness needs to stop...
			}
		},
		
        update: function(dt) {
			switch(this.state){
				case ALIVE:
					//Right now there's no accel for X, just a constant velocity
					this.posX += this.veloX * dt;
					
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
					if(this.posY > VIEWPORT_HEIGHT + this.radius){	//TODO(thomas): This will need to be corrected for new duel canvas rendering
						this.dieTooLow();
					}
				break;
				case WAITING:
					this.posX += this.veloX * dt;
				break;
				case EXPLODING:
					if(this.explosion.isFinished()){
						this.state = DEAD;	
					} else {
						//this.posX -= GAME_SPEED * dt; No longer doing this in world relitive mode
						this.explosion.update(dt);
					}
				break;
			}
			
			this.exhaustPipe.update(dt, this.posX, this.posY, this.rotation);
        },

        renderShip: function(ctx, worldX) {
			
			this.exhaustPipe.render(ctx, worldX);
			
			var screenX = this.posX - worldX;
			
			switch(this.state){
				case ALIVE:
				case WAITING:
					ctx.save();
					ctx.translate(screenX, this.posY);
					ctx.rotate(this.rotation);

					ctx.drawImage(
						RESOURCES.img.playerShip, 
						this.spriteIndex * this.width,
						0,
						this.width,
						this.height,
						-(this.width/2), 
						-(this.height/2),
						this.width,
						this.height
					);
					
					ctx.restore();
				break;
				case EXPLODING:
					ctx.save();
					ctx.translate(screenX, this.posY);
					this.explosion.render(ctx);
					ctx.restore();
				break;
			}
        },
		
		renderLabel: function(ctx, worldX) {
			
			var screenX = this.posX - worldX;
			
			if(this.state != DEAD){
				ctx.save();

				ctx.fillStyle = "white";
				ctx.font = "16px monospace";

				ctx.translate(screenX, this.posY);
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