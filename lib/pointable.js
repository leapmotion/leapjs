/**
 * Constructs a Pointable object.
 *
 * An uninitialized pointable is considered invalid.
 * Get valid Pointable objects from a Frame or a Hand object.
 *
 * @class Leap.Pointable
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
var Pointable = exports.Pointable = function(data) {
  /**
   * Indicates whether this is a valid Pointable object.
   *
   * @member Leap.Pointable.prototype.valid {Boolean}
   */
  this.valid = true
  /**
   * A unique ID assigned to this Pointable object, whose value remains the
   * same across consecutive frames while the tracked finger or tool remains
   * visible. If tracking is lost (for example, when a finger is occluded by
   * another finger or when it is withdrawn from the Leap field of view), the
   * Leap may assign a new ID when it detects the entity in a future frame.
   *
   * Use the ID value with the pointable() functions defined for the
   * {@link Leap.Frame} and {@link Frame.Hand} classes to find this
   * Pointable object in future frames.
   *
   * @member Leap.Pointable.prototype.id {String}
   */
  this.id = data.id
  this.handId = data.handId
  /**
   * The estimated length of the finger or tool in millimeters.
   *
   * The reported length is the visible length of the finger or tool from the
   * hand to tip. If the length isn't known, then a value of 0 is returned.
   *
   * @member Leap.Pointable.prototype.length {Number}
   */
  this.length = data.length
  /**
   * Whether or not the Pointable is believed to be a tool.
   * Tools are generally longer, thinner, and straighter than fingers.
   *
   * If tool is false, then this Pointable must be a finger.
   *
   * @member Leap.Pointable.prototype.tool {Boolean}
   */
  this.tool = data.tool
  /**
   * The estimated width of the tool in millimeters.
   *
   * The reported width is the average width of the visible portion of the
   * tool from the hand to the tip. If the width isn't known,
   * then a value of 0 is returned.
   *
   * Pointable objects representing fingers do not have a width property.
   *
   * @member Leap.Pointable.prototype.width {Number}
   */
  this.width = data.width
  /**
   * The direction in which this finger or tool is pointing.
   *
   * The direction is expressed as a unit vector pointing in the same
   * direction as the tip.
   *
   * <img src="images/Leap_Finger_Model.png"/>
   * @member Leap.Pointable.prototype.direction {Array: [x,y,z]}
   */
  this.direction = data.direction
  /**
   * The tip position in millimeters from the Leap origin.
   *
   * @member Leap.Pointable.prototype.tipPosition {Array: [x,y,z]}
   */
  this.tipPosition = data.tipPosition
  /**
   * The rate of change of the tip position in millimeters/second.
   *
   * @member Leap.Pointable.prototype.tipVelocity {Array: [Vx,Vy,Vz]}
   */
  this.tipVelocity = data.tipVelocity
  this._translation = data.tipPosition
}

/**
 * A string containing a brief, human readable description of the Pointable
 * object.
 *
 * @method Leap.Pointable.prototype.toString
 * @returns {String} A description of the Pointable object as a string.
 */
Pointable.prototype.toString = function() {
  if(this.tool == true){
    return "Pointable [ id:" + this.id + " " + this.length + "mmx | with:" + this.width + "mm | direction:" + this.direction + ' ]';
  } else {
    return "Pointable [ id:" + this.id + " " + this.length + "mmx | direction: " + this.direction + ' ]';
  }
}

Pointable.prototype.translation = Motion.translation;

/**
 * An invalid Pointable object.
 *
 * You can use this Pointable instance in comparisons testing
 * whether a given Pointable instance is valid or invalid. (You can also use the
 * Pointable.valid property.)

 * @constant
 * @type {Leap.Pointable}
 * @name Leap.Pointable.Invalid
 */
Pointable.Invalid = { valid: false }
