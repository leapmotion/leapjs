var Pointable = exports.Pointable = function(data) {
  this.valid = true
  this.id = data.id
  this.length = data.length
  this.tool = data.tool
  this.width = data.width
  this.direction = data.direction
  this.tipPosition = data.tipPosition
  this.tipVelocity = data.tipVelocity
}

Pointable.prototype.toString = function() {
  return "pointable id:" + this.id + " " + this.length + "mmx" + this.width + "mm " + this.direction;
}

Pointable.Invalid = { valid: false }
