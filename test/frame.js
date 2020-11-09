describe('Frame', function(){
  describe('#finger()', function(){
    it('should return a valid finger when requested', function(){
      var data = fakeFrame({fingers: 2})
      var frame = createFrame(data);
      assert.equal(2, frame.fingers.length);
      assert(frame.finger(0).valid);
      assert(frame.finger(1).valid);
    })

    it('should return an invalid finger when an invalid finger is requested', function(){
      var data = fakeFrame()
      var frame = createFrame(data);
      assert.equal(0, frame.fingers.length);
      assert.equal(false, frame.finger(0).valid);
    })
  })

  describe('#fingers', function(){
    it('should return a list of fingers', function(){
      var data = fakeFrame({fingers: 2})
      var frame = createFrame(data);
      assert.equal(2, frame.fingers.length);
      assert(frame.fingers[0].valid);
      assert(frame.fingers[1].valid);
    })
  })

  describe('#hand()', function(){
    it('should return a valid hand when requested', function(){
      var data = fakeFrame({hands: 1})
      var frame = createFrame(data);
      assert.equal(1, frame.hands.length);
      assert(frame.hand(0).valid);
    })

    it('should return an invalid hand when an invalid hand is requested', function(){
      var data = fakeFrame()
      var frame = createFrame(data);
      assert.equal(0, frame.hands.length);
      assert.equal(false, frame.hand(0).valid);
    })
  })

  describe('#hands', function(){
    it('should return a list of valid hands', function(){
      var data = fakeFrame({hands:1})
      var frame = createFrame(data);
      assert.equal(1, frame.hands.length);
      assert(frame.hands[0].valid);
    })
  })

  describe('#translation()', function(){
    it('should return the translation', function(){
      var data1 = fakeFrame({translation: [1, 2, 3]})
      var frame1 = createFrame(data1);
      var data2 = fakeFrame({translation: [3, 1, 5]})
      var frame2 = createFrame(data2);
      var t = frame1.translation(frame2);
      assert.deepEqual([-2, 1, -2], [t[0], t[1], t[2]]);
    })
  })

  describe('#rotationAxis()', function(){
    it('should return the rotationAxis', function(){
      var data1 = fakeFrame({rotation: [[0,1,2], [2,3,4], [2,3,4]]})
      var frame1 = createFrame(data1);
      var data2 = fakeFrame({rotation: [[0,4,5], [1,3,7], [5,4,2]]})
      var frame2 = createFrame(data2);
      var result = frame1.rotationAxis(frame2);
      assert.closeTo(-0.7427813, result[0], 0.0001)
      assert.closeTo(-0.55708, result[1], 0.0001)
      assert.closeTo(-0.37139, result[2], 0.0001)
    })
  })

  describe('#rotationAngle()', function(){
    it('should return the rotationAngle', function(){
      var data1 = fakeFrame({rotation: [[1.0,0.0,0.0], [0.0,1.0,0.0], [0.0,0.0,1.0]]})
      var frame1 = createFrame(data1);
      var data2 = fakeFrame({rotation: [[1.0,0.0,0.0], [0.0,1.0,0.0], [0.5,0.0,0.5]]})
      var frame2 = createFrame(data2);
      var result = frame1.rotationAngle(frame2);
      assert.closeTo(0.72273, result, 0.0001);
    })
  })

  describe('Invalid', function() {
    it('should be invalid',                                     function() { assert(!Leap.Frame.Invalid.valid)})
    it('should have empty fingers',                             function() { assert.equal(0, Leap.Frame.Invalid.fingers.length)})
    it('should have empty pointables',                          function() { assert.equal(0, Leap.Frame.Invalid.pointables.length)})
    it('should return an invalid #pointable',                   function() { assert(!Leap.Frame.Invalid.pointable().valid)})
    it('should return an invalid #finger',                      function() { assert(!Leap.Frame.Invalid.finger().valid)})
    it('should return 0.0 from #rotationAngle',                 function() { assert.equal(0.0, Leap.Frame.Invalid.rotationAngle())})
    it('should return an identity matrix from #rotationMatrix', function() { assertUtil.matrix3CloseTo(Leap.mat3.create(), Leap.Frame.Invalid.rotationMatrix(), assertUtil.DEFAULT_RANGE())})
    it('should return a null vector from #rotationAxis',        function() { assertUtil.vectorCloseTo (Leap.vec3.create(), Leap.Frame.Invalid.rotationAxis  (), assertUtil.DEFAULT_RANGE())})
    it('should return 1.0 from #scaleFactor',                   function() { assert.equal(1.0, Leap.Frame.Invalid.scaleFactor())})
    it('should return a null vector from #translation',         function() {  assertUtil.vectorCloseTo(Leap.vec3.create(), Leap.Frame.Invalid.translation   (), assertUtil.DEFAULT_RANGE())})
    it('should return a null vector from #translation',         function() { assert.equal(1.0, Leap.Frame.Invalid.scaleFactor())})
  });

    describe('End to End', function(){
        var frame = fakeActualFrame();

        it('should have five pointables', function(){
            assert.equal(frame.pointables.length, 5, 'five pointables found');
        });

        it('should make a valid frame', function(){
            assert.ok(frame.valid, 'frame is valid');
        });

        frame.pointables.forEach(function (pointable) {
            var stp = pointable.stabilizedTipPosition;
            var match = undefined;
            frame.pointables.forEach(function(p) {
                if(p.stabilizedTipPosition[0] == stp[0] &&
                   p.stabilizedTipPosition[1] == stp[1] &&
                   p.stabilizedTipPosition[2] == stp[2]){
                  match = p;
                }
            });

            assert.ok(match, 'found a match for stp ' + stp.join(','));
            assert.ok(match.id, 'match has an ID');
            var foundPointable = frame.pointable(match.id);
            assert.ok(foundPointable, 'found the pointable by id in frame');
            assert.equal(foundPointable.stabilizedTipPosition[0], stp[0], 'stp match')

            var hand = frame.hand(match.handId);

            assert.ok(hand, 'frame has pointables hand');

            var hand_pointable = hand.finger(match.id);

            assert.ok(hand_pointable, 'found finger in its hand; also , is finger');
        });
    });
})
