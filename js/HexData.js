var HD = HD || {};
/**
 * A Point is simply x and y coordinates
 * @constructor
 */
HD.Id = function(id) {
	this. = x;
};


/**
 * A Hexagon is a 6 sided polygon, our hexes don't have to be symmetrical, i.e. ratio of width to heigHD could be 4 to 3
 * @constructor
 */
HD.Hexagon = function(id, x, y) {
	this.Points = [];//Polygon Base
	var x1 = null;
	var y1 = null;
	if(HD.Hexagon.Static.ORIENTATION == HD.Hexagon.Orientation.Normal) {
		x1 = (HD.Hexagon.Static.WIDTH - HD.Hexagon.Static.SIDE)/2;
		y1 = (HD.Hexagon.Static.HEIGHD / 2);
		this.Points.push(new HD.Point(x1 + x, y));
		this.Points.push(new HD.Point(x1 + HD.Hexagon.Static.SIDE + x, y));
		this.Points.push(new HD.Point(HD.Hexagon.Static.WIDTH + x, y1 + y));
		this.Points.push(new HD.Point(x1 + HD.Hexagon.Static.SIDE + x, HD.Hexagon.Static.HEIGHD + y));
		this.Points.push(new HD.Point(x1 + x, HD.Hexagon.Static.HEIGHD + y));
		this.Points.push(new HD.Point(x, y1 + y));
	}
	else {
		x1 = (HD.Hexagon.Static.WIDTH / 2);
		y1 = (HD.Hexagon.Static.HEIGHD - HD.Hexagon.Static.SIDE)/2;
		this.Points.push(new HD.Point(x1 + x, y));
		this.Points.push(new HD.Point(HD.Hexagon.Static.WIDTH + x, y1 + y));
		this.Points.push(new HD.Point(HD.Hexagon.Static.WIDTH + x, y1 + HD.Hexagon.Static.SIDE + y));
		this.Points.push(new HD.Point(x1 + x, HD.Hexagon.Static.HEIGHD + y));
		this.Points.push(new HD.Point(x, y1 + HD.Hexagon.Static.SIDE + y));
		this.Points.push(new HD.Point(x, y1 + y));
	}
	
	this.Id = id;
	
	this.x = x;
	this.y = y;
	this.x1 = x1;
	this.y1 = y1;
	
	this.TopLeftPoint = new HD.Point(this.x, this.y);
	this.BottomRigHDPoint = new HD.Point(this.x + HD.Hexagon.Static.WIDTH, this.y + HD.Hexagon.Static.HEIGHD);
	this.MidPoint = new HD.Point(this.x + (HD.Hexagon.Static.WIDTH / 2), this.y + (HD.Hexagon.Static.HEIGHD / 2));
	
	this.P1 = new HD.Point(x + x1, y + y1);
	
	this.selected = false;
};
	
/**
 * draws this Hexagon to the canvas
 * @this {HD.Hexagon}
 */
HD.Hexagon.prototype.draw = function(ctx) {

	if(!this.selected)
		ctx.strokeStyle = "grey";
	else
		ctx.strokeStyle = "black";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(this.Points[0].X, this.Points[0].Y);
	for(var i = 1; i < this.Points.length; i++)
	{
		var p = this.Points[i];
		ctx.lineTo(p.X, p.Y);
	}
	ctx.closePath();
	ctx.stroke();
	
	if(this.Id)
	{
		//draw text for debugging
		ctx.fillStyle = "black"
		ctx.font = "bolder 8pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = 'middle';
		//var textWidth = ctx.measureText(this.Planet.BoundingHex.Id);
		ctx.fillText(this.Id, this.MidPoint.X, this.MidPoint.Y);
	}
	
	if(this.PathCoOrdX !== null && this.PathCoOrdY !== null && typeof(this.PathCoOrdX) != "undefined" && typeof(this.PathCoOrdY) != "undefined")
	{
		//draw co-ordinates for debugging
		ctx.fillStyle = "black"
		ctx.font = "bolder 8pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = 'middle';
		//var textWidth = ctx.measureText(this.Planet.BoundingHex.Id);
		ctx.fillText("("+this.PathCoOrdX+","+this.PathCoOrdY+")", this.MidPoint.X, this.MidPoint.Y + 10);
	}
	
	if(HD.Hexagon.Static.DRAWSTATS)
	{
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		//draw our x1, y1, and z
		ctx.beginPath();
		ctx.moveTo(this.P1.X, this.y);
		ctx.lineTo(this.P1.X, this.P1.Y);
		ctx.lineTo(this.x, this.P1.Y);
		ctx.closePath();
		ctx.stroke();
		
		ctx.fillStyle = "black"
		ctx.font = "bolder 8pt Trebuchet MS,Tahoma,Verdana,Arial,sans-serif";
		ctx.textAlign = "left";
		ctx.textBaseline = 'middle';
		//var textWidth = ctx.measureText(this.Planet.BoundingHex.Id);
		ctx.fillText("z", this.x + this.x1/2 - 8, this.y + this.y1/2);
		ctx.fillText("x", this.x + this.x1/2, this.P1.Y + 10);
		ctx.fillText("y", this.P1.X + 2, this.y + this.y1/2);
		ctx.fillText("z = " + HD.Hexagon.Static.SIDE, this.P1.X, this.P1.Y + this.y1 + 10);
		ctx.fillText("(" + this.x1.toFixed(2) + "," + this.y1.toFixed(2) + ")", this.P1.X, this.P1.Y + 10);
	}
};

