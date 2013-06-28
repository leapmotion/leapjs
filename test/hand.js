describe('Hand', function(){
  describe("properties", function() {
    it('should have palmPosition', function() { assert(fakeHand().palmPosition) })
    it('should have direction', function() { assert(fakeHand().direction) })
    it('should have palmVelocity', function() { assert(fakeHand().palmVelocity) })
    it('should have palmNormal', function() { assert(fakeHand().palmNormal) })
    it('should have sphereCenter', function() { assert(fakeHand().sphereCenter) })
  });
});
