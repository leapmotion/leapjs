describe('Finger', function(){
  describe("properties", function() {
    var data = fakeFrame({pointableData: [fakeFinger()]});
    var frame = createFrame(data);
    var pointable = frame.pointables[0];

    it('should have id', function() { assert.property(pointable, 'id') })
    it('should have tool', function() { assert.equal(false, pointable.tool) })
    it('should have width', function() { assert.property(pointable, 'width') })
    it('should be valid', function() { assert(pointable.valid) })
    it('should be a valid', function() { assert(pointable.finger) })
    it('should have an array of 4 positions', function() { assert.equal(4, pointable.positions.length) })
    it('should have direction', function() { assert.property(pointable, 'direction') })
    it('should have stabilizedTipPosition', function() { assert.property(pointable, 'stabilizedTipPosition') })
    it('should have tipPosition', function() { assert.property(pointable, 'tipPosition') })
    it('should have tipVelocity', function() { assert.property(pointable, 'tipVelocity') })
    it('should have touchZone', function() { assert.property(pointable, 'touchZone') })
    it('should have touchDistance', function() { assert.property(pointable, 'touchDistance') })
    it('should have timeVisible', function() { assert.property(pointable, 'timeVisible') })
    it('should have mcpPosition', function() { assert.property(pointable, 'mcpPosition') })
    it('should have positions', function() { assert.property(pointable, 'positions') })
    it('should match Finger in #toString', function() { assert.match(pointable.toString(), /^Finger/); })
  });
});
