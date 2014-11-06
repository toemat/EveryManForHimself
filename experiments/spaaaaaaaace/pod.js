(function() {
    function Pod(x,y) {
        this.pos_x = x;
		
		this.pos_y = y;
		this.velo_y = -3;
		this.accel_y = 0.02;
		
		this.rotation = 0.80;	//0.80 max?
		
		this.width = 64;
		this.height = 64;
    };

    Pod.prototype = {
		thrust: function(){
			this.velo_y = -7;
		},
		
        update: function(dt) {
            //New velocity based on how long it's been since last update
			this.velo_y = this.velo_y + (this.accel_y * dt);
			
			//New position based on velocity
			this.pos_y = this.pos_y + this.velo_y;
			
			//Bind to ground
			if(this.pos_y+26  > 350) {
				this.pos_y = 350-26;
				this.velo_y = 0;
			} else {
				this.rotation = this.velo_y * 0.05;
			}
        },

        render: function(ctx) {
			ctx.save();
			ctx.translate(this.pos_x, this.pos_y);
			ctx.rotate(this.rotation);
			ctx.drawImage(RESOURCES.pod_img, -(this.width/2), -(this.height/2));
			ctx.restore();
        }
    };

    window.Pod = Pod;
})();