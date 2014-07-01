( function ( root ) {

  var nal = root.nal = (root.nal || {});

  Dictionary = nal.Dictionary = function ( params ) {
    this.language = JSON.serialize( params.language );
  }

}) ( this );
