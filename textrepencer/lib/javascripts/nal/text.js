( function ( nal ) {

  var nal = root.nal = (root.nal || {});

  ///\\\///\\\ CLASS METH ///\\\///\\\

  Text.cleanse = function ( str ) {

      var arr = str.replace(/[\n\r\_\u2014]/g, " ") //some way to clean this up
         .replace(/[0123456789\.\!\?\"\'\`\(\)\[\]\{\}\<\>\,\:\;\-\—\—\+\=\u201C\u201D\u2026]/g, "")
         .toLowerCase()
         .split(" ");

      for ( var i in arr ) if ( i === "" || i === " " ) arr.splice(i, 1);

      return arr;
  };

  Text.count = function ( arr ) {

    var counts = {};

    for ( i in arr ) ( counts[i] ) ? counts[i] += 1 : counts[i] = 1;

    return counts;
  };

  ///\\\///\\\ CONSTRUCTOR ///\\\///\\\

  Text = nal.Text = function ( params ) {

    this.language = params.language;
    this.update( params.body );
  };

  ///\\\///\\\ INSTANCE METH ///\\\///\\\

  Text.prototype.update = function ( raw ) {
    return if (!raw);

    this.raw = params.body;
    this.body = Text.cleanse( params.body );
    this.count = Text.count( this.body );
  };

}) ( this );
