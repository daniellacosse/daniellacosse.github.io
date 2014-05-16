(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function (properties)

		{
			properties.radius = Ship.RADIUS
			properties.color = Ship.COLOR

	    Asteroids.MovingObject.call(this, properties)
	  }

	Ship.RADIUS = 0.9
	Ship.COLOR = "red"

  Ship.inherits(Asteroids.MovingObject)

  Ship.prototype.thrust = function (impulse)

		{
	    _2D.Impulse.thrust(this.vel, impulse, this.game.fps)

			return null
	  }

  Ship.prototype.fire = function(mousePos)

		{
      var bulletVector = this.pos.lineTo(mousePos)

      bulletVector._magnitude_(Asteroids.Bullet.SPEED)
      bulletVector._plus_(this.vel)

	    return new Asteroids.Bullet({
			  pos: this.pos.clone(),
			  vel: bulletVector,
			  game: this.game
			})
	  }

})(this);
