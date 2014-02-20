require("./_header")
/**
 * Leap is the global namespace of the Leap API.
 * @namespace Leap
 */
module.exports = {
  Controller: require("./controller"),
  Frame: require("./frame"),
  Gesture: require("./gesture"),
  Hand: require("./hand"),
  Pointable: require("./pointable"),
  InteractionBox: require("./interaction_box"),
  CircularBuffer: require("./circular_buffer"),
  UI: require("./ui"),
  glMatrix: require("gl-matrix"),
  mat3: require("gl-matrix").mat3,
  vec3: require("gl-matrix").vec3,
  loopController: undefined,
  version: require('./version.js'),
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
    opts.useAllPlugins || (opts.useAllPlugins = true)
    if (!this.loopController) this.loopController = new this.Controller(opts);
    this.loopController.loop(callback);
    return this.loopController;
  },

  /*
   * Convenience method for Leap.Controller.plugin
   */
  plugin: function(name, options){
    this.Controller.plugin(name, options)
  },

    _jsonify: function(object, properties){
        var out = {};

        if (_.isArray(object)) {
            out = _.map(object, Leap._jsonify);
        } else if (!_.isObject(object)) {
            out = object;
        } else if (object.toJSON && ! properties) {
            out = object.toJSON();
        } else {
            if (!properties) {
                properties = _.keys(object);
            }
            if (!_.isArray(properties)){
                throw new Error('bad properties ');
            }
            properties.forEach(function (field) {
                if (!object.hasOwnProperty(field)) {
                    return;
                }
                var value = object[field];
                if (_.isArray(value)) {
                    out[field] = value.map(function(obj){
                        return Leap._jsonify(obj);
                    });
                } else if (_.isNumber(value) || _.isString(value)) {
                    out[field] = value;
                } else if (_.isObject(value)) {
                    out[field] = value.toJSON ? value.toJSON() : Leap._jsonify(value);
                } else {
                    out[field] = value;
                }
            }, this);
        }

        return out;

    }
}