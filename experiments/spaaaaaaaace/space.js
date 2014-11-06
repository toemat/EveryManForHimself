(function() {
    function Star(x,y,speed) {
        this.pos_x = x;
		this.pos_y = y;
		this.speed = speed;
    };
	
    window.Star = Star;
})();

(function() {
    function Space(deepspace_count, closer_count) {
        this.stars = [];
		for(var i=0; i<deepspace_count; i++){
			this.stars.push(new Star(
				getRandomInt(0, WIN_WIDTH), 
				getRandomInt(0, WIN_HEIGHT),
				0.25
			));
		}
		for(var i=0; i<closer_count; i++){
			this.stars.push(new Star(
				getRandomInt(0, WIN_WIDTH), 
				getRandomInt(0, WIN_HEIGHT),
				0.5
			));
		}
    };

    Space.prototype = {

        update: function(dt) {
        	for(var i=0; i<this.stars.length; i++){
				var x = this.stars[i].pos_x;
				if(x < -10){
					x = WIN_WIDTH + 10;
				} else {
					x = x - this.stars[i].speed;
				}
				this.stars[i].pos_x = x;
			}
        },

        render: function(ctx) {
			ctx.fillStyle = "white";
			for(var i=0; i<this.stars.length; i++){
				ctx.fillRect(this.stars[i].pos_x, this.stars[i].pos_y, 2, 2);	
			}
        }
    };

    window.Space = Space;
})();