describe('Hand', function(){
  describe("an instance", function() {
    var data = fakeFrame({fingers: 5, hands:1})
    var frame = createFrame(data);
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
      it('should have type', function() { assert(hand.type) })
      it('should have grabStrength', function() { assert(hand.grabStrength) })
      it('should have pinchStrength', function() { assert(hand.pinchStrength) })
      it('should have confidence', function() { assert(hand.confidence) })
      it('should have a thumb', function() { assert.equal(hand.thumb.type, 0) })
      it('should have a indexFinger', function() { assert.equal(hand.indexFinger.type, 1) })
      it('should have a middleFinger', function() { assert.equal(hand.middleFinger.type, 2) })
      it('should have a ringFinger', function() { assert.equal(hand.ringFinger.type, 3) })
      it('should have a pinky', function() { assert.equal(hand.pinky.type, 4) })
    });

    describe("#finger", function() {
      it('should return a finger by id', function() {
        assert.equal(1, hand.finger(1).id)
      })


      it('should return fingers ordered by id', function(){
        var hand = fakeActualFrame().hands[0];
        for (var i = 1; i < hand.fingers.length; i++){
          assert(hand.fingers[i].id > hand.fingers[i-1].id,
              "Fingers to be in sequential order. Got '" + hand.fingers[i].id + ', ' + hand.fingers[i-1].id + "'");
        }
      });
    })

    describe("#rotationAngle", function() {
      it('should work', function() {
        var frame1 = createFrame(data);
        frame1.hand(0)._rotation = [1.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,1.0];
        var frame2 = createFrame(data);
        frame2.hand(0)._rotation = [1.0,0.0,0.0,0.0,1.0,0.0,0.5,0.0,0.5];
        var result = frame2.hand(0).rotationAngle(frame1);
        assert.closeTo(0.72273, result, 0.0001)
      })
    })
  });

  describe('#translation()', function(){
    it('should return the translation', function(){
      var data1 = fakeFrame({handData: [fakeHand({translation: [1, 2, 3]})]})
      var frame1 = createFrame(data1);
      var data2 = fakeFrame({handData: [fakeHand({translation: [3, 1, 5]})]})
      var frame2 = createFrame(data2);
      assert.deepEqual([-2, 1, -2], frame1.hand(0).translation(frame2))
    })
  })

  describe('#rotationAxis()', function(){
    it('should return the rotationAxis', function(){
      var data1 = fakeFrame({handData: [fakeHand({rotation: [[0,1,2], [2,3,4], [2,3,4]]})]})
      var frame1 = createFrame(data1);
      var data2 = fakeFrame({handData: [fakeHand({rotation: [[0,4,5], [1,3,7], [5,4,2]]})]})
      var frame2 = createFrame(data2);
      var result = frame1.hand(0).rotationAxis(frame2);
      assertUtil.vectorCloseTo([-0.74278, -0.55708,-0.37139], result, 0.0001, 'rotation axis');
    })

    it('should return a null vector if the hand is invalid', function(){
      var data1 = fakeFrame({handData: [fakeHand({rotation: [[0,4,5], [1,3,7], [5,4,2]]})]})
      var frame1 = createFrame(data1);
      var data2 = fakeFrame({handData: []})
      var frame2 = createFrame(data2);
      var result = frame1.hand(0).rotationAxis(frame2);
      assert(!frame2.hand(0).valid);
      assertUtil.vectorCloseTo(result, Leap.vec3.create(), 0.0001, 'result is zero vector');
    });
  })

  describe('#rotationAngle()', function(){
    it('should return the rotationAngle', function(){
      var data1 = fakeFrame({handData: [fakeHand({rotation: [[1,0,0], [0,1,0], [0,0,1]]})]})
      var frame1 = createFrame(data1);
      var data2 = fakeFrame({handData: [fakeHand({rotation: [[1,0,0], [0,1,0], [0.5,0,0.5]]})]})
      var frame2 = createFrame(data2);
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
    it('should return an identity matrix from #rotationMatrix', function() { assertUtil.matrix3CloseTo(Leap.mat3.create(), Leap.Hand.Invalid.rotationMatrix(),  assertUtil.DEFAULT_RANGE())})
    it('should return a null vector from #rotationAxis', function() { assertUtil.vectorCloseTo(Leap.vec3.create(), Leap.Hand.Invalid.rotationAxis(),  assertUtil.DEFAULT_RANGE())})
    it('should return 1.0 from #scaleFactor', function() { assert.equal(1.0, Leap.Hand.Invalid.scaleFactor())})
    it('should return a null vector from #translation', function() {  assertUtil.vectorCloseTo(Leap.vec3.create(),Leap.Hand.Invalid.rotationAxis(),  assertUtil.DEFAULT_RANGE())})
  })
});
