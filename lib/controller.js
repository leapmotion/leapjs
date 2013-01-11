var Controller = exports.Controller = function(opts) {
  this.opts = opts;
  this.readyListeners = [];
  this.frameListeners = [];
  this.history = [];
  this.historyIdx = 0
  this.historyLength = 200
  this.hasFocus = true
  var controller = this;
  this.lastFrame = Leap.Frame.Invalid
  this.lastValidFrame = Leap.Frame.Invalid
  this.connection = new Leap.Connection({
    ready: function(version) {
      controller.version = version;
      controller.dispatchReadyEvent();
    },
    frame: function(frame) {
      controller.processFrame(frame)
    }
  })
}

Controller.prototype.connect = function() {
  this.connection.connect();
}

Controller.prototype.frame = function(num) {
  if (!num) num = 0;
  if (num >= this.historyLength) return new Leap.Controller.Frame.Invalid
  var idx = (this.historyIdx - num - 1) % this.historyLength;
  return this.history[idx];
}

Controller.prototype.onReady = function(handler) {
  if (this.ready) {
    handler()
  } else {
    this.readyListeners.push(handler);
  }
}

Controller.prototype.processFrame = function(frame) {
  this.lastFrame = this.history[this.historyIdx] = frame
  // TODO add test for lastValidFrame
  if (this.lastFrame.valid) this.lastValidFrame = this.lastFrame;
  this.historyIdx = (this.historyIdx + 1) % this.historyLength
  this.dispatchFrameEvent()
}

Controller.prototype.onFrame = function(handler) {
  this.frameListeners.push(handler);
}

Controller.prototype.dispatchReadyEvent = function() {
  this.ready = true
  for (var readyIdx = 0, readyCount = this.readyListeners.length; readyIdx != readyCount; readyIdx++) {
    this.readyListeners[readyIdx]();
  }
  this.connection.connect()
}

Controller.prototype.dispatchFrameEvent = function() {
  for (var frameIdx = 0, frameCount = this.frameListeners.length; frameIdx != frameCount; frameIdx++) {
    this.frameListeners[frameIdx](this);
  }
}
