var WebSocketServer = require('ws').Server,
    exec = require('child_process').exec;

exec('open '+__dirname+'/client/index.html')

var testServer = function(cb) {
  var wss = new WebSocketServer({port: 9494})
  wss.on('connection', function(ws) {
    wss.close();
    cb();
  });
}

var counter = function() {
  console.log("re-connecting");
  counter.count++;
  if (counter.count >= 10) {
    console.log("test looks good");
    process.exit(0);
  } else {
    setTimeout(function() { testServer(counter) }, 500);
  }
}
counter.count = 0

testServer(counter);