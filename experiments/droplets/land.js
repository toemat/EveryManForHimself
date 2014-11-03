(function() {
    function Land(x,y,w,h) {
        this.pos_x = x;
		this.pos_y = y;
		this.width = w;
		this.height = h;
    };

    Land.prototype = {
        render: function(ctx) {
			ctx.fillStyle = "#be6353";
			ctx.fillRect(this.pos_x, this.pos_y, this.width, this.height);
        }
    };

    window.Land = Land;
})();