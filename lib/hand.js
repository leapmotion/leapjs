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
 *
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
 * Test for validity with the {@link Hand#valid} property.
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
   * @member Hand.prototype.id
   * @type {String}
   */
  this.id = data.id;
  /**
   * The center position of the palm in millimeters from the Leap origin.
   * @member Hand.prototype.palmPosition
   * @type {Vector}
   */
  this.palmPosition = new Vector(data.palmPosition);
  /**
   * The direction from the palm position toward the fingers.
   *
   * The direction is expressed as a unit vector pointing in the same
   * direction as the directed line from the palm position to the fingers.
   *
   * @member Hand.prototype.direction
   * @type {Vector}
   */
  this.direction = new Vector(data.direction);
  /**
   * The rate of change of the palm position in millimeters/second.
   *
   * @member Hand.prototype.palmVeclocity
   * @type {Vector}
   */
  this.palmVelocity = new Vector(data.palmVelocity);
  /**
   * The normal vector to the palm. If your hand is flat, this vector will
   * point downward, or "out" of the front surface of your palm.
   *
   * <img src="images/Leap_Palm_Vectors.png"/>
   *
   * The direction is expressed as a unit vector pointing in the same
   * direction as the palm normal (that is, a vector orthogonal to the palm).
   * @member Hand.prototype.palmNormal
   * @type {Vector}
   */
  this.palmNormal = new Vector(data.palmNormal);
  /**
   * The center of a sphere fit to the curvature of this hand.
   *
   * This sphere is placed roughly as if the hand were holding a ball.
   *
   * <img src="images/Leap_Hand_Ball.png"/>
   * @member Hand.prototype.sphereCenter
   * @type {Vector}
   */
  this.sphereCenter = new Vector(data.sphereCenter);
  /**
   * The radius of a sphere fit to the curvature of this hand, in millimeters.
   *
   * This sphere is placed roughly as if the hand were holding a ball. Thus the
   * size of the sphere decreases as the fingers are curled into a fist.
   *
   * @member Hand.prototype.sphereRadius
   * @type {Number}
   */
  this.sphereRadius = data.sphereRadius;
  /**
   * Reports whether this is a valid Hand object.
   *
   * @member Hand.prototype.valid
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
   * @member Hand.prototype.pointables[]
   * @type {Pointable}
   */
  this.pointables = [];
  /**
   * The list of fingers detected in this frame that are attached to
   * this hand, given in arbitrary order.
   *
   * The list can be empty if no fingers attached to this hand are detected.
   *
   * @member Frame.prototype.fingers[]
   * @type {Pointable}
   */
  this.fingers = [];
  /**
   * The list of tools detected in this frame that are held by this
   * hand, given in arbitrary order.
   *
   * The list can be empty if no tools held by this hand are detected.
   *
   * @member Hand.prototype.tools[]
   * @type {Pointable}
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
 * @method Hand.prototype.finger
 * @param {String} id The ID value of a finger from a previous frame.
 * @returns {Pointable | Pointable.Invalid} The Finger object with
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
 * @method Hand.prototype.rotationAngle
 * @param {Frame} sinceFrame The starting frame for computing the relative rotation.
 * @returns {Number} A positive value representing the heuristically determined 
 * rotational change of the hand between the current frame and that specified in 
 * the sinceFrame parameter.
 */
Hand.prototype.rotationAngle = function(sinceFrame, axis){
	// TODO: implement axis parameter
	if (!this.valid || !sinceFrame.valid) return 0.0;
	var sinceHand = sinceFrame.hand(this.id);
	if(!sinceHand.valid) return 0.0;
	
	var rot = this.rotationMatrix(sinceFrame);
	var cs = (rot.xBasis.x + rot.yBasis.y + rot.zBasis.z - 1.0)*0.5
	var angle = Math.acos(cs);
	return isNaN(angle) ? 0.0 : angle;
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
 * @method Hand.prototype.rotationAxis
 * @param {Frame} sinceFrame The starting frame for computing the relative rotation.
 * @returns {Vector} A normalized direction Vector representing the axis of the heuristically determined 
 * rotational change of the hand between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.rotationAxis = function(sinceFrame){
	if (!this.valid || !sinceFrame.valid) return Vector.zero();
	var sinceHand = sinceFrame.hand(this.id);
	if(!sinceHand.valid) return Vector.zero();
	
	var x = this.rotation.zBasis.y - sinceHand.rotation.yBasis.z;
	var y = this.rotation.xBasis.z - sinceHand.rotation.zBasis.x;
	var z = this.rotation.yBasis.x - sinceHand.rotation.xBasis.y;
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
 * @method Hand.prototype.rotationMatrix
 * @param {Frame} sinceFrame The starting frame for computing the relative rotation.
 * @returns {Matrix} A transformation Matrix containing the heuristically determined 
 * rotational change of the hand between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.rotationMatrix = function(sinceFrame){
	if (!this.valid || !sinceFrame.valid) return Matrix.identity();
	var sinceHand = sinceFrame.hand(this.id);
	if(!sinceHand.valid) return Matrix.identity();
	
	var xBasis = new Vector([this.rotation.xBasis.x, this.rotation.yBasis.x, this.rotation.zBasis.x]);
	var yBasis = new Vector([this.rotation.xBasis.y, this.rotation.yBasis.y, this.rotation.zBasis.y]);
	var zBasis = new Vector([this.rotation.xBasis.z, this.rotation.yBasis.z, this.rotation.zBasis.z]);
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
 * @method Hand.prototype.scaleFactor
 * @param {Frame} sinceFrame The starting frame for computing the relative scaling.
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
 * @method Hand.prototype.translation
 * @param {Frame} sinceFrame The starting frame for computing the relative translation.
 * @returns {Vector} A Vector representing the heuristically determined change in hand 
 * position between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.translation = function(sinceFrame){
	if (!this.valid || !sinceFrame.valid) return Vector.zero();
	var sinceHand = sinceFrame.hand(this.id);
	if(!sinceHand.valid) return Vector.zero();
	
	var x = this._translation.x - sinceHand._translation.x;
	var y = this._translation.y - sinceHand._translation.y;
	var z = this._translation.z - sinceHand._translation.z;
	return new Vector([x, y, z]);
}

/**
 * A string containing a brief, human readable description of the Hand object.
 * @method Hand.prototype.toString
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
 * @constant
 * @type {Hand}
 * @name Hand.Invalid
 */
Hand.Invalid = { valid: false };
