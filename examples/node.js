require('../template/entry');

var controller = new Leap.Controller()
controller.on("frame", function(frame) {
  console.log("Frame: " + frame.id + " @ " + frame.timestamp);
});

var frameCount = 0;
controller.on("frame", function(frame) {
  frameCount++;
});

setInterval(function() {
  var time = frameCount/2;
  console.log("received " + frameCount + " frames @ " + time + "fps");
  frameCount = 0;
}, 2000);

controller.on('ready', function() {
    console.log("ready");
});
controller.on('connect', function() {
    console.log("connect");
});
controller.on('disconnect', function() {
    console.log("disconnect");
});
controller.on('focus', function() {
    console.log("focus");
});
controller.on('blur', function() {
    console.log("blur");
});
controller.on('deviceConnected', function() {
    console.log("deviceConnected");
});
controller.on('deviceDisconnected', function() {
    console.log("deviceDisconnected");
});

controller.connect();
console.log("\nWaiting for device to connect...");
