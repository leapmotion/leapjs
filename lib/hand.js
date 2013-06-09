var Pointable = require("./pointable").Pointable
  , Vector = require("./vector").Vector
  , Matrix = require("./matrix").Matrix
  , _ = require("underscore");

/**
 * Constructs a Hand object.
 *
 * An uninitialized hand is considered invalid.
 * Get valid Hand objects from a Frame object.
 * @class Hand
 * @memberof Leap
 * @classdesc
 * The Hand class reports the physical characteristics of a detected hand.
 *
 * Hand tracking data includes a palm position and velocity; vectors for
 * the palm normal and direction to the fingers; properties of a sphere fit
 * to the hand; and lists of the attached fingers and tools.
 *
 * Note that Hand objects can be invalid, which means that they do not contain
 * valid tracking data and do not correspond to a physical entity. Invalid Hand
 * objects can be the result of asking for a Hand object using an ID from an
 * earlier frame when no Hand objects with that ID exist in the current frame.
 * A Hand object created from the Hand constructor is also invalid.
 * Test for validity with the [Hand.valid]{@link Leap.Hand#valid} property.
 */
var Hand = exports.Hand = function(data) {
  /**
   * A unique ID assigned to this Hand object, whose value remains the same
   * across consecutive frames while the tracked hand remains visible. If
   * tracking is lost (for example, when a hand is occluded by another hand
   * or when it is withdrawn from or reaches the edge of the Leap field of view),
   * the Leap may assign a new ID when it detects the hand in a future frame.
   *
   * Use the ID value with the {@link Frame.hand}() function to find this
   * Hand object in future frames.
   *
   * @member id
   * @memberof Leap.Hand.prototype
   * @type {String}
   */
  this.id = data.id;
  /**
   * The center position of the palm in millimeters from the Leap origin.
   * @member palmPosition
   * @memberof Leap.Hand.prototype
   * @type {Leap.Vector}
   */
  this.palmPosition = new Vector(data.palmPosition);
  /**
   * The direction from the palm position toward the fingers.
   *
   * The direction is expressed as a unit vector pointing in the same
   * direction as the directed line from the palm position to the fingers.
   *
   * @member direction
   * @memberof Leap.Hand.prototype
   * @type {Leap.Vector}
   */
  this.direction = new Vector(data.direction);
  /**
   * The rate of change of the palm position in millimeters/second.
   *
   * @member palmVeclocity
   * @memberof Leap.Hand.prototype
   * @type {Leap.Vector}
   */
  this.palmVelocity = new Vector(data.palmVelocity);
  /**
   * The normal vector to the palm. If your hand is flat, this vector will
   * point downward, or "out" of the front surface of your palm.
   *
   * ![Palm Vectors](images/Leap_Palm_Vectors.png)
   *
   * The direction is expressed as a unit vector pointing in the same
   * direction as the palm normal (that is, a vector orthogonal to the palm).
   * @member palmNormal
   * @memberof Leap.Hand.prototype
   * @type {Leap.Vector}
   */
  this.palmNormal = new Vector(data.palmNormal);
  /**
   * The center of a sphere fit to the curvature of this hand.
   *
   * This sphere is placed roughly as if the hand were holding a ball.
   *
   * ![Hand Ball](images/Leap_Hand_Ball.png)
   * @member sphereCenter
   * @memberof Leap.Hand.prototype
   * @type {Leap.Vector}
   */
  this.sphereCenter = new Vector(data.sphereCenter);
  /**
   * The radius of a sphere fit to the curvature of this hand, in millimeters.
   *
   * This sphere is placed roughly as if the hand were holding a ball. Thus the
   * size of the sphere decreases as the fingers are curled into a fist.
   *
   * @member sphereRadius
   * @memberof Leap.Hand.prototype
   * @type {Number}
   */
  this.sphereRadius = data.sphereRadius;
  /**
   * Reports whether this is a valid Hand object.
   *
   * @member valid
   * @memberof Leap.Hand.prototype
   * @type {Boolean}
   */
  this.valid = true;
  /**
   * The list of Pointable objects (fingers and tools) detected in this frame
   * that are associated with this hand, given in arbitrary order. The list
   * can be empty if no fingers or tools associated with this hand are detected.
   *
   * Use the {@link Pointable} tool property to determine
   * whether or not an item in the list represents a tool or finger.
   * You can also get only the tools using the Hand.tools[] list or
   * only the fingers using the Hand.fingers[] list.
   *
   * @member pointables[]
   * @memberof Leap.Hand.prototype
   * @type {Leap.Pointable}
   */
  this.pointables = [];
  /**
   * The list of fingers detected in this frame that are attached to
   * this hand, given in arbitrary order.
   *
   * The list can be empty if no fingers attached to this hand are detected.
   *
   * @member fingers[]
   * @memberof Leap.Hand.prototype
   * @type {Leap.Pointable}
   */
  this.fingers = [];
  /**
   * The list of tools detected in this frame that are held by this
   * hand, given in arbitrary order.
   *
   * The list can be empty if no tools held by this hand are detected.
   *
   * @member tools[]
   * @memberof Leap.Hand.prototype
   * @type {Leap.Pointable}
   */
  this.tools = [];
  this._translation = new Vector(data.t);
  this.rotation = new Matrix(data.r);
  this._scaleFactor = data.s;
}

