var Leap = require('../lib/index').Leap;

setTimeout(function() {
  process.exit(0);
}, Math.floor(Math.random() * 5000));

var controller = new Leap.Controller();

controller.on('ready', function() {
  setInterval(function() {
    controller.connection.sendHeartbeat();
  }, 10);
})

controller.loop(function(frame) {
  console.log('.');
});
