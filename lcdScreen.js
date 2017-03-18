var c = document.getElementById("canvas1");
var ctx = c.getContext("2d");
var w = c.width;  // canvas width
var h = c.height; // canvas height
var logTxt = document.getElementById("logTxt");
var logStr = "";

// Make a try/catch log using <p>.

try {
  // project js

var colorScheme = [
  "#FF7700", "#110500",
  "#FFFFFF", "#000000",
  "#DDDDDD", "#222222"
];

// top left coord of lcd
logStr = logStr + "Assigning vars... ";
logTxt.innerHTML = logStr;

var lcdx = 10; // topleft coord
var lcdy = 10; // topleft coord
var lcdnsw = 140; // n squares wide
var lcdnsh = 80;  // n squares tall
var lcdsSize = 6; // square size
var lcdSpacing = 1; // square spacing
var lcdw = lcdnsw*lcdsSize; // lcd panel width in px
var lcdh = lcdnsh*lcdsSize; // lcd panel height in px

var lcdMatrix = [0];
for( i=0; i<lcdnsh; i++ ) {
  lcdMatrix[i] = [0];
  for( j=0; j<lcdnsw; j++ ) {
    lcdMatrix[i][j] = 1;
  }
};
logStr = logStr + "done.<br />";
logTxt.innerHTML = logStr;

function setPattern() {
  // diagonal lines sweeping to right
  var t = ( Date.now() );
  var delay = 50; // ms
  for( i=0; i<lcdnsh; i++ ) {
    for( j=0; j<lcdnsw; j++ ) {
      if( (t+((i+j)*delay))%1000 < delay ) { lcdMatrix[i][j] = 1 }
      else { lcdMatrix[i][j] = 0 };
    }
  }
  draw();
  window.requestAnimationFrame(setPattern);
}

function draw() {
  ctx.clearRect(1,1,w-2,h-2);

  // draw thw lcd squares
  ctx.fillStyle = colorScheme[1];
  ctx.fillRect( lcdx, lcdy, lcdnsw*(lcdsSize+lcdSpacing)+lcdSpacing, lcdnsh*(lcdsSize+lcdSpacing)+lcdSpacing ); // background/spacing

  // draw the squares
  for( i=0; i<lcdnsh; i++ ) {
    for( j=0; j<lcdnsw; j++ ) {
      // set the color
      if( lcdMatrix[i][j] == 1 ) {
        ctx.fillStyle = colorScheme[0];
      } else {
        ctx.fillStyle = colorScheme[1];
      }
      ctx.fillRect( lcdx+(j*lcdsSize)+((j+1)*lcdSpacing), lcdy+(i*lcdsSize)+((i+1)*lcdSpacing), lcdsSize, lcdsSize );
    }
  }
}

ctx.fillStyle = "#222222";
ctx.fillRect(0,0,w,h);

logStr = logStr + "Drawing...";
logTxt.innerHTML = logStr;
setPattern();
//draw();
logStr = logStr + "done.<br />";
logTxt.innerHTML = logStr;

}
catch (ex) {
  // set the p with error info
  logStr = logStr + ex + "<br />";
  logTxt.innerHTML = logStr;
}