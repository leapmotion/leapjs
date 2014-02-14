var Frame = require('./frame')
  , Hand = require('./hand')
  , Pointable = require('./pointable')
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
  var inNode = (typeof(process) !== 'undefined' && process.versions && process.versions.node);

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
  this.useAllPlugins = opts.useAllPlugins || false;
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
  this._pluginPipelineSteps = {};
  this._pluginExtendedMethods = {};
  if (opts.useAllPlugins) this.useRegisteredPlugins();
  this.setupConnectionEvents();
}

Controller.prototype.gesture = function(type, cb) {
  var creator = gestureListener(this, type);
  if (cb !== undefined) {
    creator.stop(cb);
  }
  return creator;
}

/*
 * @returns the controller
 */
Controller.prototype.setBackground = function(state) {
  this.connection.setBackground(state);
  return this;
}

Controller.prototype.inBrowser = function() {
  return !this.inNode;
}

Controller.prototype.useAnimationLoop = function() {
  return this.inBrowser() && typeof(chrome) === "undefined";
}

/*
 * @returns the controller
 */
Controller.prototype.connect = function() {
  var controller = this;
  if (this.connection.connect() && this.inBrowser() && !controller.suppressAnimationLoop) {
    var callback = function() {
      controller.emit('animationFrame', controller.lastConnectionFrame);
      window.requestAnimationFrame(callback);
    }
    window.requestAnimationFrame(callback);
  }
  return this;
}

/*
 * @returns the controller
 */
Controller.prototype.disconnect = function() {
  this.connection.disconnect();
  return this;
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
 */
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
  return this.connect();
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
  // lastConnectionFrame is used by the animation loop
  this.lastConnectionFrame = frame;
  this.emit('deviceFrame', frame);
}

// on a deviceFrame or animationFrame, this emits a 'frame'
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
  this.connection.on('deviceConnect', function(evt) { controller.emit(evt.state ? 'deviceConnected' : 'deviceDisconnected'); });
}


Controller._pluginFactories = {};

/*
 * Registers a plugin, making is accessible to controller.use later on.
 *
 * @member plugin
 * @memberof Leap.Controller.prototype
 * @param {String} name The name of the plugin (usually camelCase).
 * @param {function} factory A factory method which will return an instance of a plugin.
 * The factory receives an optional hash of options, passed in via controller.use.
 *
 * Valid keys for the object include frame, hand, finger, tool, and pointable.  The value
 * of each key can be either a function or an object.  If given a function, that function
 * will be called once for every instance of the object, with that instance injected as an
 * argument.  This allows decoration of objects with additional data:
 *
 * ```javascript
 * Leap.Controller.plugin('testPlugin', function(options){
 *   return {
 *     frame: function(frame){
 *       frame.foo = 'bar';
 *     }
 *   }
 * });
 * ```
 *
 * When hand is used, the callback is called for every hand in `frame.hands`.  Note that
 * hand objects are recreated with every new frame, so that data saved on the hand will not
 * persist.
 *
 * ```javascript
 * Leap.Controller.plugin('testPlugin', function(){
 *   return {
 *     hand: function(hand){
 *       console.log('testPlugin running on hand ' + hand.id);
 *     }
 *   }
 * });
 * ```
 *
 * A factory can return an object to add custom functionality to Frames, Hands, or Pointables.
 * The methods are added directly to the object's prototype.  Finger and Tool cannot be used here, Pointable
 * must be used instead.
 * This is encouraged for calculations which may not be necessary on every frame.
 * Memoization is also encouraged, for cases where the method may be called many times per frame by the application.
 *
 * ```javascript
 * // This plugin allows hand.usefulData() to be called later.
 * Leap.Controller.plugin('testPlugin', function(){
 *   return {
 *     hand: {
 *       usefulData: function(){
 *         console.log('usefulData on hand', this.id);
 *         // memoize the results on to the hand, preventing repeat work:
 *         this.x || this.x = someExpensiveCalculation();
 *         return this.x;
 *       }
 *     }
 *   }
 * });
 *
 * Note that the factory pattern allows encapsulation for every plugin instance.
 *
 * ```javascript
 * Leap.Controller.plugin('testPlugin', function(options){
 *   options || options = {}
 *   options.center || options.center = [0,0,0]
 *
 *   privatePrintingMethod = function(){
 *     console.log('privatePrintingMethod - options', options);
 *   }
 *
 *   return {
 *     pointable: {
 *       publicPrintingMethod: function(){
 *         privatePrintingMethod();
 *       }
 *     }
 *   }
 * });
 *
 */
