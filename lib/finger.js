var Pointable = require('./pointable'),
  Bone = require('./bone')
  , Dialog = require('./dialog')
  , _ = require('underscore');

/**
* Constructs a Finger object.
*
* An uninitialized finger is considered invalid.
* Get valid Finger objects from a Frame or a Hand object.
*
* @class Finger
* @memberof Leap
* @classdesc
* The Finger class reports the physical characteristics of a finger.
*
* Both fingers and tools are classified as Pointable objects. Use the
* Pointable.tool property to determine whether a Pointable object represents a
* tool or finger. The Leap classifies a detected entity as a tool when it is
* thinner, straighter, and longer than a typical finger.
*
* Note that Finger objects can be invalid, which means that they do not
* contain valid tracking data and do not correspond to a physical entity.
* Invalid Finger objects can be the result of asking for a Finger object
* using an ID from an earlier frame when no Finger objects with that ID
* exist in the current frame. A Finger object created from the Finger
* constructor is also invalid. Test for validity with the Pointable.valid
* property.
*/
var Finger = module.exports = function(data) {
  Pointable.call(this, data); // use pointable as super-constructor
  
  /**
  * The position of the distal interphalangeal joint of the finger.
  * This joint is closest to the tip.
  * 
  * The distal interphalangeal joint is located between the most extreme segment
  * of the finger (the distal phalanx) and the middle segment (the medial
  * phalanx).
  *
  * @member dipPosition
  * @type {number[]}
  * @memberof Leap.Finger.prototype
  */  
  this.dipPosition = data.dipPosition;

  /**
  * The position of the proximal interphalangeal joint of the finger. This joint is the middle
  * joint of a finger.
  *
  * The proximal interphalangeal joint is located between the two finger segments
  * closest to the hand (the proximal and the medial phalanges). On a thumb,
  * which lacks an medial phalanx, this joint index identifies the knuckle joint
  * between the proximal phalanx and the metacarpal bone.
  *
  * @member pipPosition
  * @type {number[]}
  * @memberof Leap.Finger.prototype
  */  
  this.pipPosition = data.pipPosition;

  /**
  * The position of the metacarpopophalangeal joint, or knuckle, of the finger.
  *
  * The metacarpopophalangeal joint is located at the base of a finger between
  * the metacarpal bone and the first phalanx. The common name for this joint is
  * the knuckle.
  *
  * On a thumb, which has one less phalanx than a finger, this joint index
  * identifies the thumb joint near the base of the hand, between the carpal
  * and metacarpal bones.
  *
  * @member mcpPosition
  * @type {number[]}
  * @memberof Leap.Finger.prototype
  */  
  this.mcpPosition = data.mcpPosition;

  /**
   * The position of the Carpometacarpal joint
   *
   * This is at the distal end of the wrist, and has no common name.
   *
   */
  this.carpPosition = data.carpPosition;

  /**
  * Whether or not this finger is in an extended posture.
  *
  * A finger is considered extended if it is extended straight from the hand as if
  * pointing. A finger is not extended when it is bent down and curled towards the 
  * palm.
  * @member extended
  * @type {Boolean}
  * @memberof Leap.Finger.prototype
  */
  this.extended = data.extended;

  /**
  * An integer code for the name of this finger.
  * 
  * * 0 -- thumb
  * * 1 -- index finger
  * * 2 -- middle finger
  * * 3 -- ring finger
  * * 4 -- pinky
  *
  * @member type
  * @type {number}
  * @memberof Leap.Finger.prototype
  */
  this.type = data.type;

  this.finger = true;
  
  /**
  * The joint positions of this finger as an array in the order base to tip.
  *
  * @member positions
  * @type {array[]}
  * @memberof Leap.Finger.prototype
  */
  this.positions = [this.carpPosition, this.mcpPosition, this.pipPosition, this.dipPosition, this.tipPosition];

  if (data.bases){
    this.addBones(data);
  } else {
    Dialog.warnBones();
  }

};

_.extend(Finger.prototype, Pointable.prototype);


Finger.prototype.addBones = function(data){
  /**
  * Four bones per finger, from wrist outwards:
  * metacarpal, proximal, medial, and distal.
  *
  * See http://en.wikipedia.org/wiki/Interphalangeal_articulations_of_hand
  */
  this.metacarpal   = new Bone(this, {
    type: 0,
    width: this.width,
    prevJoint: this.carpPosition,
    nextJoint: this.mcpPosition,
    basis: data.bases[0]
  });

  this.proximal     = new Bone(this, {
    type: 1,
    width: this.width,
    prevJoint: this.mcpPosition,
    nextJoint: this.pipPosition,
    basis: data.bases[1]
  });

  this.medial = new Bone(this, {
    type: 2,
    width: this.width,
    prevJoint: this.pipPosition,
    nextJoint: this.dipPosition,
    basis: data.bases[2]
  });

  /**
   * Note that the `distal.nextJoint` position is slightly different from the `finger.tipPosition`.
   * The former is at the very end of the bone, where the latter is the center of a sphere positioned at
   * the tip of the finger.  The btipPosition "bone tip position" is a few mm closer to the wrist than
   * the tipPosition.
   * @type {Bone}
   */
  this.distal       = new Bone(this, {
    type: 3,
    width: this.width,
    prevJoint: this.dipPosition,
    nextJoint: data.btipPosition,
    basis: data.bases[3]
  });

  this.bones = [this.metacarpal, this.proximal, this.medial, this.distal];
};

Finger.prototype.toString = function() {
    return "Finger [ id:" + this.id + " " + this.length + "mmx | width:" + this.width + "mm | direction:" + this.direction + ' ]';
};

Finger.Invalid = { valid: false };
