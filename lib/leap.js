exports.loop = function(callback) {
  var controller = new Leap.Controller()
  controller.onReady(function() {
    var drawCallback = function() {
      callback(controller.lastFrame)
      window.requestAnimFrame(drawCallback)
    };
    window.requestAnimFrame(drawCallback)
  })
  controller.connect()
}