Controller.plugin = function(pluginName, factory) {
  if (this._pluginFactories[pluginName]) {
    throw "Plugin \"" + pluginName + "\" already registered";
  }
  return this._pluginFactories[pluginName] = factory;
};

/*
 * Returns a list of registered plugins.
 * @returns {Array} Plugin Factories.
 */
Controller.plugins = function() {
  return _.keys(this._pluginFactories);
};

/*
 * Begin using a registered plugin.  The plugin's functionality will be added to all frames
 * returned by the controller (and/or added to the objects within the frame).
 *  - The order of plugin execution inside the loop will match the order in which use is called by the application.
 *  - The plugin be run for both deviceFrames and animationFrames.
 *
 * @method use
 * @memberOf Leap.Controller.prototype
 * @param pluginName
 * @param {Hash} Options to be passed to the plugin's factory.
 * @returns the controller
 */
Controller.prototype.use = function(pluginName, options) {
  var functionOrHash, pluginFactory, key, pluginInstance, klass;

  pluginFactory = (typeof pluginName == 'function') ? pluginName : Controller._pluginFactories[pluginName];

  if (!pluginFactory) {
    throw 'Leap Plugin ' + pluginName + ' not found.';
  }

  options || (options = {});
  pluginInstance = pluginFactory.call(this, options);

  for (key in pluginInstance) {
    functionOrHash = pluginInstance[key];

    if (typeof functionOrHash === 'function') {
      if (!this.pipeline) this.pipeline = new Pipeline(this);
      if (!this._pluginPipelineSteps[pluginName]) this._pluginPipelineSteps[pluginName] = [];

      this._pluginPipelineSteps[pluginName].push( this.pipeline.addWrappedStep(key, functionOrHash) );
    } else {
      if (!this._pluginExtendedMethods[pluginName]) this._pluginExtendedMethods[pluginName] = [];

      switch (key) {
        case 'frame':
          klass = Frame
          break;
        case 'hand':
          klass = Hand
          break;
        case 'pointable':
          klass = Pointable
          break;
        default:
          throw pluginName + ' specifies invalid object type "' + key + '" for prototypical extension'
      }

      _.extend(klass.prototype, functionOrHash);
      _.extend(klass.Invalid, functionOrHash);
      this._pluginExtendedMethods[pluginName].push([klass, functionOrHash])
    }
  }
  return this;
};

/*
 * Stop using a used plugin.  This will remove any of the plugin's pipeline methods (those called on every frame)
 * and remove any methods which extend frame-object prototypes.
 *
 * @method stopUsing
 * @memberOf Leap.Controller.prototype
 * @param pluginName
 * @returns the controller
 */
Controller.prototype.stopUsing = function (pluginName) {
  var steps = this._pluginPipelineSteps[pluginName],
      extMethodHashes = this._pluginExtendedMethods[pluginName],
      i = 0, klass, extMethodHash;

  if (steps) {
    for (i = 0; i < steps.length; i++) {
      this.pipeline.removeStep(steps[i]);
    }
  }

  if (extMethodHashes){
    for (i = 0; i < extMethodHashes.length; i++){
      klass = extMethodHashes[i][0]
      extMethodHash = extMethodHashes[i][1]
      for (var methodName in extMethodHash) {
        delete klass.prototype[methodName]
        delete klass.Invalid[methodName]
      }
    }
  }

  return this;
}

Controller.prototype.useRegisteredPlugins = function(){
  for (var plugin in Controller._pluginFactories){
    this.use(plugin);
  }
}


_.extend(Controller.prototype, EventEmitter.prototype);
