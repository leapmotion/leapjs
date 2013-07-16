describe('Pointable', function(){
  describe("properties", function() {
    var data = fakeFrame({fingers: 5, hands:1})
    var frame = new Leap.Frame(data);
    var pointable = frame.hands[0].pointables[0];

    it('should have id', function() { assert.equal(0, pointable.id) })
    it('should have tool', function() { assert.equal(false, pointable.tool) })
    it('should have width', function() { assert(pointable.width) })
    it('should be valid', function() { assert(pointable.valid) })
    it('should have direction', function() { assert(pointable.direction) })
    it('should have stabilizedTipPosition', function() { assert(pointable.stabilizedTipPosition) })
    it('should have tipPosition', function() { assert(pointable.tipPosition) })
    it('should have tipVelocity', function() { assert(pointable.tipVelocity) })
    it('should have touchZone', function() { assert(pointable.touchZone) })
    it('should have touchDistance', function() { assert(pointable.touchDistance) })
    it('should have timeVisible', function() { assert(pointable.timeVisible) })
  });
});
