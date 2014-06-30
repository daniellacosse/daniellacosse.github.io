// NOTE: ALL CALCULATORY FUNCTIONS OPERATE IN LOG BASE 10
//
// RATIONALE: in order for all values to be displayed elegantly
// in spectraGraph, logarithmic scales must be utilized

// important universal constants
var planck = 6.62606957e-16, // kg * nm^2 * s^-1
    boltzmann = 1.3806488e-5, // kg * nm^2 * s^-2 * K^-1
    spdOfLight = 299792458e9, // nm/s

    calRadArray = new Array(), radMax,

// public vars for canvas
    spectraGraph = document.getElementById("spectraGraph"),
    ctx = spectraGraph.getContext("2d"),
    spectraGradient = ctx.createLinearGradient(0, 0, spectraGraph.width, 0),

    zoomGraph = document.getElementById("zoomGraph"),
    ctx_z = zoomGraph.getContext("2d"),
    zoomGradient = ctx_z.createLinearGradient(0, 0, zoomGraph.width, 0),

// min and max of the spectraGraph axes (logarithmic, base 10)
	positiveX = 8.5,   
	negativeX = -2,    //      if you change these you'll have to manually 
	positiveY = 17.5,    //    change the min and max on wvelngthslider in jqsaif.js    
	negativeY = -17;
// also bear in mind that the graph is rotated 90 degrees, 
// so what appears to be on the x axis is actually on the y axis.

// logarithmic conversion functions
function log10( val ) { return Math.log(val) / Math.LN10; } //	(returns the log base 10 of the value)
function tenTo( val ) { return Math.pow(10, val); } //			(un-logarizes)

// takes a graph value and returns the appropriate pixel value
function convToPixels_X( val ){ return ( ( val - negativeX ) / ( positiveX - negativeX )) * spectraGraph.width; }
function convToPixels_Y( val ){ return ( spectraGraph.height - (( val - negativeY ) / ( positiveY - negativeY )) * spectraGraph.height); }

// takes a pixel value and returns the appropriate graph value
function convToGraph_X( pixl ){ return ( pixl / spectraGraph.width ) * ( positiveX - negativeX ) + negativeX; }
// function convToGraph_Y( pixl ){ return ( pixl / spectraGraph.height ) * ( positiveY - negativeY ) + negativeY; }

// calRad calculates spectral radiance from temp in (K) and wl in (nm) (in log base 10)
function calRad( Temp, WveLngth ) {

	Temp = tenTo(Temp);
	WveLngth = tenTo(WveLngth);

    var constantFactor = 2 * planck * Math.pow(spdOfLight, 2), 
        result = (constantFactor / Math.pow(WveLngth, 5)) * 1/(Math.exp((planck * spdOfLight)/(WveLngth * boltzmann * Temp))-1)/1000;

    return log10(result);
}

function calculate_calRadArray() {

    Temp = $("#tempSlider").slider("value");
    for (var i = 0; i < spectraGraph.width + 1; i++) calRadArray[i] = calRad( Temp, convToGraph_X(i) );
}

function pcntSelectedWveLngth ( WveLngthUpr, WveLngthLwr ) {

    var sumOfArray = 0, partialSum = 0, result;

    for (var i = 0; i < calRadArray.length; i++) {

        sumOfArray += tenTo(calRadArray[i]);
        if ((convToPixels_X(WveLngthLwr) < i) && (i < convToPixels_X(WveLngthUpr))) {
            partialSum += tenTo(calRadArray[i]);
        };
    };

    result = Math.round(partialSum / sumOfArray * 100);
    if (result == 100) return "~99"; else return result;
}

//uses Wien's Approximation law to figure out and set peak wavelength
function calRadMax( Temp ) {
    
    Temp = tenTo(Temp); 
    radMax = log10(2.898e6 / Temp);

    $("#wveLngthSlider").slider("values", [-radMax, -radMax]);
}

function setupSpectraGraph(){

    ctx = spectraGraph.getContext("2d");

    if (ctx !== null) {
 
        ctx.translate(0.5, 0.5);
        ctx.webkitImageSmoothingEnabled = true;
        ctx.mozImageSmoothingEnabled = true;
    };

    spectraGradient.addColorStop(0, "gray");
    spectraGradient.addColorStop((log10(400) - negativeX) / (positiveX - negativeX), "gray"); //    interior operation converts wv 
    spectraGradient.addColorStop((log10(401) - negativeX) / (positiveX - negativeX), "purple"); //  to a percentage of the 
    spectraGradient.addColorStop((log10(470) - negativeX) / (positiveX - negativeX), "blue"); //    graph scale length (value between 0 and 1)
    spectraGradient.addColorStop((log10(490) - negativeX) / (positiveX - negativeX), "cyan");
    spectraGradient.addColorStop((log10(510) - negativeX) / (positiveX - negativeX), "green");
    spectraGradient.addColorStop((log10(570) - negativeX) / (positiveX - negativeX), "yellow");
    spectraGradient.addColorStop((log10(590) - negativeX) / (positiveX - negativeX), "orange");
    spectraGradient.addColorStop((log10(650) - negativeX) / (positiveX - negativeX), "red");
    spectraGradient.addColorStop((log10(700) - negativeX) / (positiveX - negativeX), "gray");
    spectraGradient.addColorStop(1, "gray");
}

