(function() {
  var Controller = window.Leap.Controller = function(opts) {
    this.opts = opts;
    this.readyListeners = [];
    this.frameListeners = [];
    this.history = [];
    this.historyIdx = 0
    this.historyLength = 200
    this.hasFocus = true
    var _this = this;
    this.connection = new Leap.Connection({
      frame: function(frame) {
        _this.processFrame(frame)
      }
    })
    this.ready = true
    this.dispatchReadyEvent()
  }

  Controller.prototype.dispatchReadyEvent = function() {
    for (var readyIdx = 0, readyCount = this.readyListeners.length; readyIdx != readyCount; readyIdx++) {
      this.readyListeners[readyIdx]();
    }
  }

  Controller.prototype.dispatchFrameEvent = function() {
    for (var frameIdx = 0, frameCount = this.frameListeners.length; frameIdx != frameCount; frameIdx++) {
      this.frameListeners[frameIdx](this);
    }
  }

  Controller.prototype.processFrame = function(frame) {
    this.lastFrame = this.history[this.historyIdx] = new Leap.Frame(frame)
    this.historyIdx = (this.historyIdx + 1) % this.historyLength
    this.dispatchFrameEvent()
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

  Controller.prototype.onFrame = function(handler) {
    this.frameListeners.push(handler);
  }
})();
// window.Leap.Controller.prototype.onConnect = function(handler) {
//   this.connectListeners.push(handler);
// }
// 
// window.Leap.Controller.prototype.onDisconnect = function(handler) {
//   this.disconnectListeners.push(handler);
// }
// window.Leap.Controller.prototype.onExit = function(handler) {
//   this.exitListeners.push(handler);
// }
// window.Leap.Controller.prototype.onInit = function(handler) {
//   this.initListeners.push(handler);
// }
