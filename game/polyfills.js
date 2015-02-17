// window.performance.now() polyfill (mostly for Safari)
// @license http://opensource.org/licenses/MIT
// copyright Paul Irish 2015
(function(){
	if ("performance" in window == false) {
		window.performance = {};
	}
	Date.now = (Date.now || function () { // thanks IE8
		return new Date().getTime();
	});

	if ("now" in window.performance == false){
		var nowOffset = Date.now();
		if (performance.timing && performance.timing.navigationStart){
			nowOffset = performance.timing.navigationStart
		}

		window.performance.now = function now(){
			return Date.now() - nowOffset;
		}
	}
})(); 