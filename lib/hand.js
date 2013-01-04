(function() {
  var Hand = window.Leap.Hand = function(data) {
    this.id = data.id
    this.valid = true
    this.fingers = []
    for (var fingerIdx = 0, fingerCount = data.fingers.length; fingerIdx != fingerCount; fingerIdx++) {
      this.fingers.push(new window.Leap.Finger(data.fingers[fingerIdx]))
    }
  }

  Hand.prototype.finger = function(id) {
    return (id < 0 || id >= this.fingers.length) ? window.Leap.Finger.Invalid : this.fingers[id]
  }

  Hand.Invalid = { valid: false }
})();

