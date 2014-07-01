///\\\///\\\ GLOBALS ///\\\///\\\

LIBRARY = new Library();

///\\\///\\\ INITIALIZE ///\\\///\\\

$(document).ready(function(){

  setupCanvas();

  $(".textarea").on("input propertychange", function(event) {
    var id = $(event.target).attr("data-id"),
        text = library[id]

    text.wrdCnt = countWordsFrom(id, text.color);
    text.avgPcnt = avgPercent(text.wrdCnt);
    text.stdDev = stdDev(text.wrdCnt);  //average operation duplication

    // updateStats();

    // function updateStats(){
    //
    //   document.getElementById("stats").innerHTML="";
    //
    //   var arr = [];
    //   arr.length = 0;
    //
    //   for (var i = 0; i < library.length; i++) arr.push.apply(arr, library[i].wrdCnt);
    //   arr.sort(function(x, y){ return y.percent - x.percent; });
    //
    //   for (var i = 0; i < arr.length; i++){ //displays all the word prevalences in order by percentage
    //
    //     document.getElementById("stats").innerHTML += ("<span style='color: " + arr[i].color + ";'><strong>" + arr[i].word + "</strong>&emsp;&emsp;&emsp;" + precise_round(arr[i].percent, 2) + "% </span><br />");
    //
    //   };
    //
    // }

    update_canv();
  })

  $("#addText").on("click", function(){
    LIBRARY.add_text({

    })

    var newId = $("textarea").length - 1

    $("#library").append(/* new text area */).attr("data-id", newId)

  $(".textarea").transition({height: /* new height */}, 300, "ease");

    if ($("textarea:visible").length === 1) {

      console.log($("textarea:visible").length);

      $(".textarea").transition({height: "210px"}, 300, "ease");
      $("#area1").slideDown(300);

    } else if ($("textarea:visible").length === 2) {

      console.log($("textarea:visible").length);

      $(".textarea").transition({height: "135px"}, 300, "ease");
      $("#area2").slideDown(300);
      $(this).hide();

    };

  });

})
