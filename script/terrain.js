
function createCoast(){
	for (var i = 0; i < tiles.length; i++) {
		for (var j = 0; j < tiles[i].length; j++) {
			if(tiles[i][j].corner){
				tiles[i][j].makeWater();
			}
			if(i == 1 || j == 1 || i == numberOfTiles-2 || j == numberOfTiles-2){
				createLake(tiles[i][j], 700);
			}
		}
	}
}

var lakeCounter = 0;
function createLake(currentTile, size) {
	lakeCounter += 1;
	currentTile.makeWater();
	if(currentTile.corner || lakeCounter > size){
		lakeCounter = 0
		return;
	}
	var next = int(random(8));
	for(var i = 0; i < currentTile.neighbors.length; i++){
		if(i != next){
			currentTile.neighbors[i].makeWater();
			/*for(var j = 0; j < currentTile.neighbors[i].neighbors.length; j++){
				if(currentTile.neighbors[i].neighbors[j].type != "water" && random(0,1) > 0.7){
					//currentTile.neighbors[i].neighbors[j].makeBeach();
				}
			}*/
		}
	}
	createLake(currentTile.neighbors[next], size);
}

var riverCounter = 0;
var maxThickness = 10;
function createRiver(currentTile, thickness){
	riverCounter += 1;
	if(thickness > maxThickness){
		thickness = maxThickness;
	}
	strokeWeight(thickness);
	stroke(28,107,random(170,190));
	if(currentTile.elevation == 0){
		riverCounter = 0;
		noStroke();
		return;
	}
	if( riverCounter > 100){
		createLake(currentTile,300);
		riverCounter = 0;
		return;
	}
	var slope = 10000;
	var nextTile;
	for (var i = 0; i < currentTile.neighbors.length; i++) {
		if(currentTile.neighbors[i].elevation < slope){
			slope = currentTile.neighbors[i].elevation;
			nextTile = currentTile.neighbors[i];
		}
	}
	currentTile.addRiver(nextTile, thickness);
	createRiver(nextTile, thickness+0.1);
}


function createMountain(currentTile, size, grayVal){
	if(currentTile.corner){
		return;
	}
	var queue = [];
	var maxGray = 100;
	var mountainCounter = 0;
	queue.push(currentTile);
	var elevation = 50;
	while(mountainCounter < size){
		var currentTile = queue.shift();
		mountainCounter += 1;
		if(grayVal < maxGray){
			grayVal = maxGray*1.5;
		}
		for(var i = 0; i < currentTile.neighbors.length; i++){
			if(!currentTile.neighbors[i].corner && currentTile.neighbors[i].type != "mountain"){
				currentTile.neighbors[i].makeMountain(elevation,grayVal);
				if(random(0,1) > 0.55){
					queue.push(currentTile.neighbors[i]);
				}
			}
		}
		grayVal = grayVal*random(0.98,1);
		elevation=elevation*random(0.8,1);
	}
}

function elevateArea(currentTile, size, min,max){
	if(currentTile.corner){
		return;
	}
	var queue = [];
	var visited = []
	var counter = 0;
	elevation = 0;
	queue.push(currentTile);
	while (counter < size) {
		counter += 1;
		var currentTile = queue.shift();
		for(var i = 0; i < currentTile.neighbors.length; i++){
			if(!currentTile.neighbors[i].corner){
				currentTile.neighbors[i].elevate(currentTile.neighbors[i].elevation +random(min,max) + elevation);
				if(!visited.includes(currentTile.neighbors[i])){
					visited.push(currentTile.neighbors[i]);
					queue.push(currentTile.neighbors[i]);
				}
			}
		}
		elevation -= 0.05;
	}
}
