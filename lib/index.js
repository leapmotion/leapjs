var Controller = require("./controller").Controller
  , Frame = require("./frame").Frame
  , Gesture = require("./gesture").Gesture
  , Hand = require("./hand").Hand
  , Pointable = require("./pointable").Pointable
  , Vector = require("./vector").Vector
  , Matrix = require("./matrix").Matrix
  , Connection = require("./connection").Connection
  , CircularBuffer = require("./circular_buffer").CircularBuffer
  , UI = require("./ui").UI
  , loopController = undefined;

/**
 * Leap is the global namespace of the Leap API.
 * @namespace Leap
 */
exports.Leap = {

  /**
   * The Leap.loop() function passes a frame of Leap data to your
   * callback function and then calls window.requestAnimationFrame() after
   * executing your callback function.
   *
   * Leap.loop() sets up the Leap controller and WebSocket connection for you.
   * You do not need to create your own controller when using this method.
   *
   * Your callback function is called on an interval determined by the client
   * browser. Typically, this is on an interval of 60 frames/second. The most
   * recent frame of Leap data is passed to your callback function. If the Leap
   * is producing frames at a slower rate than the browser frame rate, the same
   * frame of Leap data can be passed to your function in successive animation
   * updates.
   *
   * As an alternative, you can create your own Controller object and use a
   * {@link Controller#onFrame onFrame} callback to process the data at
   * the frame rate of the Leap device. See {@link Controller} for an
   * example.
   *
   * @method Leap.loop
   * @param {function} callback A function called when the browser is ready to
   * draw to the screen. The most recent {@link Frame} object is passed to
   * your callback function.
   * 
   * ```javascript
   *    Leap.loop( function( frame ) {
   *        // ... your code here
   *    })
   * ```
   */
  loop: function(opts, callback) {
    if (callback === undefined) {
      callback = opts;
      opts = {};
    }
    if (!loopController) loopController = new Controller(opts);
    loopController.loop(callback);
  },
  Controller: Controller,
  Frame: Frame,
  Gesture: Gesture,
  Hand: Hand,
  Pointable: Pointable,
  Vector: Vector,
  Matrix: Matrix,
  Connection: Connection,
  CircularBuffer: CircularBuffer,
  UI: UI
}
