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
  opts = _.defaults(opts || {}, {frameEventName: "deviceFrame", version: 6});
  var controller = new Leap.Controller(opts);
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
  finger.carpPosition = [10.1, 10.1, 10.1];
  finger.mcpPosition =  [11, 11, 11];
  finger.pipPosition =  [12, 12, 12];
  finger.dipPosition =  [13, 13, 13];
  finger.btipPosition = [14, 14, 14];
  finger.extended = true;
  finger.bases = [
          [
            [
              0.346327,
              0.789873,
              0.50612
            ],
            [
              -0.937462,
              0.271288,
              0.218102
            ],
            [
              0.0349685,
              -0.550003,
              0.83443
            ]
          ],
          [
            [
              0.330638,
              0.889895,
              0.31427
            ],
            [
              -0.908056,
              0.209249,
              0.362834
            ],
            [
              0.257124,
              -0.405342,
              0.87726
            ]
          ],
          [
            [
              0.330638,
              0.889895,
              0.31427
            ],
            [
              -0.856128,
              0.14269,
              0.496673
            ],
            [
              0.397144,
              -0.433274,
              0.809043
            ]
          ],
          [
            [
              0.330638,
              0.889895,
              0.31427
            ],
            [
              -0.782763,
              0.0725576,
              0.618075
            ],
            [
              0.527219,
              -0.450358,
              0.720567
            ]
          ]
        ];
  return finger;
}


