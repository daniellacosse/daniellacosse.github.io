gaussianCanv = document.getElementById("gaussianCanv");
ctx = gaussianCanv.getContext("2d");
xScale = 0; yScale = 1;

//gets canvas context and sets origin bottom left
function setupCanvas(){

    ctx = gaussianCanv.getContext("2d");

    if (ctx !== null) {

        //sets origin to the bottom middle
        ctx.translate(0, gaussianCanv.height);
        ctx.translate(0.5, 0.5);
        ctx.webkitImageSmoothingEnabled = true;
        ctx.mozImageSmoothingEnabled = true;

    };

}

function updateGaussianCanv() {

  var avgMaxIndex = 0, avgMax = library[0].avgPcnt;

  ctx = gaussianCanv.getContext("2d");

  for( var i = 0; i < library.length; i++){

    if(avgMax < library[i].avgPcnt) {

      avgMax = library[i].avgPcnt;
      avgMaxIndex = i;

    };

  };

  xScale = library[avgMaxIndex].avgPcnt + (library[avgMaxIndex].stdDev * 3);

  if (xScale > 0) document.getElementById("percentMax").innerHTML = Math.floor(xScale) + "%";
  else document.getElementById("percentMax").innerHTML ="";

  //console.log("max Percent: " + xScale);

  if (ctx !== null) {

    ctx.clearRect(0, 0, gaussianCanv.width, -gaussianCanv.height);

    ctx.save();
    ctx.moveTo(0, -gaussianCanv.height);
    ctx.lineTo(0, gaussianCanv.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    for (var i = 0; i < library.length; i++) {

      //console.log("area" + i + " avgPcnt:" + library[i].avgPcnt);
      //console.log("area" + i + " stdDev:" + library[i].stdDev);
      //console.log("area" + i + " fi:" + gaussDist(library[i].avgPcnt, library[i].avgPcnt, library[i].stdDev));

      plotGaussDistOf(library[i], library[i].color);

    };

  }

}

function plotGaussDistOf(obj, color) {

  var gauss;

  ctx.save();
  ctx.beginPath();

  for (var i = 0; i < gaussianCanv.width; i++) {

      gauss = gaussDist(scale(i, gaussianCanv.width, xScale), obj.avgPcnt, obj.stdDev);
  ctx.lineTo(i, -scale(gauss, yScale, gaussianCanv.height));

  };

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();

}
