(function() {
    function GameResources() {
		this.img = {};
		this.snd = {};
    };
	
	GameResources.prototype = {
		loadImages: function(images){
			for(key in images){
				var img = new Image();
				img.src = images[key];
				
				this.img[key] = img;
			}
		},
	}

    window.GameResources = GameResources;
})();