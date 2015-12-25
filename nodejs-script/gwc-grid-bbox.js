console.log('[GWC-GRID] Nodejs script to calculate the grid bbox of WMS-C service in Geoserver');
console.log('');
console.log('[GWC-GRID] Parameters [xmin,ymin,xmax,ymax,tileSize,relationMetersPixel,withBuffer]');
console.log('[GWC-GRID] xmin -> X minimum coordinate in the initial bbox (mandatory)');
console.log('[GWC-GRID] ymin -> Y minimum coordinate in the initial bbox (mandatory)');
console.log('[GWC-GRID] xmax -> X maximum coordinate in the initial bbox (mandatory)');
console.log('[GWC-GRID] ymin -> Y maximum coordinate in the initial bbox (mandatory)');
console.log('[GWC-GRID] tileSize -> Grid tile size in pixels (mandatory)');
console.log('[GWC-GRID] relationMetersPixel -> Relation pixel/meters in the high level of the grid (mandatory)');
console.log('[GWC-GRID] withBuffer -> Calculate the grid with a one tile buffer (optional)');
console.log('');
console.log('[GWC-GRID] Starting ...');
console.log('');

var params = process.argv;
//if(!params || params.length < 6)
//	console.log('[GWC-GRID] Error getting the arguments. Check the program parameters [xmin,ymin,xmax,ymax,tileSize,relationMetersPixel,withBuffer]')}
//	return;
var xmin = parseFloat(params[2]);
var ymin = parseFloat(params[3]);
var xmax = parseFloat(params[4]);
var ymax = parseFloat(params[5]);
var tileSize = parseInt(params[6]);
var metersPixel = parseFloat(params[7]);
var buffer = params[8] || false;
var metersTile = tileSize * metersPixel;
var baseXmin = xmin;
var baseYmin = ymin;
var baseXmax = xmax;
var baseYmax = ymax;

if(buffer){
	baseXmin = xmin - metersTile;
	baseYmin = ymin - metersTile;
	baseXmax = xmax + metersTile;
	baseYmax = ymax + metersTile;
}
var endX = baseXmin;
var xCount = 0;
do {
	endX += metersTile;
	xCount++;
} while (endX < baseXmax);

var endY = baseYmin;
var yCount = 0;
do {
	endY += metersTile;
	yCount++;
} while (endY < baseYmax);
console.log('[GWC-GRID] Grid: '+xCount+'x'+yCount+' tiles');
var bbox = [baseXmin,baseYmin,endX,endY];
console.log('[GWC-GRID] Grid boundary box: '+bbox[0]+','+bbox[1]+','+bbox[2]+','+bbox[3]);
console.log('');
console.log('[GWC-GRID] Done ;)');