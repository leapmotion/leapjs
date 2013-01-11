var Frame = exports.Frame = function(data) {
  this.valid = true
  this.id = data.id
  this.timestamp = data.timestamp
  this.hands = []
  this.pointables = []
  this.tools = []
  this.fingers = []
  this._translation = data.t;
  this.rotation = data.r;
  this._scaleFactor = data.s;
  var handMap = {}
  for (var handIdx = 0, handCount = data.hands.length; handIdx != handCount; handIdx++) {
    var hand = new window.Leap.Hand(data.hands[handIdx]);
    this.hands.push(hand)
    handMap[hand.id] = handIdx
  }
  for (var pointableIdx = 0, pointableCount = data.pointables.length; pointableIdx != pointableCount; pointableIdx++) {
    var pointable = new window.Leap.Pointable(data.pointables[pointableIdx]);
    this.pointables.push(pointable);
    (pointable.tool ? this.tools : this.fingers).push(pointable);
    if (pointable.handId) {
      var hand = this.hands[handMap[pointable.handId]]
      hand.pointables.push(pointable);
      (pointable.tool ? hand.tools : hand.fingers).push(pointable);
    }
  }
  Leap.extend(Frame.prototype, Motion)
}

Frame.prototype.tool = function(id) {
  return (id < 0 || id >= this.tools.length) ? window.Leap.Pointable.Invalid : this.tools[id]
}

Frame.prototype.pointable = function(id) {
  return (id < 0 || id >= this.pointables.length) ? window.Leap.Pointable.Invalid : this.pointables[id]
}

Frame.prototype.finger = function(id) {
  return (id < 0 || id >= this.fingers.length) ? window.Leap.Pointable.Invalid : this.fingers[id]
}

Frame.prototype.hand = function(id) {
  return (id < 0 || id >= this.hands.length) ? window.Leap.Hand.Invalid : this.hands[id]
}

Frame.prototype.toString = function() {
  return "frame id:"+this.id+" timestamp:"+this.timestamp+" hands("+this.hands.length+") pointables("+this.pointables.length+")"
}

Frame.prototype.dump = function() {
  var out = this.toString();
  out += "\nHands:\n"
  for (var handIdx = 0, handCount = this.hands.length; handIdx != handCount; handIdx++) {
    out += "  "+ this.hands[handIdx].toString() + "\n"
  }
  out += "Pointables:\n"
    for (var pointableIdx = 0, pointableCount = this.pointables.length; pointableIdx != pointableCount; pointableIdx++) {
    out += "  "+ this.pointables[pointableIdx].toString() + "\n"
  }
  out += JSON.stringify(this, undefined, 2)
  return out;
}

Frame.Invalid = {
  valid: false,
  fingers: [],
  pointables: [],
  finger: function() { return window.Leap.Pointable.Invalid },
  hand: function() { return window.Leap.Hand.Invalid },
  toString: function() { return "invalid frame" },
  dump: function() { return this.toString() }
}