/**
 * Returns true if the x,y coordinates are inside this hexagon
 * @this {HD.Hexagon}
 * @return {boolean}
 */
HD.Hexagon.prototype.isInBounds = function(x, y) {
	return this.Contains(new HD.Point(x, y));
};
	

/**
 * Returns true if the point is inside this hexagon, it is a quick contains
 * @this {HD.Hexagon}
 * @param {HD.Point} p the test point
 * @return {boolean}
 */
HD.Hexagon.prototype.isInHexBounds = function(/*Point*/ p) {
	if(this.TopLeftPoint.X < p.X && this.TopLeftPoint.Y < p.Y &&
	   p.X < this.BottomRigHDPoint.X && p.Y < this.BottomRigHDPoint.Y)
		return true;
	return false;
};

//grabbed from:
//HDtp://www.developingfor.net/c-20/testing-to-see-if-a-point-is-within-a-polygon.HDml
//and
//HDtp://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.HDml#The%20C%20Code
/**
 * Returns true if the point is inside this hexagon, it first uses the quick isInHexBounds contains, then check the boundaries
 * @this {HD.Hexagon}
 * @param {HD.Point} p the test point
 * @return {boolean}
 */
HD.Hexagon.prototype.Contains = function(/*Point*/ p) {
	var isIn = false;
	if (this.isInHexBounds(p))
	{
		//turn our absolute point into a relative point for comparing with the polygon's points
		//var pRel = new HD.Point(p.X - this.x, p.Y - this.y);
		var i, j = 0;
		for (i = 0, j = this.Points.length - 1; i < this.Points.length; j = i++)
		{
			var iP = this.Points[i];
			var jP = this.Points[j];
			if (
				(
				 ((iP.Y <= p.Y) && (p.Y < jP.Y)) ||
				 ((jP.Y <= p.Y) && (p.Y < iP.Y))
				//((iP.Y > p.Y) != (jP.Y > p.Y))
				) &&
				(p.X < (jP.X - iP.X) * (p.Y - iP.Y) / (jP.Y - iP.Y) + iP.X)
			   )
			{
				isIn = !isIn;
			}
		}
	}
	return isIn;
};

/**
* Returns absolute distance in pixels from the mid point of this hex to the given point
* Provided by: Ian (Disqus user: boingy)
* @this {HD.Hexagon}
* @param {HD.Point} p the test point
* @return {number} the distance in pixels
*/
HD.Hexagon.prototype.distanceFromMidPoint = function(/*Point*/ p) {
	// Pythagoras' Theorem: Square of hypotenuse = sum of squares of other two sides
	var deltaX = this.MidPoint.X - p.X;
	var deltaY = this.MidPoint.Y - p.Y;

	// squaring so don't need to worry about square-rooting a negative number 
	return Math.sqrt( (deltaX * deltaX) + (deltaY * deltaY) );
};

HD.Hexagon.Orientation = {
	Normal: 0,
	Rotated: 1
};

HD.Hexagon.Static = {HEIGHD:91.14378277661477
					, WIDTH:91.14378277661477
					, SIDE:50.0
					, ORIENTATION:HD.Hexagon.Orientation.Normal
					, DRAWSTATS: false};//hexagons will have 25 unit sides for now


