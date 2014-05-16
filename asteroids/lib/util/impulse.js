(function(root){
  var _2D = root._2D = (root._2D || {});

  //time is in milliseconds
	var Impulse = _2D.Impulse = function(x, y, t)

    {
      _2D.Vector.call(this, x, y)

      this.duration = t
  	}

  Impulse.inherits(_2D.Vector)

  Impulse.thrust = function(vector, impulse, fps)

    {
      var frameRate = Math.round(1000/fps)
      var impulseFrame = impulse.mod(function(dim){
            return dim * (frameRate/1000)
          })
      var timer = 0
      var thrustFrame = setInterval(function(){
            vector._plus_(impulseFrame)
            timer += frameRate

            if (timer >= impulse.duration) clearInterval(thrustFrame)
          }, frameRate)

      return null
    }

})(this);
