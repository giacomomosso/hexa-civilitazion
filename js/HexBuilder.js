function buildHexRadius(radius)
{
	var width = radius*2;
	var height = width*0.8660254;
	var a = -3.0;
	var b = (-2.0 * width);
	var c = (Math.pow(width, 2)) + (Math.pow(height, 2));
	var z = (-b - Math.sqrt(Math.pow(b,2)-(4.0*a*c)))/(2.0*a);
	
	/* not actual use
	var x = (width - z)/2.0;
	var y = height/2.0;
	*/ 
	HT.Hexagon.Static.WIDTH = width;
	HT.Hexagon.Static.HEIGHT = height;
	HT.Hexagon.Static.SIDE = z;
}

function drawHexGrid(rows,columns)
{
	var grid = new HT.Grid(window.innerWidth, window.innerHeight);
	var canvas = document.getElementById("hexCanvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	for(var h in grid.Hexes)
	{
		grid.Hexes[h].draw(ctx);
	}
}

function buildHexGrid(radius,rows,columns)
{
	buildHexRadius(radius);
	drawHexGrid(rows,columns);
}
