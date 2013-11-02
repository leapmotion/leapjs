var WebSocketServer = require('ws').Server,
    exec = require('child_process').exec,
    Leap = require('../lib');

var controller = new Leap.Controller({port: 9494});
controller.connect();

setTimeout(function() {process.exit(1);}, 30000);

var expected = ['/v4.json', '/v3.json', '/v2.json', '/v1.json'];

var wss = new WebSocketServer({port: 9494})
wss.on('connection', function(ws) {
  console.log("connected to with "+ws.upgradeReq.url)
  if (expected.length == 0) {
    console.log("passed")
    process.exit(0);
  } else if (ws.upgradeReq.url == expected[0]) {
    expected.shift();
    ws.close(1001);
  } else {
    console.log("failed, expected: "+JSON.stringify(expected)+" ws.upgradeReq.url:"+ws.upgradeReq.url);
    process.exit(1);
  }
});
