var Frame = require('./frame').Frame
  , CircularBuffer = require("./circular_buffer").CircularBuffer
  , Pipeline = require("./pipeline").Pipeline
  , EventEmitter = require('events').EventEmitter
  , _ = require('underscore');

var Controller = exports.Controller = function(opts) {
  this.history = new CircularBuffer(200);
  var controller = this;
  this.lastFrame = Frame.Invalid;
  this.lastValidFrame = Frame.Invalid;
  this.frameEventName = this.useAnimationLoop() ? 'animationFrame' : 'connectionFrame';
  var connectionType = this.connectionType();
  this.connection = new connectionType(opts);
  this.connection.on('frame', function(frame) {
    controller.processFrame(frame);
  });
  this.on(this.frameEventName, function(frame) {
    controller.processFinishedFrame(frame);
  });

  // Delegate connection events
  this.connection.on('ready', function() { controller.emit('ready') });
  this.connection.on('connect', function() { controller.emit('connect') });
  this.connection.on('disconnect', function() { controller.emit('disconnect') });
}

Controller.prototype.inBrowser = function() {
  return typeof(window) !== 'undefined';
}

Controller.prototype.useAnimationLoop = function() {
  return typeof(window) !== 'undefined' && typeof(chrome) === "undefined";
}

Controller.prototype.connectionType = function() {
  return (this.inBrowser() ? require('./connection') : require('./node_connection')).Connection;
}

Controller.prototype.connect = function() {
  if (this.connection.connect() && this.inBrowser()) {
    var controller = this;
    var callback = function() {
      controller.emit('animationFrame', controller.lastFrame);
      window.requestAnimFrame(callback);
    }
    window.requestAnimFrame(callback);
  }
}

Controller.prototype.disconnect = function() {
  this.connection.disconnect();
}

Controller.prototype.frame = function(num) {
  return this.history.get(num) || Frame.Invalid;
}

Controller.prototype.loop = function(callback) {
  switch (callback.length) {
    case 1:
      this.on(this.frameEventName, callback);
      break;
    case 2:
      var controller = this;
      var scheduler = null;
      var immediateRunnerCallback = function(frame) {
        callback(frame, function() {
          if (controller.lastFrame != frame) {
            immediateRunnerCallback(controller.lastFrame);
          } else {
            controller.once(controller.frameEventName, immediateRunnerCallback);
          }
        });
      }
      this.once(this.frameEventName, immediateRunnerCallback);
      break;
  }
  this.connect();
}

Controller.prototype.addStep = function(step) {
  if (!this.pipeline) this.pipeline = new Pipeline(this);
  this.pipeline.addStep(step);
}

Controller.prototype.processFrame = function(frame) {
  if (this.pipeline) {
    var frame = this.pipeline.run(frame);
    if (!frame) frame = Frame.Invalid;
  }
  this.emit('connectionFrame', frame);
}

Controller.prototype.processFinishedFrame = function(frame) {
  this.lastFrame = frame;
  if (frame.valid) {
    this.lastValidFrame = frame;
  }
  frame.controller = this;
  frame.historyIdx = this.history.push(frame);
  emit('frame', frame);
}

_.extend(Controller.prototype, EventEmitter.prototype);
