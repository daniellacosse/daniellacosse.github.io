(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(properties)

  	{
      Asteroids.MovingObject.call(this, properties)
    }

  Asteroid.inherits(Asteroids.MovingObject)

  Asteroid.MIN_SPEED = 0.2
  Asteroid.MAX_SPEED = 0.35
  Asteroid.MIN_RADIUS = 0.7
  Asteroid.MAX_RADIUS = 1.8

  Asteroid.randomAsteroid = function(game)

		{
      return new Asteroid({
        game: game,
        _wraps: true,
        pos: _2D.Position.randomPerim(),
        vel: _2D.Vector.random(Asteroid.MIN_SPEED, Asteroid.MAX_SPEED),
        color: "white",
        radius: Asteroid.randomRadius()
      })
	  }

  Asteroid.randomRadius = function()

    {
      return (Asteroid.MAX_RADIUS - Asteroid.MIN_RADIUS) * Math.random() + Asteroid.MIN_RADIUS
    }

})(this);
