//var $M = require("./sylvester").$M
var transposeMultiply = require('./util').transposeMultiply
  , normalizeVector = require('./util').normalizeVector;

var Motion = exports.Motion = {
  matrix: function() {
    return this.rotation;
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
   * @param {Frame} fromFrame The starting frame for computing the
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
   * @param {Frame} fromFrame A different frame description.
   * @returns {Array: [x,y,z]} rotationAxis Return description.
   */
  rotationAxis: function(fromFrame) {
    if (!this.valid || !fromFrame.valid) return [0, 0, 0];
    var vec = [ this.rotation[2][1] - fromFrame.rotation[1][2],
                this.rotation[0][2] - fromFrame.rotation[2][0],
                this.rotation[1][0] - fromFrame.rotation[0][1] ];
    return normalizeVector(vec);
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
   * @param {Frame} fromFrame The starting frame for computing the
   * relative rotation.
   * @returns {Number} A positive value containing the heuristically
   * determined rotational change between the current frame and that specified
   * in the fromFrame parameter.
   */
  rotationAngle: function(fromFrame) {
    if (!this.valid || !fromFrame.valid) return 0.0;
    var rot = fromFrame.rotation;
    var cs = (rot[0][0] + rot[1][1] + rot[2][2] - 1.0)*0.5;
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
   * @param {Frame} fromFrame The starting frame for computing the
   * relative rotation.
   * @returns {Sylvester.Matrix} A transformation matrix containing the
   * heuristically determined rotational change between the current frame and
   * that specified in the fromFrame parameter.
   */
  rotationMatrix: function(fromFrame) {
    return (!this.valid || !fromFrame.valid) ? [[1,0,0], [0,1,0], [0,0,1]] : transposeMultiply(this, fromFrame);
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
   * @param {Frame} fromFrame The starting frame for computing the
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
