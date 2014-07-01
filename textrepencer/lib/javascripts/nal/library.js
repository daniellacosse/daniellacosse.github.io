( function ( root ) {

  var nal = root.nal = (root.nal || {});

  Library = nal.Library = function ( params ) {
    this.texts = params.texts || [];
  }

  Library.prototype.addText = function ( text ) {
    this.texts.push ( text );
  }

}) ( this );
