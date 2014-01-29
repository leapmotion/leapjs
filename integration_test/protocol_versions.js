var WebSocketServer = require('ws').Server,
    Leap = require('../lib');

setTimeout(function() {console.log('Failure, timing out.'); process.exit(1);}, 30000);

downgradeProtocol = function(){
  var controller = new Leap.Controller({port: 9494})
  controller.connect();

  // Once a controller tried to connect, it will always be trying to reconnect. For now we just use two ports.
  var passed = false;

  var expected = ['/v4.json', '/v3.json', '/v2.json', '/v1.json'];

  var wss = new WebSocketServer({port: 9494})
  wss.on('connection', function(ws) {
    if (passed) return;
    console.log("connected to socket with "+ws.upgradeReq.url)
    if (expected.length == 0) {
      if (!passed){
        passed = true;
        // no testing framework here, we manually advance to the next case
        console.log('passed downgradeProtocol');
        saveGoodProtocol();
      }
    } else if (ws.upgradeReq.url == expected[0]) {
      expected.shift();
      ws.close(1001);
    } else {
      console.log("failed downgradeProtocol, expected: "+JSON.stringify(expected[0])+" , got ws.upgradeReq.url:"+ws.upgradeReq.url);
      process.exit(1);
    }
  });
}

saveGoodProtocol = function(){
  var controller = new Leap.Controller({port: 9495});
  controller.connect();

  var wss = new WebSocketServer({port: 9495})
  var origUrl;
  wss.on('connection', function(ws) {
    console.log("connected to socket with "+ws.upgradeReq.url)

    ws.send('{"version": 4}');

    if (origUrl){
      if (origUrl === ws.upgradeReq.url){
        console.log('passed saveGoodProtocol');
        wss.close();
        process.exit(0);
      }else{
        console.log('failed saveGoodProtocol');
        wss.close();
        process.exit(1);
      }
    }
    origUrl = ws.upgradeReq.url;
    ws.close();
  });
}

downgradeProtocol();