/**
 * The finger with the specified ID attached to this hand.
 *
 * Use this function to retrieve a Pointable object representing a finger
 * attached to this hand using an ID value obtained from a previous frame.
 * This function always returns a Pointable object, but if no finger
 * with the specified ID is present, an invalid Pointable object is returned.
 *
 * Note that the ID values assigned to fingers persist across frames, but only
 * until tracking of a particular finger is lost. If tracking of a finger is
 * lost and subsequently regained, the new Finger object representing that
 * finger may have a different ID than that representing the finger in an
 * earlier frame.
 *
 * @method finger
 * @memberof Leap.Hand.prototype
 * @param {String} id The ID value of a finger from a previous frame.
 * @returns {Leap.Pointable} The Finger object with
 * the matching ID if one exists for this hand in this frame; otherwise, an
 * invalid Finger object is returned.
 */
Hand.prototype.finger = function(id) {
  var finger = this.frame.finger(id);
  return (finger && finger.handId == this.id) ? finger : Pointable.Invalid;
}

/**
 * The angle of rotation around the rotation axis derived from the change in 
 * orientation of this hand, and any associated fingers and tools, between the 
 * current frame and the specified frame.
 * 
 * The returned angle is expressed in radians measured clockwise around the 
 * rotation axis (using the right-hand rule) between the start and end frames. 
 * The value is always between 0 and pi radians (0 and 180 degrees).
 * 
 * If a corresponding Hand object is not found in sinceFrame, or if either 
 * this frame or sinceFrame are invalid Frame objects, then the angle of rotation is zero.
 * 
 * @method rotationAngle
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @param {Leap.Vector} [axis] The axis to measure rotation around.
 * @returns {Number} A positive value representing the heuristically determined 
 * rotational change of the hand between the current frame and that specified in 
 * the sinceFrame parameter.
 */
Hand.prototype.rotationAngle = function(sinceFrame, axis){
  if (!this.valid || !sinceFrame.valid) return 0.0;
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return 0.0;
  
  var rot = this.rotationMatrix(sinceFrame);
  var cs = (rot[0][0] + rot[1][1] + rot[2][2] - 1.0)*0.5
  var angle = Math.acos(cs);
  angle = isNaN(angle) ? 0.0 : angle;

  if(axis){
    var rotAxis = this.rotationAxis(sinceFrame);
    angle *= rotAxis.dot(axis.normalized());
  }

  return angle;
}

