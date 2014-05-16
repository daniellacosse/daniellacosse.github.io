(function(root){
  var _2D = root._2D = (root._2D || {});

	var Position = _2D.Position = function (x, y)

		{
			this.x = x; this.y = y
			this.dimensions = [x, y]
			this._scales = false;
		}

	Position.origin = function ()

		{
			return new Position(0, 0)
		}

  Position.random = function(width, height)

    {
      return new Position(width * Math.random(), height * Math.random())
    }

  Position.randomPerim = function(width, height)

    {
      var wall = Math.round(Math.random() * 3)

      switch(wall) {
      case 0:
        return new Position(100 * Math.random(), 0)
        break
      case 1:
        return new Position(100 * Math.random(), 100)
        break
      case 2:
        return new Position(0, 100 * Math.random())
        break
      case 3:
        return new Position(100, 100 * Math.random())
        break
      }
    }

	Position.prototype.isEqualto = function (other)

		{
			return ((this.x === other.x) && (this.y === other.y))
		}

	Position.prototype._mod_ = function (callback)

		{
			this.x = callback(this.x)
			this.y = callback(this.y)
			this.dimensions = [this.x, this.y]
			if (this._scales) this._refresh_("scale")

			return null
		}

	Position.prototype.mod = function (callback)

		{
			var cloneVar = this.clone()
      cloneVar._mod_(callback)
      return cloneVar
		}

	Position.prototype._hits_ = function (other, callback)

		{
      this.x = callback(this.x, other.x)
      this.y = callback(this.y, other.y)
      this.dimensions = [this.x, this.y]

			return null
		}

	Position.prototype.hits = function (other, callback)

		{
			var cloneVar = this.clone()
      cloneVar._hits_(other, callback)
      return cloneVar
		}

	Position.prototype._plus_ = function (other)

		{
			this._hits_(
				other,
				function (a, b) { return a + b }
			)

			return null
		}

	Position.prototype.plus = function (other)

		{
			var cloneVar = this.clone()
      cloneVar._plus_(callback)
      return cloneVar
		}

	Position.prototype.lineTo = function (otherPos)

		{ // can't use hits because we have to return a vector
			return new _2D.Vector(
				otherPos.x - this.x,
				otherPos.y - this.y
		)}

	Position.prototype.distanceTo = function (otherPos)

		{ // used to overcome an inefficiency whereby
			// we avoid creating vector objects to
			// merely check collisions
			return Math.sqrt(
				Math.pow(otherPos.x - this.x, 2) + Math.pow(otherPos.y - this.y, 2)
		)}

	// still not 100% on "scale logic"
	// Position.prototype.scalesTo = function (maxX, maxY)
  //
	// 	{
	// 		if (this.x > maxX || this.y > maxY) throw "Out of Bounds"
  //
	// 		this._scales = true
  //
	// 		this.maxX = maxX; this.maxY = maxY
	// 		this.pcntX = this.x / maxX
	// 		this.pcntY = this.y / maxY
	// 		this.pcntDim = [ this.pcntX, this.pcntY ]
  //
	// 		return null
	// 	}
  //
	// Position.prototype._refresh_ = function (prop)
  //
	// 	{
	// 		if (prop === "scale" || prop === "s") {
  //
	// 			this.pcntX = this.x / this.maxX
	// 			this.pcntY = this.y / this.maxY
	// 			this.pcntDim = [ this.pcntX, this.pcntY ]
  //
	// 		} else if (prop === "dimensions" || prop === "d") {
  //
	// 			this.x = this.pcntX * this.maxX
	// 			this.y = this.pcntY * this.maxY
	// 			this.dimensions = [ this.x, this.y ]
  //
	// 		}	else if (prop === "all" || prop === "a") {
  //
	// 			this._refresh_("scale")
	// 			this._refresh_("dimensions")
	// 		}
  //
	// 		return null
	// 	}


})(this);
