var library = new Library({
  "texts": [ // need library & text objects
    new Text({avgPcnt: 0, stdDev: 0, color: "#3a320e"}),
    new Text({avgPcnt: 0, stdDev: 0, color: "#6d1a1a"}),
    new Text({avgPcnt: 0, stdDev: 0, color: "#19567a"})
  ]
}),

  gaussianCanv = document.getElementById("gaussianCanv"),
  ctx = gaussianCanv.getContext("2d"),
  xScale = 0, yScale = 1;

$(function(){

  setupCanvas();

  $(".textarea").on("input propertychange", function(event) {
    var id = $(event.target).attr("data-id")
    var text = library[id]

    text.wrdCnt = countWordsFrom(id, text.color);
    text.avgPcnt = avgPercent(text.wrdCnt);
    text.stdDev = stdDev(text.wrdCnt);  //average operation duplication

    updateStats();
    updateGaussianCanv();
  })

  $("#addText").on("click", function(){
    var newId = $("textarea").length - 1

    $("#library").append(/* new text area */).attr("data-id", newId)

    $(".textarea").transition({height:}, 300, "ease");


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
