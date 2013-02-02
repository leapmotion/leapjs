/**
 * Constructs a Controller object.
 * @class Leap.Controller
 * @classdesc
 * The Controller object manages the connection to the Leap. Depending on how
 * you use the LeapJS library, you may or may not interact with a controller
 * object directly.
 *
 * You can get the most recent frame of Leap data from a Controller object at
 * any time with the frame() method. If your application has a natural fame
 * rate, an efficient strategy is to call the frame() method during your
 * application's update loop. (This is the strategy used by the Leap.loop()
 * mechanism.)
 *
 * **Using an implicit Controller**
 *
 * If you use the {@link Leap.loop}() mechanism, a Controller is created for
 * you in the background.
 * ```javascript
 *    Leap.loop( function( frame ) {
 *        // ... your code here
 *    })
 * ```
 * The loop function creates the controller, establishes the
 * connection to the Leap application and calls your handler function on the
 * browser's animation interval (using window.requestAnimationFrame()).
 *
 * **Using an explicit Controller**
 * If you don't use Leap.loop, create and connect your own Controller as
 * follows:
 *
 * 1. Create a Controller object: var controller = new Leap.Controller()
 * 2. Optionally, add callback functions:
 *
 *    * onReady handlers are called when the controller is connected.
 *    * onFrame handlers are called when a new Frame is available.
 *
 *    Note that the Leap frame rate can exceed 200 frames per second, depending
 *    on the operating mode of the Leap application. Take care when using the
 *    onFrame handler mechanism to avoid taking too much processing time away
 *    from other parts of your application.
 * 3. Call the Controller connect() method.
 * 4. If you are not using onFrame handlers, call Controller.frame() whenever
 *    your application is ready to process a set of Leap tracking data (for
 *    example, in the update handler of an animation loop).
 *
 * @example
 *    var controller = new Leap.Controller();
 *    controller.onFrame(function() {
 *        console.log("hello")
 *        console.log(controller.frame().id)
 *        console.log(controller.frame().fingers.length)
 *        console.log(controller.frame().finger(0))
 *    })
 *    controller.connect()
 */
var Controller = exports.Controller = function(opts) {
  this.readyListeners = [];
  this.frameListeners = [];
  this.history = [];
  this.historyIdx = 0
  this.historyLength = 200
  this.hasFocus = true
  var controller = this
  this.lastFrame = Leap.Frame.Invalid
  this.lastValidFrame = Leap.Frame.Invalid
  this.connection = new Leap.Connection({
    host: opts && opts.host,
    ready: function(version) {
      controller.version = version;
      controller.dispatchReadyEvent();
    },
    frame: function(frame) {
      controller.processFrame(frame)
    }
  })
}

/**
 * Connects to the Leap application through a WebSocket connection.
 *
 * When the connection is successful, the controller invokes any queued
 * onReady handlers.
 *
 * @method Leap.Controller.prototype.connect
 */
Controller.prototype.connect = function() {
  this.connection.connect();
}

/**
 * Returns a frame of tracking data from the Leap. Use the optional
 * history parameter to specify which frame to retrieve. Call frame() or
 * frame(0) to access the most recent frame; call frame(1) to access the
 * previous frame, and so on. If you use a history value greater than the
 * number of stored frames, then the controller returns an invalid frame.
 *
 * @method Leap.Controller.prototype.frame
 * @param {Integer} num The age of the frame to return, counting backwards from
 * the most recent frame (0) into the past and up to the maximum age (59).
 * @returns {Frame} The specified frame; or, if no history parameter is specified,
 * the newest frame. If a frame is not available at the specified history
 * position, an invalid Frame is returned.
 */
Controller.prototype.frame = function(num) {
  if (!num) num = 0;
  if (num >= this.historyLength) return new Leap.Controller.Frame.Invalid
  var idx = (this.historyIdx - num - 1 + this.historyLength) % this.historyLength;
  return this.history[idx];
}

/**
 * Assigns a handler function to be called when the Controller object connects
 * to the Leap software. The handler is called immediately if the controller is
 * already connected. Otherwise, the handler function is put in a queue to
 * be called later.
 *
 * @method Leap.Controller.prototype.onReady
 * @param {function} handler A function to be called when the controller is ready.
 */
Controller.prototype.onReady = function(handler) {
  if (this.ready) {
    handler()
  } else {
    this.readyListeners.push(handler);
  }
}

/**
 * Assigns a handler function to be called when the Controller object receives
 * a frame from the Leap software. Every assigned handler function is pushed
 * into a queue and called for each frame. Removing handlers from the queue is
 * not supported.
 *
 * @method Leap.Controller.prototype.onFrame
 * @param {function} handler A function to be called for each frame of Leap data.
 */
Controller.prototype.onFrame = function(handler) {
  this.frameListeners.push(handler);
}

/**
 * For internal use.
 * @private
 */
Controller.prototype.processFrame = function(frame) {
  frame.controller = this
  this.lastFrame = this.history[this.historyIdx] = frame
  // TODO add test for lastValidFrame
  if (this.lastFrame.valid) this.lastValidFrame = this.lastFrame
  this.historyIdx = (this.historyIdx + 1) % this.historyLength
  this.dispatchFrameEvent()
}

/**
 * For internal use.
 * @private
 */
Controller.prototype.dispatchReadyEvent = function() {
  this.ready = true
  for (var readyIdx = 0, readyCount = this.readyListeners.length; readyIdx != readyCount; readyIdx++) {
    this.readyListeners[readyIdx]();
  }
  this.connection.connect()
}

/**
 * For internal use.
 * @private
 */
Controller.prototype.dispatchFrameEvent = function() {
  for (var frameIdx = 0, frameCount = this.frameListeners.length; frameIdx != frameCount; frameIdx++) {
    this.frameListeners[frameIdx](this);
  }
}
