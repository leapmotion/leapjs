exports.vectorize = function(array) {
  array.x = array[0];
  array.y = array[1];
  array.z = array[2];
  return array;
};