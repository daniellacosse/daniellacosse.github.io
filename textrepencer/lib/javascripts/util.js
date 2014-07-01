

function precise_round ( num, decimals ) {

  return Math.round( num * Math.pow( 10, decimals ) )/Math.pow( 10, decimals );
}

function scale ( val, scaleFrom, scaleTo ) {

  return ( ( val/scaleFrom ) * scaleTo );
}

function avg ( arr ) {

  var sum = 0;

  for ( i in arr ) sum += i;

  sum /= arr.length;

  return sum;
}


function std_dev( arr ) {

  var average = avg ( arr ),
      sum = 0;

  for ( i in arr ) sum += Math.pow( i - average, 2 );

  sum /= arr.length;

  return Math.sqrt( sum );
}


function gauss_dist(x, avg, stdDev){

  return ( Math.exp( -Math.pow( x - avg , 2 ) / ( 2 * Math.pow( stdDev, 2 ) ) ) / (stdDev * Math.sqrt( 2 * Math.PI )) );

}
