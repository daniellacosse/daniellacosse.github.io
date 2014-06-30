$( function () {

    //startup behavior
    $( ".temptip" ).hide();
    $( ".pcnttip" ).hide();
    $( ".wvetip_upr" ).hide();
    $( ".wvetip_lwr" ).hide();

    $( "#wveLngthSlider" ).hide();

    $( "#tutorial-button" ).on( "click", function() { $("#tutorial-lightbox").fadeOut( 150 ); });
    $( ".zoom-button").on( "click", function() { $("#zoom-lightbox").fadeToggle(300); });
    $( "footer" ).on( "click", function() { window.location = "http://da.niellacos.se"; });

    setTimeout( //startup animation
        function(){
            $("#wveLngthSlider").show(); 
            $("#tempSlider").slider("value", 3.5);
        }, 1000);

    var tempSliding = false, tempHover = false, wveLngthHover = false, wveLngthSliding = false;

    // tempSlider slide and hover behaviors
    $( "#tempSlider" ).slider({

        orientation: "vertical",
        range: "min",
        animate: "fast",
        min: 0,
        max: 7,
        step: 0.01,
        stop: function (event, ui) { 
            tempSliding = false; 
            $(".wvetip_upr").stop(true).fadeOut("fast"); 
            if (!tempHover) $(".temptip").stop(true).fadeOut("fast");

        },
        slide: function (event, ui) {          
            
            tempSliding = true;
            $(".wvetip_upr").fadeIn("fast");

            calculate_calRadArray(); // calculates all the y-values and puts them in an array
            calRadMax(ui.value); //     determines maximum wavelength and sets wveLngthSlider to it
            refreshSpectraGraph(); //   plots calRadArray[]

        }, change: function (event, ui) {
            
            calculate_calRadArray();
            calRadMax(ui.value);
            refreshSpectraGraph(); 
        }
    });

    $("#tempSlider.ui-slider .ui-slider-handle").hover(

        function(){ $(".temptip").stop(true).fadeIn("fast"); tempHover = true;},
        function(){ if (!tempSliding) $(".temptip").stop(true).fadeOut("fast"); tempHover = false;}
    );

    //wveLngthSlider slide and hover behaviors
    $( "#wveLngthSlider" ).slider({

        orientation: "vertical",
        range: true, 
        animate: "fast",
        min: -8, // there's no way to flip a slider range, so we're inverting the number
        max: 2, //  line here and un-inverting it when it's used to do math
        step: 0.01,
        stop: function (event, ui) { 
            wveLngthSliding = false; 

            if (!wveLngthHover){

                $(".pcnttip").fadeOut("fast");
                $(".wvetip_upr").fadeOut("fast");
                $(".wvetip_lwr").fadeOut("fast");
            };   

        }, slide: function (event, ui) {
            wveLngthSliding = true;

            refreshZoomGraph();
            refreshSpectraGraph();
            if (wveLngths[0] != wveLngths[1]) {
                $(".pcnttip").fadeIn("fast");
                $(".wvetip_lwr").fadeIn("fast");
            };

        }, change: function(event, ui){

            refreshZoomGraph();
            refreshSpectraGraph(); 
        }
    });

    $("#wveLngthSlider.ui-slider .ui-slider-handle").hover(

        function (){
            wveLngthHover = true;
            var wveLngths = $("#wveLngthSlider").slider("values");

            $(".wvetip_upr").fadeIn("fast");
            if (wveLngths[0] != wveLngths[1]) {
                $(".pcnttip").fadeIn("fast");
                $(".wvetip_lwr").fadeIn("fast");
            };

        }, function (){
            wveLngthHover = false;

            if (!wveLngthSliding) {

                $(".pcnttip").fadeOut("fast");
                $(".wvetip_upr").fadeOut("fast");
                $(".wvetip_lwr").fadeOut("fast");

            };
        });

    setupSpectraGraph(); //get that canvas(s) ready, boys
    setupZoomGraph();
});