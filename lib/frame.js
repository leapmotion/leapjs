(function() {
  var Frame = window.Leap.Frame = function(data) {
    this.valid = true
    this.id = data.id
    this.timestamp = data.timestamp
    this.hands = []
    this.fingers = []
    for (var handIdx = 0, handCount = data.hands.length; handIdx != handCount; handIdx++) {
      var hand = new window.Leap.Hand(data.hands[handIdx]);
      this.hands.push(hand)
      for (var fingerIdx = 0, fingerCount = hand.fingers.length; fingerIdx != fingerCount; fingerIdx++) {
        this.fingers.push(hand.fingers[fingerIdx])
      }
    }
  }

  Frame.prototype.finger = function(id) {
    return (id < 0 || id >= this.fingers.length) ? window.Leap.Finger.Invalid : this.fingers[id]
  }

  Frame.prototype.hand = function(id) {
    return (id < 0 || id >= this.hands.length) ? window.Leap.Hand.Invalid : this.hands[id]
  }

  Frame.Invalid = {
    valid: false,
    fingers: [],
    hands: [],
    finger: function() { return window.Leap.Finger.Invalid },
    hand: function() { return window.Leap.Hand.Invalid }
  }
})();
