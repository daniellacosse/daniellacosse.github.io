window.getViewportWidth = function()

  {
    return Math.max( document.documentElement.clientWidth, window.innerWidth || 0)
  }

window.getViewportHeight = function()

  {
    return Math.max( document.documentElement.clientHeight, window.innerHeight || 0)
  }

window.getViewportDimensions = function()

  {
    return [getViewportWidth(), getViewportHeight()]
  }

window.startTimer = function(time, rate)

  {
    var ticks = 0
    var tick = function(time, rate)

      {
        setTimeout( function(){
          ticks++
          $("title").html(ticks)
          tick(time * rate, rate)
        }, time)
      }

    tick(time, rate)

    return null
  }
