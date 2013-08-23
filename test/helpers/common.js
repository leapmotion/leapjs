if (typeof(exports) === 'undefined') {
  exports = {};
}

if (typeof(window) !== 'undefined') {
  window.requestAnimationFrame = function(callback) { setTimeout(callback, 1000 / 60); };
}

var fingerId = 0
  , handId = 0
  , frameId =0
  , lastGestureState = false;

var fakeController = exports.fakeController = function(opts) {
  opts = _.defaults(opts || {}, {suppressAnimationLoop: false, frameEventName: "deviceFrame", enableHeartbeat:false, version: 1})
  var controller = new Leap.Controller(opts)
  var connection = controller.connection;

  lastGestureState = opts.enableGestures;

  connection.setupSocket = function() {
    setTimeout(function() { connection.handleOpen() }, 1)
    var socket = {
      messages: [],
      send: function(message) {
        socket.messages.push(message);
      },
      close: function() { }
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
    interactionBox: {center: [1,2,3], size: [1,2,3]},
    currentFrameRate: 10
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
  if (opts === undefined) opts = {};
  handId++
  return {
    id: handId - 1,
    valid: true,
    palmPosition: [1,2,3],
    direction: [1,2,3],
    palmVelocity: [1,2,3],
    palmNormal: [1,2,3],
    sphereCenter:[1,2,3],
    r: (opts && opts.rotation) || [[0,1,2], [2,3,4], [2,3,4]],
    t: (opts && opts.translation) || [1, 2, 3],
    timeVisible: 10,
    stabilizedPalmPosition: [1,2,3]
  }
}

var fakeFinger = exports.fakeFinger = function() {
  fingerId++
  return {
    id: fingerId - 1,
    handId: 0,
    length: 5,
    tool: false,
    width: 5,
    direction: [10, 10, 10],
    tipPosition: [10, 10, 10],
    stabilizedTipPosition: [10, 10, 10],
    tipVelocity: [10, 10, 10],
    touchZone: "none",
    touchDistance: 5,
    timeVisible: 10
  }
}
