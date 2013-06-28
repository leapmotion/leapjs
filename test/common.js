if (typeof(exports) === 'undefined') {
  exports = {};
}

var fingerId = 0
  , handId = 0
  , frameId =0;

var fakeController = exports.fakeController = function(opts) {
  opts = _.defaults(opts || {}, {supressAnimationLoop: false, frameEventName: "deviceFrame", enableHeartbeat:false, version: 1})
  var controller = new Leap.Controller(opts)
  var connection = controller.connection;

  connection.teardownSocket = function() {
    delete connection.protocol;
    var socket = this.socket;
    setTimeout(function() { socket.close(); }, 10)
    delete connection.socket;
  };

  connection.setupSocket = function() {
    setTimeout(function() { connection.handleOpen() }, 10)
    var socket = {
      messages: [],
      send: function(message) {
        socket.messages.push(message);
      },
      close: function() {
        connection.handleClose();
      }
    };
    connection.on('connect', function() {
      connection.handleData(JSON.stringify({version: opts.version}))
    });
    return socket;
  }

  return controller;
}

var fakeFrame = exports.fakeFrame = function(opts) {
  if (opts === undefined) opts = {};

  handId = 0
  fingerId = 0

  var frame = {
    id: opts.id || ++frameId,
    valid: true,
    timestamp: frameId,
    pointables: _(opts.fingers || 0).times(function() { return fakeFinger() }),
    hands: opts.handData || _(opts.hands || 0).times(function() { return fakeHand() }),
    r: opts.rotation || [[0,1,2], [2,3,4], [2,3,4]],
    t: opts.translation || [1, 2, 3],
  };
  if (opts.gestures) {
    frame.gestures = opts.gestures;
  }
  return frame;
};

var fakeGesture = exports.fakeGesture = function(opts) {
  if (opts === undefined) opts = {
    type:"circle",
    center:[2,3,4],
    normal:[5,6,7],
    progress: 10,
    radius: 20
  };
  return opts;
};

var fakeHand = exports.fakeHand = function(opts) {
  handId++
  return {
    id: handId - 1,
    valid: true,
    palm: [],
    r: (opts && opts.rotation) || [[0,1,2], [2,3,4], [2,3,4]],
    t: (opts && opts.translation) || [1, 2, 3]
  }
}

var fakeFinger = exports.fakeFinger = function() {
  fingerId++
  return {
    id: fingerId - 1,
    length: 5,
    tool: false,
    width: 5,

    tip: {
      direction: [10, 10, 10],
      position: [10, 10, 10],
      direction: [10, 10, 10]
    }
  }
}
