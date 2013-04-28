var Cursor = exports.Cursor = function() {
  return function(frame) {
    var pointable = frame.pointables.sort(function(a, b) { return a.z - b.z })[0]
    if (pointable && pointable.valid) {
      frame.cursorPosition = pointable.tipPosition
    }
    return frame
  }
}
