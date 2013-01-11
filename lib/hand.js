var Hand = exports.Hand = function(data) {
  this.id = data.id
  this.palmPosition = data.palmPosition
  this.palmDirection = data.palmDirection
  this.palmVelocity = data.palmVelocity
  this.palmNormal = data.palmNormal
  this.sphereCenter = data.sphereCenter
  this.sphereRadius = data.sphereRadius
  this.valid = true
  this.pointables = []
  this.fingers = []
  this.tools = []
  this._translation = data.t;
  this.rotation = data.r;
  this._scaleFactor = data.s;
  Leap.extend(Hand.prototype, Motion)
}

Hand.prototype.finger = function(id) {
  return (id < 0 || id >= this.fingers.length) ? Leap.Pointable.Invalid : this.fingers[id]
}

Hand.prototype.toString = function() {
  return "Hand [ id: "+ this.id + " data:"+JSON.stringify(this.data)+"] ";
}

Hand.Invalid = { valid: false }
