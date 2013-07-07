var Leap = require('../lib');

setTimeout(function() {
  process.exit(0);
}, Math.floor(Math.random() * 5000));

var controller = new Leap.Controller();

controller.on('connect', function() {
  console.log("connected")
});

controller.on('ready', function() {
  console.log("ready")
  setInterval(function() {
    controller.connection.sendHeartbeat();
  }, 1);
})

controller.loop(function(frame) {
  console.log('.');
});
