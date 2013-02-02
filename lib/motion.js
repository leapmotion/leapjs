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
var multiply = function(vec, c) {
  return [vec[0] * c, vec[1] * c, vec[2] * c]
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
var normalize = function(vec) {
  var denom = vec[0]*vec[0] + vec[1]*vec[1] + vec[2]*vec[2];
  if (denom <= 0) return [0,0,0];
  var c = 1.0 / Math.sqrt(denom);
  return multiply(vec, c);
}

var Motion = exports.Motion = {
  /**
   * matrix() method description.
   * @method Motion.prototype.matrix
   * @returns {Sylvester.Matrix} matrix Return description.
   */
  matrix: function() {
    if (this._matrix) return this._matrix;
    return this._matrix = $M(this.rotation);
  },
  /**
   * The change of position derived from the linear motion between
   * the current frame and the specified frame.
   *
   * The returned translation vector provides the magnitude and direction of
   * the movement in millimeters.
   *
   * The Leap derives frame translation from the linear motion of
   * all objects detected in the field of view. It derives hand translation
   * from the linear motion of the hand and any associated fingers and tools.
   *
   * If either this frame or fromFrame is an invalid Frame object, then this
   * method returns a zero vector.
   *
   * @method Motion.prototype.translation
   * @param {Leap.Frame} fromFrame The starting frame for computing the
   * relative translation.
   * @returns {Array: [x,y,z]} A vector representing the heuristically
   * determined change in position of all objects between the current frame
   * and that specified in the fromFrame parameter.
   */
  translation: function(fromFrame) {
    if (!this.valid || !fromFrame.valid) {
      return [0, 0, 0];
    }
    return [ this._translation[0] - fromFrame._translation[0],
             this._translation[1] - fromFrame._translation[1],
             this._translation[2] - fromFrame._translation[2] ];
  },
  /**
   * rotationAxis() description.
   * @method Motion.prototype.rotationAxis
   * @param {Leap.Frame} fromFrame A different frame description.
   * @returns {Array: [x,y,z]} rotationAxis Return description.
   */
  rotationAxis: function(fromFrame) {
    if (!this.valid || !fromFrame.valid) return [0, 0, 0];
    var vec = [ this.rotation[2][1] - fromFrame.rotation[1][2],
                this.rotation[0][2] - fromFrame.rotation[2][0],
                this.rotation[1][0] - fromFrame.rotation[0][1] ];
    return normalize(vec);
  },
  /**
   * The angle of rotation around the rotation axis derived from the overall
   * rotational motion between the current frame and the specified frame.
   *
   * The returned angle is expressed in radians measured clockwise around the
   * rotation axis (using the right-hand rule) between the start and end frames.
   * The value is always between 0 and pi radians (0 and 180 degrees).
   *
   * The Leap derives frame rotation from the relative change in position and
   * orientation of all objects detected in the field of view. It derives
   * hand rotation from the rotation of the hand and any associated fingers
   * and tools.
   *
   * If either this frame or fromFrame is an invalid Frame object, then the
   * angle of rotation is zero.
   *
   * @method Motion.prototype.rotationAngle
   * @param {Leap.Frame} fromFrame The starting frame for computing the
   * relative rotation.
   * @returns {Number} A positive value containing the heuristically
   * determined rotational change between the current frame and that specified
   * in the fromFrame parameter.
   */
  rotationAngle: function(fromFrame) {
    if (!this.valid || !fromFrame.valid) return 0.0;
    var rot = this.rotationMatrix(fromFrame).elements;
    var cs = (rot[0][0] + rot[1][1] + rot[2][2] - 1.0)*0.5
    var angle = Math.acos(cs);
    return angle === NaN ? 0.0 : angle;
  },
  /**
   * The transform matrix expressing the rotation derived from the overall
   * rotational motion between the current frame and the specified frame.
   *
   * The Leap derives frame rotation from the relative change in position and
   * orientation of all objects detected in the field of view. It derives hand
   * rotation from the rotation of a hand and any associated fingers and tools.
   *
   * If either this frame or fromFrame is an invalid Frame object, then this
   * method returns an identity matrix.
   *
   * @method Motion.prototype.rotationMatrix
   * @param {Leap.Frame} fromFrame The starting frame for computing the
   * relative rotation.
   * @returns {Sylvester.Matrix} A transformation matrix containing the
   * heuristically determined rotational change between the current frame and
   * that specified in the fromFrame parameter.
   */
  rotationMatrix: function(fromFrame) {
    if (!this.valid || !fromFrame.valid) $M.I(3);
    return this.matrix().transpose().multiply(fromFrame.matrix());
  },
  /**
   * The scale factor derived from the motion between the current frame
   * and the specified frame.
   *
   * The scale factor is always positive. A value of 1.0 indicates no
   * scaling took place. Values between 0.0 and 1.0 indicate contraction
   * and values greater than 1.0 indicate expansion.
   *
   * The Leap derives scaling for a frame from the relative inward or outward
   * motion of all objects detected in the field of view (independent of
   * translation and rotation). It derives scaling for a hand from the spread
   * of the associated hands and fingers.
   *
   * If either this frame or fromFrame is an invalid Frame object, then this
   * method returns 1.0.
   *
   * @method Motion.prototype.scaleFactor
   * @param {Leap.Frame} fromFrame The starting frame for computing the
   * relative scaling.
   * @returns {Number} scaleFactor A positive value representing the
   * heuristically determined scaling change ratio between the current frame
   * and that specified in the fromFrame parameter.
   */
  scaleFactor: function(fromFrame) {
    if (!this.valid || !fromFrame.valid) 1.0;
    return Math.exp(this._scaleFactor - fromFrame._scaleFactor);
  }
}
