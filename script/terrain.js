
function createCoast(){
	for (var i = 0; i < tiles.length; i++) {
		for (var j = 0; j < tiles[i].length; j++) {
			if(tiles[i][j].corner){
				tiles[i][j].makeWater();
			}
			if(i == 1 || j == 1 || i == numberOfTiles-2 || j == numberOfTiles-2){
				createLake(tiles[i][j], numberOfTiles*3);
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
		}
	}
	createLake(currentTile.neighbors[next], size);
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
		if(queue.length == 0){
			return;
		}
		var currentTile = queue.shift();
		for(var i = 0; i < currentTile.neighbors.length; i++){
			if(!currentTile.neighbors[i].corner){
				currentTile.neighbors[i].elevate(currentTile.neighbors[i].elevation +random(min,max) + elevation);
				if(!visited.includes(currentTile.neighbors[i])){
					visited.push(currentTile.neighbors[i]);
					if(random(1)>0.5){ //fix for sqare elevation.
						queue.push(currentTile.neighbors[i]);
					}
				}
			}
		}
		elevation -= 0.05;
	}
}


function createRiver(currentTile, thickness) {
	var riverCounter = 0;
	var maxThickness = 5;
	var visited = [];
	var running = true;
	var slope;
	var nextTile;
	while (running) {
		visited.push(currentTile);
		riverCounter += 1;
		thickness += 0.1;
		if(thickness > maxThickness){
			thickness = maxThickness;
		}
		strokeWeight(thickness);
		if(currentTile.type == "water" || riverCounter > 300 || currentTile.elevation > heightLevel4){
			running = false;
		}
		else {
			slope = 1000;
			for (var i = 0; i < currentTile.neighbors.length; i++) {
				if(currentTile.neighbors[i].elevation < slope){
					slope = currentTile.neighbors[i].elevation;
					nextTile = currentTile.neighbors[i];
				}
			}
			if(visited.includes(nextTile)){
				nextTile = currentTile.neighbors[int(random(8))]
			}
			currentTile.addRiver(nextTile, thickness);
		}
		currentTile = nextTile;
	}
}
