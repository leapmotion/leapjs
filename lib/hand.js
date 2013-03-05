var Motion = require("./motion").Motion
  , Pointable = require("./pointable").Pointable
  , extend = require("./util").extend;

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
 *
 * @borrows Motion#translation as #translation
 * @borrows Motion#matrix as #matrix
 * @borrows Motion#rotationAxis as #rotationAxis
 * @borrows Motion#rotationAngle as #rotationAngle
 * @borrows Motion#rotationMatrix as #rotationMatrix
 * @borrows Motion#scaleFactor as #scaleFactor
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
   * @type {Array: [x,y,z]}
   */
  this.palmPosition = data.palmPosition;
  /**
   * The direction from the palm position toward the fingers.
   *
   * The direction is expressed as a unit vector pointing in the same
   * direction as the directed line from the palm position to the fingers.
   *
   * @member Hand.prototype.direction
   * @type {Array: [x,y,z]}
   */
  this.direction = data.direction;
  /**
   * The rate of change of the palm position in millimeters/second.
   *
   * @member Hand.prototype.palmVeclocity
   * @type {Array: [Vx,Vy,Vz]}
   */
  this.palmVelocity = data.palmVelocity;
  /**
   * The normal vector to the palm. If your hand is flat, this vector will
   * point downward, or "out" of the front surface of your palm.
   *
   * <img src="images/Leap_Palm_Vectors.png"/>
   *
   * The direction is expressed as a unit vector pointing in the same
   * direction as the palm normal (that is, a vector orthogonal to the palm).
   * @member Hand.prototype.palmNormal
   * @type {Array: [x,y,z]}
   */
  this.palmNormal = data.palmNormal;
  /**
   * The center of a sphere fit to the curvature of this hand.
   *
   * This sphere is placed roughly as if the hand were holding a ball.
   *
   * <img src="images/Leap_Hand_Ball.png"/>
   * @member Hand.prototype.sphereCenter
   * @type {Array: [x,y,z]}
   */
  this.sphereCenter = data.sphereCenter
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
  this._translation = data.t;
  this.rotation = data.r;
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
extend(Hand.Invalid, Motion);
extend(Hand.prototype, Motion);
