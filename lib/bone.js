var Pointable = require('./pointable'),
  vec3 = require("gl-matrix").vec3
  , _ = require('underscore');


var Bone = module.exports = function(data) {
  /**
  * An integer code for the name of this bone.
  *
  * * 0 -- metacarpal
  * * 1 -- proximal
  * * 2 -- intermediate
  * * 3 -- distal
  *
  * @member type
  * @type {number}
  * @memberof Leap.Bone.prototype
  */
  this.type = data.type;

  /**
   * The position of the previous, or base joint of the bone closer to the wrist.
   * @type {vector3}
   */
  this.prevJoint = data.prevJoint;

  /**
   * The position of the next joint, or the end of the bone closer to the finger tip.
   * @type {vector3}
   */
  this.nextJoint = data.nextJoint;

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

  var displacement = new Array(3);
  vec3.sub(displacement, data.nextJoint, data.prevJoint);

  this.length = vec3.length(displacement);


  /**
   *
   * These fully-specify the orientation of the bone.
   * Three vec3s: direction, normal, and cross.
   * Normalized.
   *
   */
  this.bases = data.bases;
};

Bone.prototype.center = function(){
  var center = vec3.create();
  vec3.lerp(center, this.prevJoint, this.nextJoint, 0.5);
  return center;
};

Bone.prototype.direction = function(){
  return this.bases[0];
};
