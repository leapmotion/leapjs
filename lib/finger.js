(function() {
  var Finger = window.Leap.Finger = function(data) {
    this.valid = true
    this.id = data.id
    this.length = data.length
    this.tool = data.tool
    this.width = data.width
    this.direction = data.tip.direction
    this.tipPosition = data.tip.position
    this.tipVelocity = data.tip.velocity
  }

  Finger.Invalid = { valid: false }
})();
