var Frame = require('./frame').Frame
  , CircularBuffer = require("./circular_buffer").CircularBuffer
  , Pipeline = require("./pipeline").Pipeline

var Controller = exports.Controller = function(opts) {
  this.listeners = { frame: [], animationFrame: [] }
  this.history = new CircularBuffer(200)
  var controller = this
  this.lastFrame = Frame.Invalid
  this.lastValidFrame = Frame.Invalid
  var connectionType = this.connectionType()
  this.connection = new connectionType({
    host: opts && opts.host,
    frame: function(frame) {
      controller.processFrame(frame)
    }
  })
}

Controller.prototype.inBrowser = function() {
  return typeof(window) !== 'undefined'
}

Controller.prototype.useAnimationLoop = function() {
  return typeof(window) !== 'undefined' && typeof(chrome) === "undefined"
}

Controller.prototype.connectionType = function() {
  return (this.inBrowser() ? require('./connection') : require('./node_connection')).Connection
}

Controller.prototype.connect = function() {
  if (this.connection.connect() && this.inBrowser()) {
    var controller = this
    var callback = function() {
      controller.dispatchEvent('animationFrame', controller.lastFrame)
      window.requestAnimFrame(callback)
    }
    window.requestAnimFrame(callback)
  }
}

Controller.prototype.disconnect = function() {
  this.connection.connect()
}

Controller.prototype.frame = function(num) {
  return this.history.get(num) || Frame.Invalid
}

Controller.prototype.on = function(type, callback) {
  this.listeners[type].push(callback)
}

Controller.prototype.loop = function(callback) {
  if (this.useAnimationLoop()) {
    this.on('animationFrame', callback)
  } else {
    this.on('frame', callback)
  }
  this.connect()
}

Controller.prototype.addStep = function(step) {
  if (!this.pipeline) this.pipeline = new Pipeline(this)
  this.pipeline.addStep(step)
}

Controller.prototype.processFrame = function(frame) {
  if (this.pipeline) {
    var frame = this.pipeline.run(frame)
    if (!frame) frame = Frame.Invalid
  }
  this.processRawFrame(frame)
}

Controller.prototype.processRawFrame = function(frame) {
  frame.controller = this
  this.history.push(frame)
  this.lastFrame = frame
  if (this.lastFrame.valid) this.lastValidFrame = this.lastFrame
  this.historyIdx = (this.historyIdx + 1) % this.historyLength
  this.dispatchEvent('frame', frame)
}

Controller.prototype.dispatchEvent = function(type, e) {
  for (var index = 0, count = this.listeners[type].length; index != count; index++) {
    this.listeners[type][index](e)
  }
}