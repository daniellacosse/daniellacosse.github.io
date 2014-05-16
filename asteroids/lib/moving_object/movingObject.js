(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function (properties)

		{
			this.pos = properties.pos
	    this.vel = properties.vel

	    this.radius = properties.radius
	    this.color = properties.color

	    this.game = properties.game
			// this._wraps = properties._wraps
	  }

  MovingObject.prototype.draw = function (ctx)

		{
	    ctx.fillStyle = this.color;
      var wid = parseInt(this.game.width)
      var hgt = parseInt(this.game.height)

	    ctx.beginPath();
	    ctx.arc(
	      (this.pos.x / 100) * wid,
	      (this.pos.y / 100) * hgt,
	      (this.radius / 100) * (wid + hgt) / 2,
	      0,
	      2 * Math.PI
	    );

	    ctx.fill();
	  }

  MovingObject.prototype.move = function(times)

		{
      this.pos._hits_( this.vel, function(pos, dPos) {
        var addedDims = pos + (dPos * times)

        if (addedDims < 0) return 100 - addedDims

        ///\\\///\\\ additional 3% is a sort of 'padding' ///\\\///\\\
        return (pos + dPos) % 103
      })
	  }

  MovingObject.prototype.isCollidedWith = function (other)

		{
	    var distance = this.pos.distanceTo(other.pos)

	    return ( this.radius + other.radius >= distance )
	  }

	MovingObject.prototype._rebound_ = function (other)

		{
			var thisMass = this.radius, thatMass = other.radius;

			this.vel._hits_( other.vel, function (thisVel, thatVel)

				{
					var numerator = (thisVel * (thisMass - thatMass)) + ( 2 * thatMass * thatVel )
					var denominator = thisMass + thatMass

					return numerator / denominator
  		})

      return null
    }

	MovingObject.prototype.rebound = function (other)

		{
      var cloneVar = this.clone()
      cloneVar._rebound_(other)
      return cloneVar
		}

  MovingObject.elasticCollision = function(obj1, obj2)

    {
      var obj1Copy = obj1.clone()
      obj1._rebound_(obj2)
      obj2._rebound_(obj1Copy)

      return null
    }

})(this);
