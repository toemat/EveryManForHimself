(function() {
    function Man(x,y) {
        this.pos_x = x;
		
		this.pos_y = y;
		this.velo_y = -3;
		this.accel_y = 0.02;
		
		this.width = 30;
		this.height = 50;
    };

    Man.prototype = {
		jump: function(){
			this.velo_y = -7;
		},
		
        update: function(dt) {
            //New velocity based on how long it's been since last update
			this.velo_y = this.velo_y + (this.accel_y * dt);
			
			//New position based on velocity
			this.pos_y = this.pos_y + this.velo_y;
			
			//Bind to ground
			if(this.pos_y + this.height > 350) {
				this.pos_y = 350-this.height;
				this.velo_y = 0;
			}
        },

        render: function(ctx) {
			ctx.fillStyle = "#49dcff";
			ctx.fillRect(this.pos_x, this.pos_y, this.width, this.height);
        }
    };

    window.Man = Man;
})();