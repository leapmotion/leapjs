if (typeof(exports) === 'undefined') {
  exports = {};
}

var fingerId = 0
  , handId = 0
  , frameId =0;

var fakeController = exports.fakeController = function(opts) {
  var controller = new Leap.Controller(opts)
  var connection = controller.connection;
  controller.connection.connect = function() {
    connection.handleOpen()
  }
  controller.connection.disconnect = function() {
    connection.handleClose()
  }
  controller.connection.socket = { send: function(msg) {} }
  return controller;
}

var fakeFrame = exports.fakeFrame = function(opts) {
  if (opts === undefined) opts = {};

  handId = 0
  fingerId = 0

  return {
    id: opts.id || ++frameId,
    valid: true,
    timestamp: frameId,
    pointables: _(opts.fingers || 0).times(function() { return fakeFinger() }),
    hands: opts.handData || _(opts.hands || 0).times(function() { return fakeHand() }),
    r: opts.rotation || [[0,1,2], [2,3,4], [2,3,4]],
    t: opts.translation || [1, 2, 3],
  }
}

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
