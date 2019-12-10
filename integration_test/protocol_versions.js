var WebSocketServer = require('ws').Server,
    Leap = require('../lib');


setTimeout(function() {console.log('Failure, timing out.'); process.exit(1);}, 30000);

downgradeProtocol = function(){
  var controller = new Leap.Controller({port: 9494})
  controller.connect();

  // Once a controller tried to connect, it will always be trying to reconnect. For now we just use two ports.
  var passed = false;

  var expected = ['/v6.json', '/v5.json', '/v4.json', '/v3.json', '/v2.json', '/v1.json'];

  var wss = new WebSocketServer({port: 9494})
  // https://github.com/websockets/ws/issues/1114
  // https://github.com/websockets/ws/pull/1099
  wss.on('connection', function(ws, req) {
    ws.upgradeReq = req
    if (passed) return;
    console.log("connected to socket with "+ws.upgradeReq.url)
    if (expected.length == 0) {
      if (!passed){
        passed = true;
        // no testing framework here, we manually advance to the next case
        console.log('PASSED downgradeProtocol');
        saveGoodProtocol();
      }
    } else if (ws.upgradeReq.url == expected[0]) {
      expected.shift();
      // for some reason, the response gets eaten without this.
      setTimeout(function(){ws.close(1001);}, 100)
    } else {
      console.log("FAILED downgradeProtocol, expected: "+JSON.stringify(expected[0])+" , got ws.upgradeReq.url:"+ws.upgradeReq.url);
      process.exit(1);
    }
  });
}

saveGoodProtocol = function(){
  var controller = new Leap.Controller({port: 9495});
  controller.connect();

  var wss = new WebSocketServer({port: 9495})
  var origUrl;
  wss.on('connection', function(ws, req) {
    ws.upgradeReq = req
    console.log("connected to socket with "+ws.upgradeReq.url)

    ws.send('{"version": 4}');

    if (origUrl){
      if (origUrl === ws.upgradeReq.url){
        console.log('PASSED saveGoodProtocol');
        wss.close();
        process.exit(0);
      }else{
        console.log('FAILED saveGoodProtocol');
        wss.close();
        process.exit(1);
      }
    }
    origUrl = ws.upgradeReq.url;
    ws.close();
  });
}


disconnectAfterConnect = function () {
  var controller = new Leap.Controller({port: 9496})
  controller.on('ready', function(){
    console.log('ready - disconnecting');
    controller.disconnect();
    setTimeout(function(){
      console.log('PASSED disconnectAfterConnect');
      downgradeProtocol()
    }, 2000);
  });
  controller.connect();

  var timesConnected = 0;

  var wss = new WebSocketServer({port: 9496})


  wss.on('connection', function (ws, req) {
    ws.upgradeReq = req
    timesConnected++;
    console.log("connected to socket with "+ws.upgradeReq.url)

    if (timesConnected > 1) {
      console.log('FAILED disconnectAfterConnect');
      wss.close();
      process.exit(1);
    }

    ws.send('{"version": 4}');
  });
}

disconnectAfterConnect();
