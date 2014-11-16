(function() {
	var me;
	
    function InputHandler() {
		me = this;
		this.keypresses = [];
		this.returnPressed = false;
		
		document.addEventListener('keydown', this.keyPressed);
		document.addEventListener('keyup',   this.keyUnpressed);
    };

    InputHandler.prototype = {
		getKeypresses: function(){
			var keys = this.keypresses.slice(0);
			this.keypresses = [];
			return keys;
		},
		
		getReturnPressed: function(){
			var pressed = this.returnPressed;
			this.returnPressed = false;
			return pressed;
		},
		
		/*** Private ***/
		keyPressed: function(e){
			if(e.keyCode >= 65 && e.keyCode <= 90){
				if(getIndexOfValueInArray(me.keypresses, e.keyCode) === -1){
					me.keypresses.push(intToChar(e.keyCode));
				}
			}
			
			if(e.keyCode == 13){
				me.returnPressed = true;
			}
		},
		keyUnpressed: function(e){
			if(e.keyCode >= 65 && e.keyCode <= 90){
				var index = getIndexOfValueInArray(me.keypresses, intToChar(e.keyCode));
				if(index !== -1){
					me.keypresses.splice(index);
				}
			}
	
			if(e.keyCode == 13){
				me.returnPressed = false;
			}
		}
    };

    window.InputHandler = InputHandler;
})();