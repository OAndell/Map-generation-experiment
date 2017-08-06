function Cloud(x,y) {
	this.x = x;
	this.y = y;
	this.parts = [];
	var cloudSize = random(10,70);
	for (var i = 0; i < cloudSize; i++) {
		var rotation = random(0.01,0.1) * radians(540);
		var edgeSize = random(0.01,0.05) * 200;
		var grey = (150 + random(0.1,1) * 150);
		var alph = (150 + random(0.01,3) * 150);
		this.x += random(-7,7);
		this.y += random(-2,2);
		this.parts.push(new CloudPart(this.x,this.y,grey,alph,edgeSize,rotation));
	}

	this.draw = function() {
		for (var i = 0; i < this.parts.length; i++) {
			this.parts[i].draw();
		}
	}

}


function CloudPart(x,y,grey,alpha,size, rotation) {
	this.x = x;
	this.y = y;
	this.grey = grey;
	this.alpha = alpha;
	this.size = size;
	this.rotation = rotation;
	this.draw = function() {
		push();
		translate(this.x,this.y);
		rotate(this.rotation);
		noStroke();
		fill(0,150);
		ellipse(8,8,this.size,this.size/2);
		fill(this.grey, this.alph);
		ellipse(0,0,this.size,this.size/2);
		pop();
	}
}
