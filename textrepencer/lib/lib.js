function updateStats(){

  document.getElementById("stats").innerHTML="";

  var arr = [];
  arr.length = 0;

  for (var i = 0; i < library.length; i++) arr.push.apply(arr, library[i].wrdCnt);
  arr.sort(function(x, y){ return y.percent - x.percent; });

  for (var i = 0; i < arr.length; i++){ //displays all the word prevalences in order by percentage

    document.getElementById("stats").innerHTML += ("<span style='color: " + arr[i].color + ";'><strong>" + arr[i].word + "</strong>&emsp;&emsp;&emsp;" + precise_round(arr[i].percent, 2) + "% </span><br />");

  };

}

function countWordsFrom(area, color) {

  var str = removePunct(document.getElementById(area).value),
    arr = createArrayfromString(str),
    arrSt = arr.slice().sort(),
    arrCt = wordCount(arrSt, color);

  arrCt.sort(function(x, y){ return y.count - x.count; });
  return arrCt;

}

function removePunct(str) {

  str = str.replace(/[\n\r\_\u2014]/g, " ");
  str = str.replace(/[0123456789\.\!\?\"\'\`\(\)\[\]\{\}\<\>\,\:\;\-\—\—\+\=\u201C\u201D\u2026]/g, "");
  str = str.toLowerCase();

  return str;

}

function createArrayfromString(str) {

  var arr = str.split(" ");

  for (var i = 0; i < arr.length; i++){

    if (arr[i] === "") arr.splice(i, 1);
    if (arr[i] === " ") arr.splice(i, 1);

  };

  return arr;

}

function wordCount(arr, color) {

    var a = [],
      prev;

    arr.sort();

    for ( var i = 0; i < arr.length; i++ ) {

        if ( arr[i] !== prev && i > 0) {

      a[a.length-1].percent = ((a[a.length-1].count/arr.length) * 100);
            a.push({word: arr[i], count: 1, percent: ((1/arr.length)*100), color: color});

        } else if ( arr[i] !== prev ) {

            a.push({word: arr[i], count: 1, percent: ((1/arr.length)*100), color: color});

        } else {

            a[a.length-1].count++;
            a[a.length-1].percent = ((a[a.length-1].count/arr.length) * 100);

        }

        prev = arr[i];

    }

    return a;

}

function precise_round( num, decimals ){

   return Math.round(num*Math.pow(10,decimals))/Math.pow(10,decimals);

 }

function scale( val, scaleFrom, scaleTo ) { return ((val/scaleFrom) * scaleTo); }

function avg(arr) {

    var sum = 0;

    for(var i = 0; i < arr.length; i++){
        sum += arr[i];
    }

    sum /= arr.length;
    return sum;

  }

function avgPercent(arr) {

  var sum = 0;

  for(var i = 0; i < arr.length; i++){
      sum += arr[i].percent;
  }

  sum /= arr.length;
  return sum;

}

function stdDev(arr) {

  var average = avgPercent(arr),
    sum = 0;

  for (var i = 0; i < arr.length; i++){

      sum += Math.pow(arr[i].percent - average, 2);

  };

  sum /= arr.length;
  return Math.sqrt(sum);

}


function gaussDist(x, avg, stdDev){

  return ( Math.exp( -Math.pow( x - avg , 2 ) / ( 2 * Math.pow( stdDev, 2 ) ) ) / (stdDev * Math.sqrt( 2 * Math.PI )) );

}

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
