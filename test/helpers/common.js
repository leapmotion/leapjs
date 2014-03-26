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
  opts = _.defaults(opts || {}, {frameEventName: "deviceFrame", version: 4})
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

var fakePluginFactory = exports.fakePluginFactory = function (returning) {
  returning || (returning = {
      frame: function (frame) {}
  })
  return function(){
    return returning
  }
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
    tools: [],
    fingers: [],
    hands: opts.handData || _(opts.hands || 0).times(function() { return fakeHand() }),
    r: opts.rotation || [[0,1,2], [2,3,4], [2,3,4]],
    t: opts.translation || [1, 2, 3],
    interactionBox: {center: [1,2,3], size: [1,2,3]},
    currentFrameRate: 10
  };
  for (var i = 0; i != frame.pointables.length; i++) {
    (frame.pointables[i].tool ? frame.tools : frame.fingers).push(frame.pointables[i]);
  }

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
  handId++;

  var tools = [];
  var fingers = [];
  var numFingers = Math.random() * 6
  var numTools = Math.random() * 3;
  for (var i = 0; i <= numTools; ++i) {
        tools.push(fakeTool());
  }
  for (var f = 0; f < numFingers; ++f) {
        fingers.push(fakeFinger());
  }
  fingers = fingers.slice(0, 5);
  return {
    id: handId - 1,
    valid: true,
    palmPosition: [1,2,3],
    direction: [1, 0, 0],
    palmDirection: [0, 1, 0],
    palmVelocity: [1,2,3],
    palmNormal: [1,0, 0],
    sphereCenter:[1,2,3],
    pointables: tools.concat(fingers),
    tools: tools,
    fingers: fingers,
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
        direction: [1, 0, 0],
        tipPosition: [10, 10, 10],
        stabilizedTipPosition: [10, 10, 10],
        tipVelocity: [10, 10, 10],
        touchZone: "none",
        touchDistance: 5,
        timeVisible: 10
    }
}

var fakeTool = exports.fakeTool = function() {
    fingerId++
    return {
        id: fingerId - 1,
        handId: 0,
        length: 5,
        tool: true,
        width: 5,
        direction: [1, 0, 0],
        tipPosition: [10, 10, 10],
        stabilizedTipPosition: [10, 10, 10],
        tipVelocity: [10, 10, 10],
        touchZone: "none",
        touchDistance: 5,
        timeVisible: 10
    }
}
