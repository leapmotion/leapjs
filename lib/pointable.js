var glMatrix = require("gl-matrix")
  , vec3 = glMatrix.vec3;

/**
 * Constructs a Pointable object.
 *
 * An uninitialized pointable is considered invalid.
 * Get valid Pointable objects from a Frame or a Hand object.
 *
 * @class Pointable
 * @memberof Leap
 * @classdesc
 * The Pointable class reports the physical characteristics of a detected
 * finger or tool.
 *
 * Both fingers and tools are classified as Pointable objects. Use the
 * Pointable.tool property to determine whether a Pointable object represents a
 * tool or finger. The Leap classifies a detected entity as a tool when it is
 * thinner, straighter, and longer than a typical finger.
 *
 * Note that Pointable objects can be invalid, which means that they do not
 * contain valid tracking data and do not correspond to a physical entity.
 * Invalid Pointable objects can be the result of asking for a Pointable object
 * using an ID from an earlier frame when no Pointable objects with that ID
 * exist in the current frame. A Pointable object created from the Pointable
 * constructor is also invalid. Test for validity with the Pointable.valid
 * property.
 */
var Pointable = module.exports = function(data) {
  /**
   * Indicates whether this is a valid Pointable object.
   *
   * @member valid
   * @type {Boolean}
   * @memberof Leap.Pointable.prototype
   */
  this.valid = true;
  /**
   * A unique ID assigned to this Pointable object, whose value remains the
   * same across consecutive frames while the tracked finger or tool remains
   * visible. If tracking is lost (for example, when a finger is occluded by
   * another finger or when it is withdrawn from the Leap field of view), the
   * Leap may assign a new ID when it detects the entity in a future frame.
   *
   * Use the ID value with the pointable() functions defined for the
   * {@link Frame} and {@link Frame.Hand} classes to find this
   * Pointable object in future frames.
   *
   * @member id
   * @type {String}
   * @memberof Leap.Pointable.prototype
   */
  this.id = data.id;
  this.handId = data.handId;
  /**
   * The estimated length of the finger or tool in millimeters.
   *
   * The reported length is the visible length of the finger or tool from the
   * hand to tip. If the length isn't known, then a value of 0 is returned.
   *
   * @member length
   * @type {number}
   * @memberof Leap.Pointable.prototype
   */
  this.length = data.length;
  /**
   * Whether or not the Pointable is believed to be a tool.
   * Tools are generally longer, thinner, and straighter than fingers.
   *
   * If tool is false, then this Pointable must be a finger.
   *
   * @member tool
   * @type {Boolean}
   * @memberof Leap.Pointable.prototype
   */
  this.tool = data.tool;
  /**
   * The estimated width of the tool in millimeters.
   *
   * The reported width is the average width of the visible portion of the
   * tool from the hand to the tip. If the width isn't known,
   * then a value of 0 is returned.
   *
   * Pointable objects representing fingers do not have a width property.
   *
   * @member width
   * @type {number}
   * @memberof Leap.Pointable.prototype
   */
  this.width = data.width;
  /**
   * The direction in which this finger or tool is pointing.
   *
   * The direction is expressed as a unit vector pointing in the same
   * direction as the tip.
   *
   * ![Finger](images/Leap_Finger_Model.png)
   * @member direction
   * @type {number[]}
   * @memberof Leap.Pointable.prototype
   */
  this.direction = data.direction;
  /**
   * The tip position in millimeters from the Leap origin.
   * Stabilized
   *
   * @member stabilizedTipPosition
   * @type {number[]}
   * @memberof Leap.Pointable.prototype
   */
  this.stabilizedTipPosition = data.stabilizedTipPosition;
  /**
   * The tip position in millimeters from the Leap origin.
   *
   * @member tipPosition
   * @type {number[]}
   * @memberof Leap.Pointable.prototype
   */
  this.tipPosition = data.tipPosition;
  /**
   * The rate of change of the tip position in millimeters/second.
   *
   * @member tipVelocity
   * @type {number[]}
   * @memberof Leap.Pointable.prototype
   */
  this.tipVelocity = data.tipVelocity;
  /**
   * The current touch zone of this Pointable object.
   *
   * The Leap Motion software computes the touch zone based on a floating touch
   * plane that adapts to the user's finger movement and hand posture. The Leap
   * Motion software interprets purposeful movements toward this plane as potential touch
   * points. When a Pointable moves close to the adaptive touch plane, it enters the
   * "hovering" zone. When a Pointable reaches or passes through the plane, it enters
   * the "touching" zone.
   *
   * The possible states include:
   *
   * * "none" -- The Pointable is outside the hovering zone.
   * * "hovering" -- The Pointable is close to, but not touching the touch plane.
   * * "touching" -- The Pointable has penetrated the touch plane.
   *
   * The touchDistance value provides a normalized indication of the distance to
   * the touch plane when the Pointable is in the hovering or touching zones.
   *
   * @member touchZone
   * @type {String}
   * @memberof Leap.Pointable.prototype
   */
  this.touchZone = data.touchZone;
  /**
   * A value proportional to the distance between this Pointable object and the
   * adaptive touch plane.
   *
   * ![Touch Distance](images/Leap_Touch_Plane.png)
   *
   * The touch distance is a value in the range [-1, 1]. The value 1.0 indicates the
   * Pointable is at the far edge of the hovering zone. The value 0 indicates the
   * Pointable is just entering the touching zone. A value of -1.0 indicates the
   * Pointable is firmly within the touching zone. Values in between are
   * proportional to the distance from the plane. Thus, the touchDistance of 0.5
   * indicates that the Pointable is halfway into the hovering zone.
   *
   * You can use the touchDistance value to modulate visual feedback given to the
   * user as their fingers close in on a touch target, such as a button.
   *
   * @member touchDistance
   * @type {number}
   * @memberof Leap.Pointable.prototype
   */
  this.touchDistance = data.touchDistance;

  /**
   * How long the pointable has been visible in seconds.
   *
   * @member timeVisible
   * @type {number}
   * @memberof Leap.Pointable.prototype
   */
  this.timeVisible = data.timeVisible;
}

/**
 * A string containing a brief, human readable description of the Pointable
 * object.
 *
 * @method toString
 * @memberof Leap.Pointable.prototype
 * @returns {String} A description of the Pointable object as a string.
 */
Pointable.prototype.toString = function() {
  return "Pointable [ id:" + this.id + " " + this.length + "mmx | width:" + this.width + "mm | direction:" + this.direction + ' ]';
}

/**
 * Returns the hand which the pointable is attached to.
 */
Pointable.prototype.hand = function(){
  return this.frame.hand(this.handId);
}

/**
 * An invalid Pointable object.
 *
 * You can use this Pointable instance in comparisons testing
 * whether a given Pointable instance is valid or invalid. (You can also use the
 * Pointable.valid property.)

 * @static
 * @type {Leap.Pointable}
 * @name Invalid
 * @memberof Leap.Pointable
 */
Pointable.Invalid = { valid: false };
