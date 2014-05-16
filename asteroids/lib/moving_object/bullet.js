(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(properties)

		{
			properties.radius = Bullet.RADIUS;
			properties.color = Bullet.COLOR;

	    Asteroids.MovingObject.call(this, properties);
      this.hitsShip = false
      var that = this;
      setInterval(function(){that.hitsShip = true}, 500)
	  }

  Bullet.inherits(Asteroids.MovingObject)

  Bullet.SPEED = 0.25
	Bullet.COLOR = "red"
	Bullet.RADIUS = 0.2

})(this);
