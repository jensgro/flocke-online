// Get the first `n` elements of a collection.
module.exports = function(array, size) {
  if( n < 0 ) {
    return array.slice(n);
  }
  return array.slice(0, n);
};
