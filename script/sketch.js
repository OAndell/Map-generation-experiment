
var tiles = [];
var riverStartTiles = [];

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

var treeline = 1;

function setup() {
	createCanvas(600, 600);
	canvasWidth = canvas.width/2;
	canvasHeight = canvas.height/2;

	originX = canvasWidth/2;
	originY = canvasHeight/2;



	background(200);
	noLoop();
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
	displayTiles();
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

	for (var i = 0; i < 20; i++) {
		elevateArea(tiles[int(random(20,numberOfTiles-20))][int(random(20,numberOfTiles-20))],random(100,400), 1,10);
	}

}

function createDetails() {
	for (var i = 0; i < 15; i++) {
		createRiver(tiles[int(random(50,numberOfTiles-50))][int(random(50,numberOfTiles-50))],1.5);
	}
}
