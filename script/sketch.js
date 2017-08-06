
var tiles = [];
var clouds = [];

var numberOfTiles = 300;

var canvasWidth;
var canvasHeight;

var drawstep = 0;

var originX;
var originY;

var heightLevel1;
var heightLevel2;
var heightLevel3;
var heightLevel4;
var heightLevel5;



function setup() {
	createCanvas(600, 600);
	canvasWidth = canvas.width/2;
	canvasHeight = canvas.height/2;

	originX = canvasWidth/2;
	originY = canvasHeight/2;

	//HeightLevel is determined by proximity to the origin.
	heightLevel1 = dist(0,0,canvasWidth/2,canvasHeight/2)*0.3;
	heightLevel2 = dist(0,0,canvasWidth/2,canvasHeight/2)*0.5;
	heightLevel3 = dist(0,0,canvasWidth/2,canvasHeight/2)*0.85;
	heightLevel4 = dist(0,0,canvasWidth/2,canvasHeight/2)*0.90;
	heightLevel5 = dist(0,0,canvasWidth/2,canvasHeight/2)*0.98;

	noLoop();
	background(200);
	generateMap();
}

function draw() {

}

function mousePressed(){
	redraw();
}

function generateMap() {
	createTiles();
	colorTiles();
	createDetails();
	createClouds();
	displayTiles();
	displayClouds();
}

function createTiles(){
	createPoints();
	connectPoints();
}

function displayTiles(){
	for (var i = 0; i < tiles.length; i++) {
		for (var j = 0; j < tiles[i].length; j++) {
			if(tiles[i][j].elevation == 0){
				tiles[i][j].draw();
			}
		}
	}
	for (var i = 0; i < tiles.length; i++) {
		for (var j = 0; j < tiles[i].length; j++) {
			if(tiles[i][j].elevation > 0){
				tiles[i][j].draw();
			}
		}
	}
}

function createPoints(){
	noStroke();
	fill(0);
	var rowLength = int((canvasWidth/numberOfTiles)*3);
	var gapSize = canvasWidth/numberOfTiles;


	for(var i = 0; i < numberOfTiles; i++){
		var tileRow = [];
		var extra = 0;
		if(i%2 == 0){
			extra = gapSize/2;
		}
		for(var j = 0; j < numberOfTiles; j++){
			var xpos = i*gapSize
			var ypos = j*gapSize + extra
			if(i == 0 || j == 0 || i == numberOfTiles-1 || j == numberOfTiles-1){
				tileRow.push(new Tile(xpos,ypos,true,gapSize/2+1.5));
			}
			else {
				tileRow.push(new Tile(xpos,ypos,false,gapSize/2+1.5));
			}
		}
		tiles.push(tileRow);
	}
}

function connectPoints() {
	for (var i = 0; i < tiles.length; i++) {
		for (var j = 0; j < tiles[i].length; j++) {
			if(!tiles[i][j].corner){
				tiles[i][j].addNeighbor(tiles[i-1][j]);
				tiles[i][j].addNeighbor(tiles[i-1][j-1]);
				tiles[i][j].addNeighbor(tiles[i][j-1]);
				tiles[i][j].addNeighbor(tiles[i+1][j-1]);
				tiles[i][j].addNeighbor(tiles[i+1][j]);
				tiles[i][j].addNeighbor(tiles[i+1][j+1]);
				tiles[i][j].addNeighbor(tiles[i][j+1]);
				tiles[i][j].addNeighbor(tiles[i-1][j+1]);
			}
		}
	}
}

function colorTiles() {
	createCoast();
	for (var i = 0; i < 80; i++) {
		elevateArea(tiles[int(random(20,numberOfTiles-20))][int(random(20,numberOfTiles-20))],random(100,600), 5,15);
	}

}

function createDetails() {
	for (var i = 0; i < 20; i++) {
		createRiver(tiles[int(random(50,numberOfTiles-50))][int(random(50,numberOfTiles-50))],3);
	}
}

function createClouds() {
	var numberOfClouds = random(5,15);
	for (var i = 0; i < numberOfClouds; i++) {
		clouds.push(new Cloud(random(canvasWidth),random(canvasHeight)));
	}
}

function displayClouds() {
	for (var i = 0; i < clouds.length; i++) {
		clouds[i].draw();
	}
}
