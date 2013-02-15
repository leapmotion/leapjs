var UI = exports.UI = { }

UI.Cursor = function() {
  return function(frame) {
    var pointable = frame.pointables.sort(function(a, b) { return a[2] - b[2] })[0]
    if (pointable && pointable.valid) {
      frame.cursorPosition = pointable.tipPosition
    }
    return frame
  }
}

UI.Region = function(start, end) {
  this.start = start
  this.end = end
}

UI.Region.prototype.hasPointables = function(frame) {
  for (var i = 0; i != frame.pointables.length; i++) {
    var position = frame.pointables[i].tipPosition
    if (position[0] >= this.start[0] && position[0] <= this.end[0] && position[1] >= this.start[1] && position[1] <= this.end[1] && position[2] >= this.start[2] && position[2] <= this.end[2]) {
      return true
    }
  }
  return false
}

UI.Region.prototype.clipper = function() {
  var region = this
  return function(frame) {
    return region.hasPointables(frame) ? frame : null
  }
}

UI.Region.prototype.normalize = function(position) {
  return [
    (position[0] - this.start[0]) / (this.end[0] - this.start[0]),
    (position[1] - this.start[1]) / (this.end[1] - this.start[1]),
    (position[2] - this.start[2]) / (this.end[2] - this.start[2])
  ]
}

UI.Region.prototype.mapToXY = function(position, width, height) {
  var normalized = this.normalize(position)
  var x = normalized[0], y = normalized[1]
  if (x > 1) x = 1
  else if (x < -1) x = -1
  if (y > 1) y = 1
  else if (y < -1) y = -1
  return [
    (x + 1) / 2 * width,
    (1 - y) / 2 * height,
    normalized[2]
  ]
}