function refreshSpectraGraph(){ //plots out the spec rad curve based on the present temperature value

    Temp = $("#tempSlider").slider("value");
    wveLngths = $("#wveLngthSlider").slider("values");

    wveLngths[0] *= -1; wveLngths[1] *= -1;

    ctx = spectraGraph.getContext("2d");
    var top = wveLngths[0]/10 * 382, offset = 60,
        bottom = wveLngths[1]/10 * 382;
    
    if (ctx !== null) {

        //save and clear canvas state to avoid overdrawing
        ctx.save();
        ctx.clearRect(0, 0, spectraGraph.width, spectraGraph.height);

        //begins path
        ctx.beginPath();
        ctx.lineTo(0, spectraGraph.height);

        //for each column of pixels, converts from pixels to mathematic scale and plots result of 
        //calRad();
        for (var i = 0; i < spectraGraph.width + 1; i++) ctx.lineTo(i, convToPixels_Y(calRadArray[i]));

        //closes path and converts to clipping mask
        ctx.lineTo(spectraGraph.width, spectraGraph.height);
        ctx.closePath();
        ctx.clip();

        //fills in clipping mask with gradient created in graphSetup()
        ctx.fillStyle = spectraGradient;
        ctx.fillRect(0, 0, spectraGraph.width, spectraGraph.height);

        ctx.restore(); ctx.save(); //reset state

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#FFFFFF";
        ctx.beginPath(); //starting anti-aliasing path

        ctx.lineTo(0, spectraGraph.height);
        for (var i = 0; i < spectraGraph.width + 1; i++) ctx.lineTo(i, convToPixels_Y(calRadArray[i]));
        ctx.lineTo(spectraGraph.width, spectraGraph.height);
        ctx.stroke(); //create and stroke anti-aliasing path

        ctx.restore(); ctx.save(); //reset state

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#000000";
        ctx.beginPath(); //start baseline

        ctx.moveTo(0, spectraGraph.height - 1);
        ctx.lineTo(spectraGraph.width, spectraGraph.height - 1);
        ctx.stroke();

        ctx.restore();

        if (wveLngths[0] === wveLngths[1]) { // if the range isn't being utilized, only use one of the sliders for calculation

            if (wveLngths[1] == radMax.toFixed(2)) $(".wvetip_upr").css("top", bottom + offset - 15).text(+tenTo(wveLngths[1]).toFixed(2) + " nm (max)");
            wveLngthPlot(wveLngths[0]);

        } else { //if both are being utilized, use both

            $(".wvetip_upr").css("top", bottom + offset - 15).text(+tenTo(wveLngths[1]).toFixed(2) + " nm");
            $(".wvetip_lwr").css("top", top + offset + 15).text(+tenTo(wveLngths[0]).toFixed(2) + " nm");

            wveLngthPlot(wveLngths[0]);
            wveLngthPlot(wveLngths[1]);

            ctx.save();
            ctx.globalAlpha = 0.3;

            ctx.lineWidth = 0;
            ctx.fillStyle = '#FFFFFF';

            ctx.fillRect(convToPixels_X(wveLngths[0]), 0, convToPixels_X(wveLngths[1]) - convToPixels_X(wveLngths[0]),spectraGraph.height);
                
            ctx.restore();
        };
    }; // if statement ends

    $(".temptip")
        .css("bottom", Temp / 7 * 355 + 30) //change this if you change the slider value range/height
        .text(Math.round(tenTo(Temp)) + " K");

    $(".pcnttip")
        .css("top", (bottom + ((top - bottom) / 2)) + offset)
        .text(pcntSelectedWveLngth(wveLngths[0], wveLngths[1]) + "%");
}

function wveLngthPlot( val ) {

    val = convToPixels_X( val );

    ctx.save();
    ctx.beginPath();

    ctx.moveTo( val, 0 ); //moves to the slider location
    ctx.lineTo( val, spectraGraph.height ); //draws line to the top of the graph (no need to calculate calRad again)

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ffffff';

    ctx.stroke();
    ctx.restore();
}

