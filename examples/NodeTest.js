var Leap = require('../lib/index').Leap;

var frames = [];

var controller = new Leap.Controller()
controller.on("frame", function(frame) {
  console.log("Frame: " + frame.id + " @ " + frame.timestamp);
  frames.push(frame);
});

controller.on("connect", function(frame) {
  console.log("\nDevice connected\nCollecting data...\n");
  setTimeout(function(){
	var time = frames.length/2;
    console.log("\nRecieved " + frames.length + " frames @ " + time + "fps");
	process.exit();
  }, 2000);
});

controller.on("disconnect", function(frame) {
  console.log("Device not connected");
  process.exit();
});

controller.connect();
console.log("\nWaiting for device to connect...");