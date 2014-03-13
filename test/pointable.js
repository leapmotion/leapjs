describe('Pointable', function(){
  describe("properties", function() {
    var data = fakeFrame({tools: 5, hands:1})
    var frame = createFrame(data);
    var pointable = frame.hands[0].pointables[0];

    it('should have id', function() { assert.property(pointable, 'id') })
    it('should have tool', function() { assert.equal(false, pointable.tool) })
    it('should have width', function() { assert.property(pointable, 'width') })
    it('should be valid', function() { assert(pointable.valid) })
    it('should have direction', function() { assert.property(pointable, 'direction') })
    it('should have stabilizedTipPosition', function() { assert.property(pointable, 'stabilizedTipPosition') })
    it('should have tipPosition', function() { assert.property(pointable, 'tipPosition') })
    it('should have tipVelocity', function() { assert.property(pointable, 'tipVelocity') })
    it('should have touchZone', function() { assert.property(pointable, 'touchZone') })
    it('should have touchDistance', function() { assert.property(pointable, 'touchDistance') })
    it('should have timeVisible', function() { assert.property(pointable, 'timeVisible') })
    it('should not have mcpPosition', function() { assert.notProperty(pointable, 'mcpPosition') })
    it('should match Pointable in #toString', function() { assert.match(pointable.toString(), /^Pointable/); })
    it('should respond to hand()', function() { assert.equal(pointable.hand(), frame.hands[0]) })
  });
});
