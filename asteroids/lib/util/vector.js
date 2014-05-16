(function(root){
  var _2D = root._2D = (root._2D || {});

	var Vector = _2D.Vector = function(x, y)

		{
			_2D.Position.call(this, x, y)

			this.magnitude = Math.sqrt(
				Math.pow(x, 2) + Math.pow(y, 2)
		)}

	Vector.immobile = function ()

		{
			return new Vector(0, 0)
		}

  Vector.random = function (minMag, maxMag)

    {
      var randomMag
      var dummyVec

      randomMag = (maxMag - minMag) * Math.random() + minMag

      dummyVec = new Vector(
        Math.random() - Math.random(), Math.random() - Math.random()
      )

      dummyVec._magnitude_(randomMag)

      return dummyVec
    }

	Vector.inherits(_2D.Position)

	Vector.prototype._normalize_ = function()

		{
			var mag = this.magnitude;

			this._mod_(
				function (dim) { return dim / mag }
			)

			return null;
		}

	Vector.prototype.normalize = function()

		{
      var cloneVar = this.clone()
      cloneVar._normalize_(callback)
      return cloneVar
		}

	Vector.prototype._magnitude_ = function (newMag)

		{
			var factor = newMag / this.magnitude

			this._mod_(
				function (dim) { return dim * factor }
		  )

      this.magnitude = newMag

      return null
    }

	Vector.prototype.ofMagnitude = function (newMag)

		{ // clearly "magnitude" is taken
			var cloneVar = this.clone()
      cloneVar._magnitude_(newMag)
      return cloneVar
		}

	Vector.prototype.endpointsAt = function (pos)

		{ // analogue to Position's "lineTo"
			return [
				pos,
				new _2D.Position(
					pos.x + this.x,
					pos.y + this.y
		)]}

})(this);
