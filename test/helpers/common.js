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

var createFrame = exports.createFrame = function(data) {
  return Leap.JSONProtocol(5)(data);
}

var fakeFrame = exports.fakeFrame = function(opts) {
  if (opts === undefined) opts = {};

  handId = 0
  fingerId = 0

  var fingers = opts.pointableData || _(opts.fingers || 0).times(function(n) { return fakeFinger(n) }),
    tools = opts.pointableData || _(opts.tools || 0).times(function(n) { return fakeTool(n) });

  var frame = {
    id: opts.id || ++frameId,
    valid: true,
    timestamp: frameId,
    fingers: fingers,
    tools: tools,
    pointables: fingers.concat(tools),
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
    handIds: [0, 1],
    pointableIds: [4,5,6],
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
    stabilizedPalmPosition: [1,2,3],
    type: 'left',
    grabStrength: 0.5,
    pinchStrength: 0.5,
    confidence: 0.74094,
    fingers: _(opts.hands || 5).times(function() { return fakeFinger() })
  }
}

var fakeTool = exports.fakeTool = function() {
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

var fakeFinger = exports.fakeFinger = function(type) {
  var finger = fakeTool();
  finger.type = type;
  finger.dipPosition = [13, 13, 13];
  finger.pipPosition = [12, 12, 12];
  finger.mcpPosition = [11, 11, 11];
  finger.extended = true;
  return finger;
}


var fakeActualFrame = exports.fakeActualFrame = function(){
  var frameDump = '{"currentFrameRate":110.046,"gestures":[],"hands":[{"confidence":0.789415,"direction":[0.158462,0.627121,-0.762633],"grabStrength":0,"id":410,"palmNormal":[0.116439,-0.778872,-0.61628],"palmPosition":[60.9126,76.8613,36.0687],"palmVelocity":[3.25498,-2.77319,3.25398],"pinchStrength":0,"r":[[0.113258,-0.577876,0.808227],[-0.0837691,0.805011,0.587315],[-0.990028,-0.134223,0.0427661]],"s":1.15718,"sphereCenter":[54.5696,91.5943,0.920909],"sphereRadius":68.9144,"stabilizedPalmPosition":[58.3818,81.7843,32.9256],"t":[57.5602,63.7134,52.0596],"timeVisible":56257.5,"type":"right"}],"id":197377,"interactionBox":{"center":[0,200,0],"size":[235.247,235.247,147.751]},"pointables":[{"dipPosition":[-11.5826,65.0593,14.9045],"direction":[-0.545695,0.302478,-0.781489],"extended":true,"handId":410,"id":4100,"length":51.57,"mcpPosition":[28.3806,43.8226,70.3412],"pipPosition":[5.64499,55.5101,39.5761],"stabilizedTipPosition":[-22.9433,71.2217,-1.08015],"timeVisible":56257.5,"tipPosition":[-22.0341,71.31,-0.960369],"tipVelocity":[5.04347,3.46689,1.45025],"tool":false,"touchDistance":-0.177438,"touchZone":"touching","type":0,"width":18.75},{"dipPosition":[48.808,97.8943,-42.5311],"direction":[0.189785,-0.136463,-0.972296],"extended":true,"handId":410,"id":4101,"length":63.65,"mcpPosition":[38.0774,87.8413,21.1445],"pipPosition":[43.9495,101.388,-17.6403],"stabilizedTipPosition":[49.5451,90.7304,-59.3122],"timeVisible":56257.5,"tipPosition":[52.2109,88.0403,-56.3373],"tipVelocity":[9.16327,10.2824,4.49866],"tool":false,"touchDistance":0.209659,"touchZone":"hovering","type":1,"width":17.91},{"dipPosition":[82.27,98.519,-43.1687],"direction":[0.240974,-0.22168,-0.944875],"extended":true,"handId":410,"id":4102,"length":66.045,"mcpPosition":[62.4541,91.6378,22.3131],"pipPosition":[75.9251,104.356,-18.2901],"stabilizedTipPosition":[82.458,91.7338,-59.7407],"timeVisible":56257.5,"tipPosition":[84.3069,86.8553,-55.9189],"tipVelocity":[1.8102,-25.5031,14.1264],"tool":false,"touchDistance":0.210768,"touchZone":"hovering","type":2,"width":17.59},{"dipPosition":[104.219,100.709,-31.6167],"direction":[0.287859,-0.0803306,-0.954298],"extended":true,"handId":410,"id":4104,"length":63.635,"mcpPosition":[82.2655,89.5215,29.2434],"pipPosition":[96.8355,102.77,-7.13894],"stabilizedTipPosition":[104.576,92.5282,-48.7994],"timeVisible":56257.5,"tipPosition":[107.239,92.6262,-46.6113],"tipVelocity":[12.115,-4.25882,7.09828],"tool":false,"touchDistance":0.167466,"touchZone":"hovering","type":3,"width":16.738},{"dipPosition":[126.282,87.2965,-5.24043],"direction":[0.464892,-0.0265298,-0.88497],"extended":true,"handId":410,"id":4103,"length":50.07,"mcpPosition":[99.059,79.3988,35.2855],"pipPosition":[117.863,87.7769,10.7864],"stabilizedTipPosition":[129.399,82.0949,-21.6027],"timeVisible":56257.5,"tipPosition":[130.909,82.3187,-19.6813],"tipVelocity":[12.3715,7.4338,7.42059],"tool":false,"touchDistance":-0.0523789,"touchZone":"touching","type":4,"width":14.868}],"r":[[0.113258,-0.577876,0.808227],[-0.0837691,0.805011,0.587315],[-0.990028,-0.134223,0.0427661]],"s":1.15718,"t":[57.5602,63.7134,52.0596],"timestamp":56257460689}';
  return new Leap.Frame(JSON.parse(frameDump));
}