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
 * {@link Leap.Controller#onFrame onFrame} callback to process the data at
 * the frame rate of the Leap device. See {@link Leap.Controller} for an
 * example.
 *
 * @method Leap.loop
 * @param {function} callback A function called when the browser is ready to
 * draw to the screen. The most recent {@link Leap.Frame} object is passed to
 * your callback function.
 * @example
 *    Leap.loop( function( frame ) {
 *        // ... your code here
 *    })
 */
var loopController = null

exports.loop = function(callback) {
  if (loopController) {
    loopController.connect.disconnect();
    loopController = null
  }

  loopController = new Leap.Controller()
  loopController.onReady(function() {
    var drawCallback = function() {
      callback(loopController.lastFrame)
      window.requestAnimFrame(drawCallback)
    };
    window.requestAnimFrame(drawCallback)
  })
  loopController.connect()
}
