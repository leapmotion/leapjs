var WebSocketServer = require('ws').Server,
    exec = require('child_process').exec,
    Leap = require('../lib');

var controller = new Leap.Controller({port: 9494});
controller.connect();

setTimeout(function() {process.exit(1);}, 30000);

var testServer = function(cb) {
  var wss = new WebSocketServer({port: 9494})
  wss.on('connection', function(ws) {
    setTimeout(function() {
      wss.close();
      cb();
    }, 100)

  });
}

var counter = function() {
  console.log("re-connecting");
  counter.count++;
  if (counter.count >= 6) {
    console.log("test looks good");
    process.exit(0);
  } else {
    setTimeout(function() { testServer(counter) }, 500);
  }
}
counter.count = 0

testServer(counter);