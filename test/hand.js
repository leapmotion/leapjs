describe('Hand', function(){
  describe("properties", function() {
    var data = fakeFrame({fingers: 5, hands:1})
    var frame = new Leap.Frame(data);

    it('should have palmPosition', function() { assert(frame.hands[0].palmPosition) })
    it('should have direction', function() { assert(frame.hands[0].direction) })
    it('should have palmVelocity', function() { assert(frame.hands[0].palmVelocity) })
    it('should have palmNormal', function() { assert(frame.hands[0].palmNormal) })
    it('should have sphereCenter', function() { assert(frame.hands[0].sphereCenter) })
    it('should have 5 pointables', function() { assert.equal(5, frame.hands[0].pointables.length) })
    it('should have 0 tools', function() { assert.equal(0, frame.hands[0].tools.length) })
    it('should have 5 fingers', function() { assert.equal(5, frame.hands[0].fingers.length) })
  });
});
