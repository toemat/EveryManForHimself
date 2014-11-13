(function() {
    function GameResources() {
		this.img = {};
		this.snd = {};
		
		this.numImages = 0;
		this.numImagesLoaded = 0;
    };
	
	GameResources.prototype = {
		loadImages: function(images){
			var me = this;
			for(key in images){
				var img = new Image();
				img.src = images[key];
				img.onload = function(){ me.numImagesLoaded++; }
				
				this.img[key] = img;
				this.numImages++;
			}
		},
		
		finishedLoading: function(){
			if(this.numImagesLoaded == this.numImages){
				return true;
			} else {
				return false;
			}
		}
	}

    window.GameResources = GameResources;
})();