(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function (properties)

		{
	    this.ctx = properties.ctx
      this.width = properties.width
      this.height = properties.height
      this.fps = Game.FPS
      this.score = 0

	    this.asteroids = []
	    this.bullets = []
	    this.ship = new Asteroids.Ship({
	    	pos: new _2D.Position(50, 50),
				vel: _2D.Vector.immobile(),
				game: this
	    })
	  }

  Game.FPS = 60

  Game.prototype.addAsteroid = function ()

		{
	    this.asteroids.push(Asteroids.Asteroid.randomAsteroid(this));
	  }

  Game.prototype.draw = function()

		{
	    this.ctx.clearRect(0, 0, this.width, this.height)

	    for (var i = 0; i < this.asteroids.length; i++) {
	      this.asteroids[i].draw(this.ctx)
	    }

	    for (var i = 0; i < this.bullets.length; i++) {
	      this.bullets[i].draw(this.ctx)
	    }

	    this.ship.draw(this.ctx)
	  }

  Game.prototype.move = function()

		{
      if (!this.lastTickTime) {
        this.lastTickTime = (new Date()).getTime();
      }

      var timeNow = (new Date()).getTime();
      var numTicks = Game.FPS * ((timeNow - this.lastTickTime) / 1000);
      this.lastTickTime = timeNow;

	    for (var i = 0; i < this.asteroids.length; i++) {
	      this.asteroids[i].move(numTicks)
	    }

	    for (var i = 0; i < this.bullets.length; i++) {
	      this.bullets[i].move(numTicks)
	    }

	    this.ship.move(numTicks)
	  }

  Game.prototype.step = function()

		{
      var presentScore = parseInt($("title").html())
      if (presentScore > this.score) this.addAsteroid()
      this.score = presentScore

	    this.move()
	    this.draw()
	    this.checkCollisions()
	  }

  Game.prototype.start = function()

		{
      alert("tap WASD to thrust. click to fire")
	    this.bindKeyHandlers()
	    this.stepInterval = setInterval(this.step.bind(this), 1000 / this.FPS)
	  }

  Game.prototype.checkCollisions = function (stepInterval)

		{
	    for (var i = 0; i < this.asteroids.length; i++)

      {
        for (var j = i + 1; j < this.asteroids.length; j++)

          {
            if (this.asteroids[i].isCollidedWith(this.asteroids[j]))

              {
                Asteroids.MovingObject.elasticCollision(
                  this.asteroids[i], this.asteroids[j]
                )
              }

            if (this.asteroids[i].isCollidedWith(this.ship))

              {
                window.location.reload()
              }
          }

        for (var j = 0; j < this.bullets.length; j++)

          {
            if (this.asteroids[i].isCollidedWith(this.bullets[j]))

              {
                this.removeAsteroid(i)
                this.removeBullet(j)
              }

            if (this.bullets[j].hitsShip && this.ship.isCollidedWith(this.bullets[j]))

              {
                window.location.reload()
              }
          }
      }
	  }

  Game.prototype.stop = function(stepInterval)

		{
	    clearInterval(this.stepInterval)
	  }

  Game.prototype.fireBullet = function(mousePos)

		{
	    this.bullets.push(this.ship.fire(mousePos))
	  }

  Game.prototype.bindKeyHandlers = function()

		{
	    var ship = this.ship
      var thrustDuration = 300
      var thrustAmt = 0.45

      key("a", function(){
        ship.thrust(new _2D.Impulse(-thrustAmt, 0, thrustDuration))
      })

      key("d", function(){
        ship.thrust(new _2D.Impulse(thrustAmt, 0, thrustDuration))
      })

	    key("w", function(){
        ship.thrust(new _2D.Impulse(0, -thrustAmt, thrustDuration))
      })

      key("s", function(){
        ship.thrust(new _2D.Impulse(0, thrustAmt, thrustDuration))
      })
	  }

  Game.prototype.removeAsteroid = function (idx)

		{
	    this.asteroids.splice(idx, 1)
	  }

  Game.prototype.removeBullet = function (idx)

	  {
	    this.bullets.splice(idx, 1)
	  }

})(this);
