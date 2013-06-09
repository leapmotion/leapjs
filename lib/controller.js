var inNode = typeof(window) === 'undefined';

var Frame = require('./frame').Frame
  , CircularBuffer = require("./circular_buffer").CircularBuffer
  , Pipeline = require("./pipeline").Pipeline
  , EventEmitter = require('events').EventEmitter
  , _ = require('underscore');

/**
 * Constructs a Controller object.
 *
 * When creating a Controller object, you may optionally pass in options 
 * to set the host , set the port, enable gestures, or select the frame event type.
 * 
 * ```javascript
 * var controller = new Leap.Controller({
 *   host: '127.0.0.1',
 *   port: 6437,
 *   enableGestures: true,
 *   frameEventName: 'animationFrame'
 * });
 * ```
 *
 * @class Controller
 * @memberof Leap
 * @classdesc
 * The Controller class is your main interface to the Leap Motion Controller.
 * 
 * Create an instance of this Controller class to access frames of tracking data 
 * and configuration information. Frame data can be polled at any time using the 
 * [Controller.frame]{@link Leap.Controller#frame}() function. Call frame() or frame(0) to get the most recent 
 * frame. Set the history parameter to a positive integer to access previous frames. 
 * A controller stores up to 60 frames in its frame history.
 * 
 * Polling is an appropriate strategy for applications which already have an 
 * intrinsic update loop, such as a game.
 */
var Controller = exports.Controller = function(opts) {
  this.opts = _.defaults(opts || {}, {frameEventName: this.useAnimationLoop() ? 'animationFrame' : 'connectionFrame'});
  this.history = new CircularBuffer(200);
  var controller = this;
  this.lastFrame = Frame.Invalid;
  this.lastValidFrame = Frame.Invalid;
  this.lastConnectionFrame = Frame.Invalid;
  var connectionType = this.opts.connectionType || this.connectionType();
  this.connection = new connectionType(this.opts);
  this.accumulatedGestures = [];
  this.connection.on('frame', function(frame) {
    if (frame.gestures) {
      controller.accumulatedGestures = controller.accumulatedGestures.concat(frame.gestures);
    }
    controller.processFrame(frame);
  });
  this.on(this.opts.frameEventName, function(frame) {
    controller.processFinishedFrame(frame);
  });

  // Delegate connection events
  this.connection.on('ready', function() { controller.emit('ready') });
  this.connection.on('connect', function() { controller.emit('connect') });
  this.connection.on('disconnect', function() { controller.emit('disconnect') });
}

Controller.prototype.inBrowser = function() {
  return !inNode;
}

Controller.prototype.useAnimationLoop = function() {
  return this.inBrowser() && typeof(chrome) === "undefined";
}

Controller.prototype.connectionType = function() {
  return (this.inBrowser() ? require('./connection') : require('./node_connection')).Connection;
}

Controller.prototype.connect = function() {
  var controller = this;
  if (this.connection.connect() && this.inBrowser()) {
    var callback = function() {
      controller.emit('animationFrame', controller.lastConnectionFrame);
      if (controller.opts.supressAnimationLoop !== true) window.requestAnimFrame(callback);
    }
    if (controller.opts.supressAnimationLoop !== true) {
      window.requestAnimFrame(callback);
    };
  }
}

Controller.prototype.disconnect = function() {
  this.connection.disconnect();
}

/**
 * Returns a frame of tracking data from the Leap.
 * 
 * Use the optional history parameter to specify which frame to retrieve. 
 * Call frame() or frame(0) to access the most recent frame; call frame(1) to 
 * access the previous frame, and so on. If you use a history value greater 
 * than the number of stored frames, then the controller returns an invalid frame.
 *
 * @method frame
 * @memberof Leap.Controller.prototype
 * @param {Number} history The age of the frame to return, counting backwards from 
 * the most recent frame (0) into the past and up to the maximum age (59).
 * @returns {Leap.Frame} The specified frame; or, if no history 
 * parameter is specified, the newest frame. If a frame is not available at 
 * the specified history position, an invalid Frame is returned.
 */
Controller.prototype.frame = function(num) {
  return this.history.get(num) || Frame.Invalid;
}

Controller.prototype.loop = function(callback) {
  switch (callback.length) {
    case 1:
      this.on(this.opts.frameEventName, callback);
      break;
    case 2:
      var controller = this;
      var scheduler = null;
      var immediateRunnerCallback = function(frame) {
        callback(frame, function() {
          if (controller.lastFrame != frame) {
            immediateRunnerCallback(controller.lastFrame);
          } else {
            controller.once(controller.opts.frameEventName, immediateRunnerCallback);
          }
        });
      }
      this.once(this.opts.frameEventName, immediateRunnerCallback);
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
    frame = this.pipeline.run(frame);
    if (!frame) frame = Frame.Invalid;
  }
  this.lastConnectionFrame = frame;
  this.emit('connectionFrame', frame);
}

Controller.prototype.processFinishedFrame = function(frame) {
  this.lastFrame = frame;
  if (frame.valid) {
    this.lastValidFrame = frame;
  }
  if (frame.gestures) {
    frame.gestures = this.accumulatedGestures;
    this.accumulatedGestures = [];
  }
  frame.controller = this;
  frame.historyIdx = this.history.push(frame);
  this.emit('frame', frame);
}

_.extend(Controller.prototype, EventEmitter.prototype);
