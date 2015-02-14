/**
 * Common Function
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function distanceBetween(x1, y1, x2, y2){
	return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

function intToChar(int){
	return String.fromCharCode(int);
}

function charToIndex(char){
	return char.charCodeAt(0) - 65;
}

function getIndexOfValueInArray(ar, val){
	for (var i = 0; i < ar.length; i++) {
		if (ar[i] === val) {
		  return i;
		}
	}
	return -1;
}

function getJoinScreenPosition(playerIndex, screenW, screenH){
	const GRID = 95;
	var x = screenW/2;
	var y = screenH/2 - 50;
	switch(playerIndex){
		case 0: return { x: x, y:y }
		case 1: return { x: x-GRID, y:y }
		case 2: return { x: x+GRID, y:y }
		case 3: return { x: x, y:y-GRID }
		case 4: return { x: x, y:y+GRID }
		case 5: return { x: x-GRID, y:y-GRID }
		case 6: return { x: x+GRID, y:y-GRID }
		case 7: return { x: x-GRID, y:y+GRID }
		case 8: return { x: x+GRID, y:y+GRID }
		
		case 9:  return { x: x-2*GRID, y:y-1*GRID }
		case 10: return { x: x+2*GRID, y:y-1*GRID }
		case 11: return { x: x-2*GRID, y:y-0*GRID }
		case 12: return { x: x+2*GRID, y:y-0*GRID }
		case 13: return { x: x-2*GRID, y:y+1*GRID }
		case 14: return { x: x+2*GRID, y:y+1*GRID }
		
		case 15: return { x: x-3*GRID, y:y-1*GRID }
		case 16: return { x: x+3*GRID, y:y-1*GRID }
		case 17: return { x: x-3*GRID, y:y-0*GRID }
		case 18: return { x: x+3*GRID, y:y-0*GRID }
		case 19: return { x: x-3*GRID, y:y+1*GRID }
		case 20: return { x: x+3*GRID, y:y+1*GRID }
		
		case 21: return { x: x+0*GRID, y:y-2*GRID }
		case 22: return { x: x+1*GRID, y:y-2*GRID }
		case 23: return { x: x-1*GRID, y:y-2*GRID }
		case 24: return { x: x+2*GRID, y:y-2*GRID }
		case 25: return { x: x-2*GRID, y:y-2*GRID }
	}
}