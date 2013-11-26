describe('Hand', function(){
  describe("an instance", function() {
    var data = fakeFrame({fingers: 5, hands:1})
    var frame = new Leap.Frame(data);
    var hand = frame.hands[0];

    describe("properties", function() {
      it('should have palmPosition', function() { assert(hand.palmPosition) })
      it('should have direction', function() { assert(hand.direction) })
      it('should have palmVelocity', function() { assert(hand.palmVelocity) })
      it('should have palmNormal', function() { assert(hand.palmNormal) })
      it('should have sphereCenter', function() { assert(hand.sphereCenter) })
      it('should have 5 pointables', function() { assert.equal(5, hand.pointables.length) })
      it('should have 0 tools', function() { assert.equal(0, hand.tools.length) })
      it('should have 5 fingers', function() { assert.equal(5, hand.fingers.length) })
      it('should have timeVisible', function() { assert(hand.timeVisible) })
      it('should have stabilizedPalmPosition', function() { assert(hand.stabilizedPalmPosition) })
    });

    describe("#finger", function() {
      it('should return a finger by id', function() {
        assert.equal(1, hand.finger(1).id)
      })
    })

    describe("#rotationAngle", function() {
      it('should work', function() {
        var frame1 = new Leap.Frame(data);
        frame1.hand(0)._rotation = [1.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,1.0];
        var frame2 = new Leap.Frame(data);
        frame2.hand(0)._rotation = [1.0,0.0,0.0,0.0,1.0,0.0,0.5,0.0,0.5];
        var result = frame2.hand(0).rotationAngle(frame1);
        assert.closeTo(0.72273, result, 0.0001)
      })
    })
  });

  describe('#translation()', function(){
    it('should return the translation', function(){
      var data1 = fakeFrame({handData: [fakeHand({translation: [1, 2, 3]})]})
      var frame1 = new Leap.Frame(data1);
      var data2 = fakeFrame({handData: [fakeHand({translation: [3, 1, 5]})]})
      var frame2 = new Leap.Frame(data2);
      assert.deepEqual([-2, 1, -2], frame1.hand(0).translation(frame2))
    })
  })

  describe('#rotationAxis()', function(){
    it('should return the rotationAxis', function(){
      var data1 = fakeFrame({handData: [fakeHand({rotation: [[0,1,2], [2,3,4], [2,3,4]]})]})
      var frame1 = new Leap.Frame(data1);
      var data2 = fakeFrame({handData: [fakeHand({rotation: [[0,4,5], [1,3,7], [5,4,2]]})]})
      var frame2 = new Leap.Frame(data2);
      var result = frame1.hand(0).rotationAxis(frame2);
      assert.closeTo(-0.74278, result[0], 0.0001)
      assert.closeTo(-0.55708, result[1], 0.0001)
      assert.closeTo(-0.37139, result[2], 0.0001)
    })

    it('should return a null vector if the hand is invalid', function(){
      var data1 = fakeFrame({handData: [fakeHand({rotation: [[0,4,5], [1,3,7], [5,4,2]]})]})
      var frame1 = new Leap.Frame(data1);
      var data2 = fakeFrame({handData: []})
      var frame2 = new Leap.Frame(data2);
      var result = frame1.hand(0).rotationAxis(frame2);
      assert(!frame2.hand(0).valid);
      assert.closeTo(0, result[0], 0.0001)
      assert.closeTo(0, result[1], 0.0001)
      assert.closeTo(0, result[2], 0.0001)
    });
  })

  describe('#rotationAngle()', function(){
    it('should return the rotationAngle', function(){
      var data1 = fakeFrame({handData: [fakeHand({rotation: [[1,0,0], [0,1,0], [0,0,1]]})]})
      var frame1 = new Leap.Frame(data1);
      var data2 = fakeFrame({handData: [fakeHand({rotation: [[1,0,0], [0,1,0], [0.5,0,0.5]]})]})
      var frame2 = new Leap.Frame(data2);
      var result = frame1.hand(0).rotationAngle(frame2);
      assert.closeTo(0.72273, result, 0.0001)
    })
  })

  describe('Invalid', function() {
    it('should be invalid', function() { assert(!Leap.Hand.Invalid.valid)})
    it('should have empty fingers', function() { assert.equal(0, Leap.Hand.Invalid.fingers.length)})
    it('should have empty tools', function() { assert.equal(0, Leap.Hand.Invalid.tools.length)})
    it('should have empty pointables', function() { assert.equal(0, Leap.Hand.Invalid.pointables.length)})
    it('should return an invalid #pointable', function() { assert(!Leap.Hand.Invalid.pointable().valid)})
    it('should return an invalid #finger', function() { assert(!Leap.Hand.Invalid.finger().valid)})
    it('should return 0.0 from #rotationAngle', function() { assert.equal(0.0, Leap.Hand.Invalid.rotationAngle())})
    it('should return an identity matrix from #rotationMatrix', function() { assert.deepEqual(Leap.mat3.create(), Leap.Hand.Invalid.rotationMatrix())})
    it('should return a null vector from #rotationAxis', function() { assert.deepEqual(Leap.vec3.create(), Leap.Hand.Invalid.rotationAxis())})
    it('should return 1.0 from #scaleFactor', function() { assert.equal(1.0, Leap.Hand.Invalid.scaleFactor())})
    it('should return a null vector from #translation', function() { assert.equal(1.0, Leap.Hand.Invalid.scaleFactor())})
  })
});
