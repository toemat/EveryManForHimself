(function() {
    function Man(x,y) {
        this.pos_x = x;
		
		this.pos_y = y;
		this.velo_y = -3;
		this.accel_y = 0.02;
		
		this.width = 5;
		this.height = 7;
		
		this.color = "#49dcff";
    };

	//Public interface
    Man.prototype = {
		jump: function(){
			this.velo_y = -7 + Math.random();
		},
		
        update: function(dt) {
            //New velocity based on how long it's been since last update
			this.velo_y = this.velo_y + (this.accel_y * dt);
			
			//New position based on velocity
			this.pos_y = this.pos_y + this.velo_y;
        },
		
		resolveCollisions: function(stuffThatMightBeColliding){
			for(var i=0; i<stuffThatMightBeColliding.length; i++){
				if(this.isCollidingWith(stuffThatMightBeColliding[i])){
					this.pos_y = stuffThatMightBeColliding[i].pos_y - this.height;
					this.velo_y = 0;
				}
			}
		},

        render: function(ctx) {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.pos_x, this.pos_y, this.width, this.height);
        },
		
		isCollidingWith: function(something){
			return !(this.pos_x + this.width <= something.pos_x || this.pos_x > something.pos_x + something.width ||
					 this.pos_y + this.height <= something.pos_y || this.pos_y > something.pos_y + something.height);
		}
    };

    window.Man = Man;
})();