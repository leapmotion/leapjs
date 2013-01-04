var fingerId = 0
  , handId = 0
  , frameId =0;

fakeFrame = function(hands) {
  return {
    valid: true,
    id: ++frameId,
    hands: hands
  };
}

fakeHand = function(fingers) {
  return {
    id: ++handId,
    valid: true,
    fingers: fingers
  }
}

fakeFinger = function(data) {
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
