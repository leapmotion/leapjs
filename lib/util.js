// mostly lifted from underscore

var slice = Array.prototype.slice
  , nativeForEach = Array.prototype.forEach;

var each = exports.each = function(obj, iterator, context) {
  if (obj == null) return;
  if (nativeForEach && obj.forEach === nativeForEach) {
    obj.forEach(iterator, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (iterator.call(context, obj[i], i, obj) === breaker) return;
    }
  } else {
    for (var key in obj) {
      if (_.has(obj, key)) {
        if (iterator.call(context, obj[key], key, obj) === breaker) return;
      }
    }
  }
};

var extend = exports.extend = function(obj) {
  each(slice.call(arguments, 1), function(source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
};

var transposeMultiply = exports.transposeMultiply = function(m1, m2) {
  return multiply(transpose(m1), m2);
}

var transpose = exports.transposeMultiply = function(m) {
  return [[m[0][0], m[1][0], m[2][0]], [m[0][1], m[1][1], m[2][1]], [m[0][2], m[1][2], m[2][2]]];
}

var multiply = exports.multiply = function(m1, m2) {
  return [
    [
      m1[0][0] * m2[0][0] + m1[0][1] * m2[1][0] + m1[0][2] * m2[2][0],
      m1[0][0] * m2[0][1] + m1[0][1] * m2[1][1] + m1[0][2] * m2[2][1],
      m1[0][0] * m2[0][2] + m1[0][1] * m2[1][2] + m1[0][2] * m2[2][2]
    ], [
      m1[1][0] * m2[0][0] + m1[1][1] * m2[1][0] + m1[1][2] * m2[2][0],
      m1[1][0] * m2[0][1] + m1[1][1] * m2[1][1] + m1[1][2] * m2[2][1],
      m1[1][0] * m2[0][2] + m1[1][1] * m2[1][2] + m1[1][2] * m2[2][2]
    ], [
      m1[2][0] * m2[0][0] + m1[2][1] * m2[1][0] + m1[2][2] * m2[2][0],
      m1[2][0] * m2[0][1] + m1[2][1] * m2[1][1] + m1[2][2] * m2[2][1],
      m1[2][0] * m2[0][2] + m1[2][1] * m2[1][2] + m1[2][2] * m2[2][2]
    ]
  ];
}

/**
 * A utility function to multiply a vector represented by a 3-element array
 * by a scalar.
 *
 * @method Leap.multiply
 * @param {Array: [x,y,z]} vec An array containing three elements representing
 * coordinates in 3-dimensional space.
 * @param {Number} c A scalar value.
 * @returns {Array: [c*x, c*y, c*z]} The product of a 3-d vector and a scalar.
 */
var multiplyVector = exports.multiplyVector = function(vec, c) {
  return [vec[0] * c, vec[1] * c, vec[2] * c];
};

/**
 * A utility function to normalize a vector represented by a 3-element array.
 *
 * A normalized vector has the same direction as the original, but a length
 * of 1.0.
 *
 * @method Leap.normalize
 * @param {Array: [x,y,z]} vec An array containing three elements representing
 * coordinates in 3-dimensional space.
 * @returns {Array: [x,y,z]} The normalized vector.
 */
var normalizeVector = exports.normalizeVector = function(vec) {
  var denom = vec[0]*vec[0] + vec[1]*vec[1] + vec[2]*vec[2];
  if (denom <= 0) return [0,0,0];
  var c = 1.0 / Math.sqrt(denom);
  return multiplyVector(vec, c);
}