/**
 * The axis of rotation derived from the change in orientation of this hand, and 
 * any associated fingers and tools, between the current frame and the specified frame.
 * 
 * The returned direction vector is normalized.
 * 
 * If a corresponding Hand object is not found in sinceFrame, or if either 
 * this frame or sinceFrame are invalid Frame objects, then this method returns a zero vector.
 * 
 * @method rotationAxis
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @returns {Leap.Vector} A normalized direction Vector representing the axis of the heuristically determined 
 * rotational change of the hand between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.rotationAxis = function(sinceFrame){
  if (!this.valid || !sinceFrame.valid) return Vector.zero();
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return Vector.zero();
  
  var x = this.rotation[2][1] - sinceHand.rotation[1][2];
  var y = this.rotation[0][2] - sinceHand.rotation[2][0];
  var z = this.rotation[1][0] - sinceHand.rotation[0][1];
  var vec = new Vector([x, y, z]);
  return vec.normalized();
}

/**
 * The transform matrix expressing the rotation derived from the change in 
 * orientation of this hand, and any associated fingers and tools, between 
 * the current frame and the specified frame.
 * 
 * If a corresponding Hand object is not found in sinceFrame, or if either 
 * this frame or sinceFrame are invalid Frame objects, then this method returns 
 * an identity matrix.
 * 
 * @method rotationMatrix
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @returns {Leap.Matrix} A transformation Matrix containing the heuristically determined 
 * rotational change of the hand between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.rotationMatrix = function(sinceFrame){
  if (!this.valid || !sinceFrame.valid) return Matrix.identity();
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return Matrix.identity();
  
  var xBasis = new Vector([this.rotation[0][0], this.rotation[1][0], this.rotation[2][0]]);
  var yBasis = new Vector([this.rotation[0][1], this.rotation[1][1], this.rotation[2][1]]);
  var zBasis = new Vector([this.rotation[0][2], this.rotation[1][2], this.rotation[2][2]]);
  var transpose = new Matrix([xBasis, yBasis, zBasis]);
  return sinceHand.rotation.times(transpose);
}

/**
 * The scale factor derived from the hand's motion between the current frame and the specified frame.
 * 
 * The scale factor is always positive. A value of 1.0 indicates no scaling took place. 
 * Values between 0.0 and 1.0 indicate contraction and values greater than 1.0 indicate expansion.
 * 
 * The Leap derives scaling from the relative inward or outward motion of a hand 
 * and its associated fingers and tools (independent of translation and rotation).
 * 
 * If a corresponding Hand object is not found in sinceFrame, or if either this frame or sinceFrame 
 * are invalid Frame objects, then this method returns 1.0.
 * 
 * @method scaleFactor
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative scaling.
 * @returns {Number} A positive value representing the heuristically determined 
 * scaling change ratio of the hand between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.scaleFactor = function(sinceFrame){
  if (!this.valid || !sinceFrame.valid) return 1.0;
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return 1.0;
  
  return Math.exp(this._scaleFactor - sinceHand._scaleFactor);
}

/**
 * The change of position of this hand between the current frame and the specified frame
 * 
 * The returned translation vector provides the magnitude and direction of the 
 * movement in millimeters.
 * 
 * If a corresponding Hand object is not found in sinceFrame, or if either this frame or 
 * sinceFrame are invalid Frame objects, then this method returns a zero vector.
 * 
 * @method translation
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative translation.
 * @returns {Leap.Vector} A Vector representing the heuristically determined change in hand 
 * position between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.translation = function(sinceFrame){
  if (!this.valid || !sinceFrame.valid) return Vector.zero();
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return Vector.zero();
  
  var x = this._translation[0] - sinceHand._translation[0];
  var y = this._translation[1] - sinceHand._translation[1];
  var z = this._translation[2] - sinceHand._translation[2];
  return new Vector([x, y, z]);
}

/**
 * A string containing a brief, human readable description of the Hand object.
 * @method toString
 * @memberof Leap.Hand.prototype
 * @returns {String} A description of the Hand as a string.
 */
Hand.prototype.toString = function() {
  return "Hand [ id: "+ this.id + " | palm velocity:"+this.palmVelocity+" | sphere center:"+this.sphereCenter+" ] ";
}

/**
 * An invalid Hand object.
 *
 * You can use an invalid Hand object in comparisons testing
 * whether a given Hand instance is valid or invalid. (You can also use the
 * Hand valid property.)
 *
 * @static
 * @type {Leap.Hand}
 * @name Invalid
 * @memberof Leap.Hand
 */
Hand.Invalid = { valid: false };
