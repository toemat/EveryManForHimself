(function() {
	
	var SHAKE_MAGNITUDE = 10;
	var SHAKE_DECAY = 0.4;

	function Viewport(canvas, width, height) {
		this.canvas = canvas;
		this.canvas.width = width;
		this.canvas.height = height;
	
		this.ctx = this.canvas.getContext('2d');
		
		this.cameraCenterX = OVERDRAW_AMOUNT;
		this.cameraCenterY = OVERDRAW_AMOUNT;
		
		this.cameraX = this.cameraCenterX;
		this.cameraY = this.cameraCenterY;
		
		this.shakeMagnitude = 0;
		this.shakeAngle = getRandomInt(0, 360);
	};

	Viewport.prototype = {	
		update: function(dt){
			if(this.shakeMagnitude > 1){
				this.shakeMagnitude -= SHAKE_DECAY;
				
				this.shakeAngle += (150 + getRandomInt(0, 60));
				var offsetX = Math.sin(this.shakeAngle) * this.shakeMagnitude;
				var offsetY = Math.cos(this.shakeAngle) * this.shakeMagnitude;
				
				this.cameraX = Math.floor(this.cameraCenterX + offsetX);
				this.cameraY = Math.floor(this.cameraCenterY + offsetY);
			} else {
				this.shakeMagnitude = 0;
			}
		},
		
		render: function(srcCanvas) {
			this.ctx.drawImage(
				srcCanvas,
				this.cameraX,
				this.cameraY,
				this.canvas.width,
				this.canvas.height,
				0, 0,
				this.canvas.width,
				this.canvas.height
			);
		},
		
		shake: function(){
			this.shakeMagnitude = SHAKE_MAGNITUDE;
		},
		
		getCtx: function(){
			return this.ctx;
		}
	};

	window.Viewport = Viewport;
})();