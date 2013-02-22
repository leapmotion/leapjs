var EventEmitter = require('events').EventEmitter
  , extend = require('../util').extend

var Region = exports.Region = function(start, end) {
  this.start = start
  this.end = end
  this.enteredFrame = null
}

Region.prototype.hasPointables = function(frame) {
  for (var i = 0; i != frame.pointables.length; i++) {
    var position = frame.pointables[i].tipPosition
    if (position[0] >= this.start[0] && position[0] <= this.end[0] && position[1] >= this.start[1] && position[1] <= this.end[1] && position[2] >= this.start[2] && position[2] <= this.end[2]) {
      return true
    }
  }
  return false
}

Region.prototype.listener = function(opts) {
  var region = this
  if (opts && opts.nearThreshold) this.setupNearRegion(opts.nearThreshold)
  return function(frame) {
    return region.updatePosition(frame)
  }
}

Region.prototype.clipper = function() {
  var region = this
  return function(frame) {
    region.updatePosition(frame)
    return region.enteredFrame ? frame : null
  }
}

Region.prototype.setupNearRegion = function(distance) {
  var nearRegion = this.nearRegion = new Region(
    [this.start[0] - distance, this.start[1] - distance, this.start[2] - distance],
    [this.end[0] + distance, this.end[1] + distance, this.end[2] + distance]
  )
  var region = this
  nearRegion.on("enter", function(frame) {
    region.emit("near", frame)
  })
  nearRegion.on("exit", function(frame) {
    region.emit("far", frame)
  })
  region.on('exit', function(frame) {
    region.emit("near", frame)
  })
}

Region.prototype.updatePosition = function(frame) {
  if (this.nearRegion) this.nearRegion.updatePosition(frame)
  if (this.hasPointables(frame) && this.enteredFrame == null) {
    this.enteredFrame = frame
    this.emit("enter", this.enteredFrame)
  } else if (!this.hasPointables(frame) && this.enteredFrame != null) {
    this.enteredFrame = null
    this.emit("exit", this.enteredFrame)
  }
  return frame
}

Region.prototype.normalize = function(position) {
  return [
    (position[0] - this.start[0]) / (this.end[0] - this.start[0]),
    (position[1] - this.start[1]) / (this.end[1] - this.start[1]),
    (position[2] - this.start[2]) / (this.end[2] - this.start[2])
  ]
}

Region.prototype.mapToXY = function(position, width, height) {
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

extend(Region.prototype, EventEmitter.prototype)