Function.prototype.inherits = function (SuperClass)

	{
	  var SubClass = this
	  function Surrogate() {}

	  Surrogate.prototype = SuperClass.prototype
	  SubClass.prototype = new Surrogate()
	}

Object.prototype.clone = function ()

	{
		return owl.deepCopy(this)
	}
