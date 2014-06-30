(function (root) {

  var nal = root.nal = (root.nal || {});

  nal.Dictionary = Dictionary = function(params){
    this.language = JSON.serialize( params.language );
  }

})(this);
