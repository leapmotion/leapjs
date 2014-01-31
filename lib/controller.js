var Frame = require('./frame')
  , CircularBuffer = require("./circular_buffer")
  , Pipeline = require("./pipeline")
  , EventEmitter = require('events').EventEmitter
  , gestureListener = require('./gesture').gestureListener
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
var Controller = module.exports = function(opts) {
  var inNode = typeof(process) !== 'undefined' && process.title === 'node';

  opts = _.defaults(opts || {}, {
    inNode: inNode
  });

  this.inNode = opts.inNode;

  opts = _.defaults(opts || {}, {
    frameEventName: this.useAnimationLoop() ? 'animationFrame' : 'deviceFrame',
    suppressAnimationLoop: false
  });

  this.suppressAnimationLoop = opts.suppressAnimationLoop;
  this.frameEventName = opts.frameEventName;
  this.history = new CircularBuffer(200);
  this.lastFrame = Frame.Invalid;
  this.lastValidFrame = Frame.Invalid;
  this.lastConnectionFrame = Frame.Invalid;
  this.accumulatedGestures = [];
  if (opts.connectionType === undefined) {
    this.connectionType = (this.inBrowser() ? require('./connection/browser') : require('./connection/node'));
  } else {
    this.connectionType = opts.connectionType;
  }
  this.connection = new this.connectionType(opts);
  this.streamingCount = 0;
  this.deviceList = new Array();
  this.setupConnectionEvents();
}

Controller.prototype.gesture = function(type, cb) {
  var creator = gestureListener(this, type);
  if (cb !== undefined) {
    creator.stop(cb);
  }
  return creator;
}

Controller.prototype.setBackground = function(state) {
  this.connection.setBackground(state);
}

Controller.prototype.inBrowser = function() {
  return !this.inNode;
}

Controller.prototype.useAnimationLoop = function() {
  return this.inBrowser() && typeof(chrome) === "undefined";
}

Controller.prototype.connect = function() {
  var controller = this;
  if (this.connection.connect() && this.inBrowser() && !controller.suppressAnimationLoop) {
    var callback = function() {
      controller.emit('animationFrame', controller.lastConnectionFrame);
      window.requestAnimationFrame(callback);
    }
    window.requestAnimationFrame(callback);
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
 * @param {number} history The age of the frame to return, counting backwards from
 * the most recent frame (0) into the past and up to the maximum age (59).
 * @returns {Leap.Frame} The specified frame; or, if no history
 * parameter is specified, the newest frame. If a frame is not available at
 * the specified history position, an invalid Frame is returned.
 **/
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
  if (frame.gestures) {
    this.accumulatedGestures = this.accumulatedGestures.concat(frame.gestures);
  }
  if (this.pipeline) {
    frame = this.pipeline.run(frame);
    if (!frame) frame = Frame.Invalid;
  }
  this.lastConnectionFrame = frame;
  this.emit('deviceFrame', frame);
}

Controller.prototype.processFinishedFrame = function(frame) {
  this.lastFrame = frame;
  if (frame.valid) {
    this.lastValidFrame = frame;
  }
  frame.controller = this;
  frame.historyIdx = this.history.push(frame);
  if (frame.gestures) {
    frame.gestures = this.accumulatedGestures;
    this.accumulatedGestures = [];
    for (var gestureIdx = 0; gestureIdx != frame.gestures.length; gestureIdx++) {
      this.emit("gesture", frame.gestures[gestureIdx], frame);
    }
  }
  this.emit('frame', frame);
}

/**
  Controller events.  The old 'deviceConnected' and 'deviceDisconnected' have been depricated -
  use 'deviceStreaming' and 'deviceStopped' instead, except in the case of an unexpected disconnect.

  There are 4 pairs of device events recently added/changed:
  -deviceAttached/deviceRemoved - called when a device's physical connection to the computer changes
  -deviceStreaming/deviceStopped - called when a device is paused or resumed.
  -streamingStarted/streamingStopped - called when there is/is no longer at least 1 streaming device.
									  Always comes after deviceStreaming.
  
  The first of all of the above event pairs is triggered as appropriate upon connection.  All of
  these events receives an argument with the most recent info about the device that triggered it.
  These events will always be fired in the order they are listed here, with reverse ordering for the
  matching shutdown call. (ie, deviceStreaming always comes after deviceAttached, and deviceStopped 
  will come before deviceRemoved).
  
  -deviceConnected/deviceDisconnected - These are considered deprecated and will be removed in
  the next revision.  In contrast to the other events and in keeping with it's original behavior,
  it will only be fired when a device begins streaming AFTER a connection has been established.
  It is not paired, and receives no device info.  Nearly identical functionality to
  streamingStarted/Stopped if you need to port.
*/
Controller.prototype.setupConnectionEvents = function() {
  var controller = this;
  this.connection.on('frame', function(frame) {
    controller.processFrame(frame);
  });
  this.on(this.frameEventName, function(frame) {
    controller.processFinishedFrame(frame);
  });

  // Delegate connection events
  this.connection.on('disconnect', function() { controller.emit('disconnect'); });
  this.connection.on('ready', function() { controller.emit('ready'); });
  this.connection.on('connect', function() { controller.emit('connect'); });
  this.connection.on('focus', function() { controller.emit('focus') });
  this.connection.on('blur', function() { controller.emit('blur') });
  this.connection.on('protocol', function(protocol) { controller.emit('protocol', protocol); });
  this.connection.on('deviceEvent', function(evt) {
    var info = evt.state,
        oldInfo = controller.deviceList[info.id];

    //Grab a list of changed properties in the device info
    var changed = {};
    for(var property in info) {
      //If a property i doesn't exist the cache, or has changed...
      if( !oldInfo || !oldInfo.hasOwnProperty(property) || oldInfo[property] != info[property] ) {
        changed[property] = true;
      }
    }

    //Update the device list
    controller.deviceList[info.id] = info;

    //Fire events based on change list
    if(changed.attached) {
      controller.emit(info.attached ? 'deviceAttached' : 'deviceRemoved', info);
    }

    if(!changed.streaming) return;

    if(info.streaming) {
      controller.streamingCount++;
      controller.emit('deviceStreaming', info);
      if( controller.streamingCount == 1 ) {
        controller.emit('streamingStarted', info);
      }
      //if attached & streaming both change to true at the same time, that device was streaming
      //already when we connected.
      if(!changed.attached) {
        controller.emit('deviceConnected');
      }
    }
    //Since when devices are attached all fields have changed, don't send events for streaming being false.
    else if(!(changed.attached && info.attached)) {
      controller.streamingCount--;
      controller.emit('deviceStopped', info);
      if(controller.streamingCount == 0){
        controller.emit('streamingStopped', info);
      }
      controller.emit('deviceDisconnected');
    }

  });
  
  this.on('newListener', function(event,listener) {
    if( event == 'deviceConnected' || event == 'deviceDisconnected' ) {
      console.warn(event + " events are depricated.  Consider using 'streamingStarted/Stopped' or 'deviceStreaming/deviceStopped' instead");
    }
  });
}

_.extend(Controller.prototype, EventEmitter.prototype);