var fakeActualFrame = exports.fakeActualFrame = function(){
//  var frameDump = '{"currentFrameRate":110.046,"gestures":[],"hands":[{"confidence":0.789415,"direction":[0.158462,0.627121,-0.762633],"grabStrength":0,"id":410,"palmNormal":[0.116439,-0.778872,-0.61628],"palmPosition":[60.9126,76.8613,36.0687],"palmVelocity":[3.25498,-2.77319,3.25398],"pinchStrength":0,"r":[[0.113258,-0.577876,0.808227],[-0.0837691,0.805011,0.587315],[-0.990028,-0.134223,0.0427661]],"s":1.15718,"sphereCenter":[54.5696,91.5943,0.920909],"sphereRadius":68.9144,"stabilizedPalmPosition":[58.3818,81.7843,32.9256],"t":[57.5602,63.7134,52.0596],"timeVisible":56257.5,"type":"right"}],"id":197377,"interactionBox":{"center":[0,200,0],"size":[235.247,235.247,147.751]},"pointables":[{"dipPosition":[-11.5826,65.0593,14.9045],"direction":[-0.545695,0.302478,-0.781489],"extended":true,"handId":410,"id":4100,"length":51.57,"mcpPosition":[28.3806,43.8226,70.3412],"pipPosition":[5.64499,55.5101,39.5761],"stabilizedTipPosition":[-22.9433,71.2217,-1.08015],"timeVisible":56257.5,"tipPosition":[-22.0341,71.31,-0.960369],"tipVelocity":[5.04347,3.46689,1.45025],"tool":false,"touchDistance":-0.177438,"touchZone":"touching","type":0,"width":18.75},{"dipPosition":[48.808,97.8943,-42.5311],"direction":[0.189785,-0.136463,-0.972296],"extended":true,"handId":410,"id":4101,"length":63.65,"mcpPosition":[38.0774,87.8413,21.1445],"pipPosition":[43.9495,101.388,-17.6403],"stabilizedTipPosition":[49.5451,90.7304,-59.3122],"timeVisible":56257.5,"tipPosition":[52.2109,88.0403,-56.3373],"tipVelocity":[9.16327,10.2824,4.49866],"tool":false,"touchDistance":0.209659,"touchZone":"hovering","type":1,"width":17.91},{"dipPosition":[82.27,98.519,-43.1687],"direction":[0.240974,-0.22168,-0.944875],"extended":true,"handId":410,"id":4102,"length":66.045,"mcpPosition":[62.4541,91.6378,22.3131],"pipPosition":[75.9251,104.356,-18.2901],"stabilizedTipPosition":[82.458,91.7338,-59.7407],"timeVisible":56257.5,"tipPosition":[84.3069,86.8553,-55.9189],"tipVelocity":[1.8102,-25.5031,14.1264],"tool":false,"touchDistance":0.210768,"touchZone":"hovering","type":2,"width":17.59},{"dipPosition":[104.219,100.709,-31.6167],"direction":[0.287859,-0.0803306,-0.954298],"extended":true,"handId":410,"id":4104,"length":63.635,"mcpPosition":[82.2655,89.5215,29.2434],"pipPosition":[96.8355,102.77,-7.13894],"stabilizedTipPosition":[104.576,92.5282,-48.7994],"timeVisible":56257.5,"tipPosition":[107.239,92.6262,-46.6113],"tipVelocity":[12.115,-4.25882,7.09828],"tool":false,"touchDistance":0.167466,"touchZone":"hovering","type":3,"width":16.738},{"dipPosition":[126.282,87.2965,-5.24043],"direction":[0.464892,-0.0265298,-0.88497],"extended":true,"handId":410,"id":4103,"length":50.07,"mcpPosition":[99.059,79.3988,35.2855],"pipPosition":[117.863,87.7769,10.7864],"stabilizedTipPosition":[129.399,82.0949,-21.6027],"timeVisible":56257.5,"tipPosition":[130.909,82.3187,-19.6813],"tipVelocity":[12.3715,7.4338,7.42059],"tool":false,"touchDistance":-0.0523789,"touchZone":"touching","type":4,"width":14.868}],"r":[[0.113258,-0.577876,0.808227],[-0.0837691,0.805011,0.587315],[-0.990028,-0.134223,0.0427661]],"s":1.15718,"t":[57.5602,63.7134,52.0596],"timestamp":56257460689}';
  var frameDump = '{ "currentFrameRate": 110.747, "gestures": [], "hands": [ { "confidence": 1, "direction": [ 0.490721, 0.425143, -0.760557 ], "grabStrength": 0, "id": 1, "palmNormal": [ 0.141838, -0.900216, -0.411695 ], "palmPosition": [ 47.033, 113.621, 102.153 ], "palmVelocity": [ -3.30303, 5.60355, 1.47788 ], "palmWidth": 92.4988, "pinchStrength": 0, "r": [ [ 0.584034, 0.313747, -0.748643 ], [ 0.0202196, 0.916373, 0.399814 ], [ 0.811477, -0.248642, 0.528849 ] ], "s": 1.42457, "sphereCenter": [ 64.9106, 183.062, 85.421 ], "sphereRadius": 81.7923, "stabilizedPalmPosition": [ 43.7677, 112.357, 87.4045 ], "t": [ 47.0678, 113.56, 102.138 ], "timeVisible": 810.321, "type": "right" } ], "id": 13319, "interactionBox": { "center": [ 0, 200, 0 ], "size": [ 235.247, 235.247, 147.751 ] }, "pointables": [ { "bases": [ [ [ 0.314831, 0.85025, 0.421848 ], [ -0.94682, 0.312444, 0.0768821 ], [ -0.0664349, -0.423619, 0.903401 ] ], [ [ 0.321292, 0.905114, 0.278459 ], [ -0.916178, 0.222714, 0.333191 ], [ 0.239559, -0.362169, 0.900802 ] ], [ [ 0.321292, 0.905114, 0.278459 ], [ -0.842096, 0.138569, 0.521222 ], [ 0.43318, -0.401954, 0.806715 ] ], [ [ 0.321292, 0.905114, 0.278459 ], [ -0.727658, 0.0477828, 0.684274 ], [ 0.606041, -0.422475, 0.673966 ] ] ], "btipPosition": [ -40.5204, 127.235, 43.4704 ], "carpPosition": [ 1.06923, 84.8729, 133.178 ], "dipPosition": [ -26.1017, 117.183, 59.5051 ], "direction": [ -0.43318, 0.401954, -0.806715 ], "extended": true, "handId": 1, "id": 10, "length": 52.9806, "mcpPosition": [ 1.06923, 84.8729, 133.178 ], "pipPosition": [ -11.0873, 103.251, 87.4667 ], "stabilizedTipPosition": [ -42.7656, 121.635, 37.8675 ], "timeVisible": 810.321, "tipPosition": [ -37.2041, 124.923, 47.1584 ], "tipVelocity": [ -4.03195, 5.29145, 3.86774 ], "tool": false, "touchDistance": 0.332609, "touchZone": "hovering", "type": 0, "width": 20.5858 }, { "bases": [ [ [ 0.929883, -0.0214331, 0.36723 ], [ -0.0899203, 0.954772, 0.283416 ], [ -0.356696, -0.296565, 0.885899 ] ], [ [ 0.906197, -0.0396238, 0.420996 ], [ -0.207543, 0.825755, 0.524457 ], [ -0.368421, -0.562636, 0.740073 ] ], [ [ 0.906197, -0.0396238, 0.420996 ], [ -0.0713341, 0.967006, 0.244561 ], [ -0.416796, -0.251652, 0.873471 ] ], [ [ 0.906197, -0.0396238, 0.420996 ], [ 0.0732099, 0.995267, -0.063911 ], [ -0.416471, 0.088737, 0.904808 ] ] ], "btipPosition": [ 70.8792, 158.015, 1.44856 ], "carpPosition": [ 10.6366, 106.62, 137.205 ], "dipPosition": [ 63.6455, 159.556, 17.1641 ], "direction": [ 0.416796, 0.251652, -0.873471 ], "extended": true, "handId": 1, "id": 11, "length": 59.7826, "mcpPosition": [ 37.3137, 128.8, 70.9488 ], "pipPosition": [ 53.4044, 153.373, 38.6263 ], "stabilizedTipPosition": [ 65.6654, 153.213, -14.0434 ], "timeVisible": 810.321, "tipPosition": [ 69.2154, 158.369, 5.06314 ], "tipVelocity": [ -4.20065, 9.68335, 2.59506 ], "tool": false, "touchDistance": 0.3253, "touchZone": "hovering", "type": 1, "width": 19.6635 }, { "bases": [ [ [ 0.874756, -0.223752, 0.42981 ], [ 0.0607727, 0.93066, 0.360802 ], [ -0.480737, -0.289493, 0.827699 ] ], [ [ 0.784201, -0.268147, 0.559576 ], [ -0.109474, 0.82787, 0.550133 ], [ -0.610773, -0.492674, 0.619862 ] ], [ [ 0.784201, -0.268147, 0.559576 ], [ 0.0996896, 0.944536, 0.312912 ], [ -0.612446, -0.189602, 0.767438 ] ], [ [ 0.784201, -0.268147, 0.559576 ], [ 0.297525, 0.95387, 0.0401336 ], [ -0.544524, 0.135015, 0.827807 ] ] ], "btipPosition": [ 114.34, 155.759, 14.6355 ], "carpPosition": [ 22.2091, 108.184, 141.712 ], "dipPosition": [ 103.938, 158.338, 30.4496 ], "direction": [ 0.612446, 0.189602, -0.767438 ], "extended": true, "handId": 1, "id": 12, "length": 68.1175, "mcpPosition": [ 56.3054, 128.716, 83.0076 ], "pipPosition": [ 86.233, 152.857, 52.6346 ], "stabilizedTipPosition": [ 107.84, 151.212, 1.45647 ], "timeVisible": 810.321, "tipPosition": [ 111.947, 156.352, 18.2727 ], "tipVelocity": [ -4.66062, 9.58164, 2.1671 ], "tool": false, "touchDistance": 0.333287, "touchZone": "hovering", "type": 2, "width": 19.3122 }, { "bases": [ [ [ 0.78739, -0.333431, 0.518498 ], [ 0.107759, 0.902593, 0.416789 ], [ -0.606963, -0.272303, 0.746624 ] ], [ [ 0.767862, -0.341851, 0.54178 ], [ -0.0158866, 0.835297, 0.549569 ], [ -0.640418, -0.4306, 0.635962 ] ], [ [ 0.767862, -0.341851, 0.54178 ], [ 0.147855, 0.917457, 0.36934 ], [ -0.623319, -0.203498, 0.755024 ] ], [ [ 0.767862, -0.341851, 0.54178 ], [ 0.301831, 0.939024, 0.164719 ], [ -0.565054, 0.0370446, 0.824222 ] ] ], "btipPosition": [ 129.561, 148.422, 33.3462 ], "carpPosition": [ 33.5367, 106.497, 146.693 ], "dipPosition": [ 118.829, 149.125, 49.0013 ], "direction": [ 0.623319, 0.203498, -0.755024 ], "extended": true, "handId": 1, "id": 13, "length": 65.4968, "mcpPosition": [ 72.1873, 123.837, 99.1495 ], "pipPosition": [ 101.275, 143.395, 70.2638 ], "stabilizedTipPosition": [ 123.254, 144.207, 20.7744 ], "timeVisible": 810.321, "tipPosition": [ 127.093, 148.584, 36.9468 ], "tipVelocity": [ -5.69924, 8.89887, 2.42685 ], "tool": false, "touchDistance": 0.331146, "touchZone": "hovering", "type": 3, "width": 18.3768 }, { "bases": [ [ [ 0.683148, -0.507227, 0.525386 ], [ 0.174865, 0.812118, 0.556675 ], [ -0.709035, -0.288419, 0.643493 ] ], [ [ 0.513798, -0.557566, 0.652022 ], [ 0.044047, 0.776152, 0.629005 ], [ -0.85678, -0.294462, 0.423345 ] ], [ [ 0.513798, -0.557566, 0.652022 ], [ 0.251492, 0.824509, 0.506888 ], [ -0.820222, -0.0964597, 0.563855 ] ], [ [ 0.513798, -0.557566, 0.652022 ], [ 0.443777, 0.823161, 0.354214 ], [ -0.734217, 0.107357, 0.670373 ] ] ], "btipPosition": [ 145.6, 125.131, 75.3324 ], "carpPosition": [ 43.833, 97.5082, 151.439 ], "dipPosition": [ 132.734, 127.012, 87.079 ], "direction": [ 0.820222, 0.0964597, -0.563855 ], "extended": true, "handId": 1, "id": 14, "length": 51.3483, "mcpPosition": [ 85.6283, 114.51, 113.508 ], "pipPosition": [ 116.426, 125.094, 98.2902 ], "stabilizedTipPosition": [ 138.574, 119.388, 60.1701 ], "timeVisible": 810.321, "tipPosition": [ 142.641, 125.564, 78.0341 ], "tipVelocity": [ -5.60761, 10.7884, 0.949619 ], "tool": false, "touchDistance": 0.331132, "touchZone": "hovering", "type": 4, "width": 16.3237 } ], "r": [ [ 0.584034, 0.313747, -0.748643 ], [ 0.0202196, 0.916373, 0.399814 ], [ 0.811477, -0.248642, 0.528849 ] ], "s": 1.42457, "t": [ 47.0678, 113.56, 102.138 ], "timestamp": 810321011 }';
  return new Leap.Frame(JSON.parse(frameDump));
}