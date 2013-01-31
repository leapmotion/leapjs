var UI = exports.UI = { }

// Util functions

UI.fingerDetector = function(fingerCount) {
  return function(frame) {
    return frame.fingers.length == fingerCount
  }
}

// Edge event

var EdgeEvent = UI.EdgeEvent = function(opts) {
  this.top = opts.top
  this.bottom = opts.bottom
  this.left = opts.left
  this.right = opts.right
  if      (this.top && this.left)     this.edgeName = "topLeft"
  else if (this.top && this.right)    this.edgeName = "topRight"
  else if (this.bottom && this.left)  this.edgeName = "bottomLeft"
  else if (this.bottom && this.right) this.edgeName = "bottomRight"
  else if (this.left)                 this.edgeName = "left"
  else if (this.right)                this.edgeName = "right"
  else if (this.top)                  this.edgeName = "top"
  else if (this.bottom)               this.edgeName = "bottom"
}

// UI Box

var Box = UI.Box = function(opts) {
  if (opts === undefined) opts = {}
  this.size = opts.size || 10
}

Box.prototype.translate = function(vec) {
  var x = vec[0] / this.size, y = -vec[1] / this.size, z = vec[2];
  if (x < -1) x = -1;
  if (y < -1) y = -1;
  if (x > 1) x = 1;
  if (y > 1) y = 1;
  return [x, y, z];
}

Box.prototype.mapToDiv = function(vec, div) {
  return [
    Math.round((vec[0] / 2 + 0.5) * div.clientWidth),
    Math.round((vec[1] / 2 + 0.5) * div.clientHeight),
    vec[2]
  ]
}

// UI Cursor

var Cursor = UI.Cursor = function(opts) {
  this.startsOn = opts && opts.startsOn || function(frame) { return frame.pointables.length + frame.hands.length != 0 }
  this.continuesOn = opts && opts.continuesOn || this.startsOn
  this.referenceFrame = null
  this.ttl = null
  this.x = 0
  this.y = 0
}

Cursor.prototype.reportGrab = function(state) {
  if (this.onGrabStart && state === true) {
    this.onGrabStart()
  } else if (this.onGrabEnd && state === false) {
    this.onGrabEnd()
  }
}

Cursor.prototype.update = function(frame) {
  if (this.ttl) {
    // calculate the relative co-ords and report to div
    // nothing to track ...
    if (this.continuesOn(frame)) {
      // there must be something to track
      this.ttl = (new Date()).getTime() + 1000;
      var translation = frame.translation(this.referenceFrame)
      if (this.onMove) this.onMove(translation)
    } else {
      // and kill the cursor here
      if (this.ttl > (new Date()).getTime()) {
        this.ttl = null
        if (this.onEnd) this.onEnd()
      }
    }
  } else {
    if (this.startsOn(frame)) {
      this.ttl = (new Date()).getTime() + 1000;
      this.referenceFrame = frame;
      if (this.onStart) this.onStart()
    }
  }
}

// UI BoxedCursor

var BoxedCursor = UI.BoxedCursor = function(opts) {
  this.cursor = opts && opts.cursor || new Cursor(opts)
  this.box = opts && opts.box || new Box(opts)
  var boxedCursor = this
  this.cursor.onEnd = function() {
    if (boxedCursor.onEnd) boxedCursor.onEnd()
  }

  this.cursor.onStart = function() {
    if (boxedCursor.onStart) boxedCursor.onStart()
  }

  this.cursor.onMove = function(translation) {
    var boxedT = boxedCursor.box.translate(translation)
    if (boxedCursor.onMove) boxedCursor.onMove(boxedT)
    if (boxedCursor.onEdge) {
      if (boxedT[0] == 1 || boxedT[0] == -1 || boxedT[1] == 1 || boxedT[1] == -1) {
        boxedCursor.onEdge(new EdgeEvent({top: boxedT[1] == -1, bottom: boxedT[1] == 1,
          left: boxedT[0] == -1, right: boxedT[0] == 1}))
      }
    }
  }
}

BoxedCursor.prototype.update = function(frame) {
  this.cursor.update(frame)
}