function setupZoomGraph(){

    ctx_z = spectraGraph.getContext("2d");

    if (ctx !== null) {
        ctx_z.translate(0.5, 0.5);
        ctx_z.webkitImageSmoothingEnabled = true;
        ctx_z.mozImageSmoothingEnabled = true;
    };

}

function refreshZoomGraph(){ //plots out the spec rad curve based on the present temperature value

    var Temp = $("#tempSlider").slider("value"),
    wveLngths = $("#wveLngthSlider").slider("values"),
    selectedIndicies = [], indexScalingFactor, currentValue, maxSelectedValue = 0;

    wveLngths[0] *= -1; wveLngths[1] *= -1; ctx_z = zoomGraph.getContext("2d");

    //zoom-button check
    if ((wveLngths[0] !== wveLngths[1]) && (document.getElementById("pcnttip").innerHTML !== "~99%")) $(".zoom-button").show();
    else $(".zoom-button").hide();

    //gotta determine maximum on y axis
    for (var i = 0; i < calRadArray.length; i++) {
        if ((convToPixels_X(wveLngths[1]) < i) && (i < convToPixels_X(wveLngths[0]))) {

            currentValue = tenTo(calRadArray[i]);

            selectedIndicies.push(currentValue);
            if (currentValue > maxSelectedValue) maxSelectedValue = currentValue;
        };
    };

    indexScalingFactor = zoomGraph.width / (selectedIndicies.length - 1);
    if (maxSelectedValue.toFixed(2) == 0.00 ) document.getElementById("zoomtip").innerHTML = "< " + maxSelectedValue.toFixed(2) + "<br />kW sr<sup> -1</sup> nm<sup> -3</sup>";
    else document.getElementById("zoomtip").innerHTML = maxSelectedValue.toFixed(2) + "<br />kW sr<sup> -1</sup> nm<sup> -3</sup>";

    if (ctx_z !== null) {

        //save and clear canvas state to avoid overdrawing
        ctx_z.save();
        ctx_z.clearRect( 0, 0, zoomGraph.width, zoomGraph.height );

        //begins path 
        ctx_z.beginPath();
        ctx_z.lineTo(0, zoomGraph.height);

        //for each column of pixels, converts from pixels to mathematic scale and plots result of 
        //calRad();
        for (var i = 0; i < selectedIndicies.length; i++) ctx_z.lineTo( i * indexScalingFactor, zoomGraph.height - (selectedIndicies[i] / maxSelectedValue * zoomGraph.height));

        ctx_z.lineTo(zoomGraph.width, zoomGraph.height);
        ctx_z.closePath();
        // ctx_z.clip();

        ctx_z.stroke();

        // ctx_z.fillStyle = "#FFFFFF";
        // ctx_z.fillRect(0, 0, zoomGraph.width, zoomGraph.height);

        ctx.restore();
    }; // if statement ends
}

// function zoomGrad(WveLngthLwr, WveLngthUpr) {

//     WveLngthLwr = tenTo(WveLngthLwr);
//     WveLngthUpr = tenTo(WveLngthUpr);
//     wlScale = WveLngthUpr - WveLngthLwr;

//     zoomGradient = ctx_z.createLinearGradient(0, 0, zoomGraph.width, 0);
//     zoomGradient.addColorStop(0, "gray");

//     if (WveLngthLwr < 400 && 400 < WveLngthUpr) zoomGradient.addColorStop((400 / wlScale), "gray");
//     if (WveLngthLwr < 401 && 401 < WveLngthUpr) zoomGradient.addColorStop((401 / wlScale), "purple");
//     if (WveLngthLwr < 470 && 470 < WveLngthUpr) zoomGradient.addColorStop((470 / wlScale), "blue");
//     if (WveLngthLwr < 490 && 490 < WveLngthUpr) zoomGradient.addColorStop((490 / wlScale), "cyan");
//     if (WveLngthLwr < 510 && 510 < WveLngthUpr) zoomGradient.addColorStop((510 / wlScale), "green");
//     if (WveLngthLwr < 570 && 570 < WveLngthUpr) zoomGradient.addColorStop((570 / wlScale), "yellow");
//     if (WveLngthLwr < 590 && 590 < WveLngthUpr) zoomGradient.addColorStop((590 / wlScale), "orange");
//     if (WveLngthLwr < 650 && 650 < WveLngthUpr) zoomGradient.addColorStop((650 / wlScale), "red");
//     if (WveLngthLwr < 700 && 700 < WveLngthUpr) zoomGradient.addColorStop((700 / wlScale), "gray");

//     if (WveLngthUpr > 701) zoomGradient.addColorStop(1, "gray");

// }