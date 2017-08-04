function Tile(x,y,corner,radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.neighbors = [];
	this.vertices = []
	this.corner = corner;

	//rivers
	this.hasRiver = false;
	this.riverSize;
	this.riverDir;

	//higher when closer to center +- some random value
	this.elevation = dist(0,0,originX,originY) - dist(x,y,originX,originY) + random(-2,2);

	this.type = "forest";
	this.color = calcColor(this.elevation);
	this.draw = function() {
			fill(this.color);
			beginShape();
			var angle = TWO_PI/6;
			var a = 0;
			for(var i = 0; i < 8; i++){
				vertex(x+ cos(a) * radius, y + sin(a) * radius);
				a += angle;
				vertex(x + cos(a) * radius, y +  sin(a) * radius);
				a += angle;
			}
			endShape(CLOSE);
			if(this.type != "water"){
				this.smooth();
			}
			if(this.hasRiver){
				strokeWeight(this.riverSize);
				stroke(28,107,random(170,190));
				line(x,y,this.riverDir.x,this.riverDir.y);
				noStroke();
			}
	}

	this.addNeighbor = function(nTile) {
		this.neighbors.push(nTile);
	}

	this.smooth = function(){
		var slope = 10000;
		var stepestTile;
		for (var i = 0; i < this.neighbors.length; i++) {
			if(this.neighbors[i].elevation < slope){
				slope = this.neighbors[i].elevation;
				stepestTile = this.neighbors[i];
			}
		}
		strokeWeight(slope*0.005);
		stroke(red(this.color),green(this.color),blue(this.color),10+slope);
		line(stepestTile.x, stepestTile.y, x, y);
	}

	this.makeWater = function(){
		this.elevation = 0;
		this.color = color(28,107,random(170,190));
		this.type = "water";
		this.complete = true;
		this.radius += 1;
	}

	this.makeBeach = function(){
		this.color = color(random(200,249),random(200,225),random(130,145));
		this.type = "beach";
	}

	this.makeMountain = function(elevation, grayVal){
		if(this.type == "forest"){
			this.elevation += elevation;
			this.color = color(grayVal);
			this.type = "mountain";
		}
	}

	this.elevate = function(elevation){
		if(this.type != "water"){
			this.elevation = elevation;
			this.color = calcColor(elevation);
		}
	}

	this.addRiver = function(dirTile, size){
		this.hasRiver = true;
		this.riverDir = dirTile;
		this.riverSize = size;
	}


}

function calcColor(elevation){
	if(elevation < (dist(0,0,canvasWidth/2,canvasHeight/2)*0.3 + random(-130,50))){
		return color(random(200,249),random(200,225),random(130,145));//beach
	}
	else if(elevation < (dist(0,0,canvasWidth/2,canvasHeight/2)*0.75 + random(-50,50))){
		return color(random(25,38),random(100,150),random(25,38));//forrest green
	}
	else if(elevation < (dist(0,0,canvasWidth/2,canvasHeight/2)*0.95 + random(-50,50))){
		return color(0,random(90,120),random(45,51));
	}
	else if(elevation < (dist(0,0,canvasWidth/2,canvasHeight/2)*0.98 + random(-20,20))){
		return color(random(70,110));
	}
	else if(elevation < (dist(0,0,canvasWidth/2,canvasHeight/2)*0.99 + random(-20,0))){
		return color(random(80,170));
	}
	else {
		return color(random(200,250));
	}
}
