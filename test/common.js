var fingerId = 0
  , handId = 0
  , frameId =0;

var fakeFrame = function(opts) {
  if (opts === undefined) opts = {};

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

var fakeHand = function(opts) {
  return {
    id: ++handId,
    valid: true,
    palm: [],
    r: (opts && opts.rotation) || [[0,1,2], [2,3,4], [2,3,4]],
    t: (opts && opts.translation) || [1, 2, 3]
  }
}

var fakeFinger = function() {
  return {
    id: ++fingerId,
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
