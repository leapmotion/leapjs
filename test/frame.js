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
    it('should be invalid', function() { assert(!Leap.Frame.Invalid.valid)})
    it('should have empty fingers', function() { assert.equal(0, Leap.Frame.Invalid.fingers.length)})
    it('should have empty tools', function() { assert.equal(0, Leap.Frame.Invalid.tools.length)})
    it('should have empty pointables', function() { assert.equal(0, Leap.Frame.Invalid.pointables.length)})
    it('should return an invalid #pointable', function() { assert(!Leap.Frame.Invalid.pointable().valid)})
    it('should return an invalid #finger', function() { assert(!Leap.Frame.Invalid.finger().valid)})
    it('should return 0.0 from #rotationAngle', function() { assert.equal(0.0, Leap.Frame.Invalid.rotationAngle())})
    it('should return an identity matrix from #rotationMatrix', function() { assert.deepEqual(Leap.mat3.create(), Leap.Frame.Invalid.rotationMatrix())})
    it('should return a null vector from #rotationAxis', function() { assert.deepEqual(Leap.vec3.create(), Leap.Frame.Invalid.rotationAxis())})
    it('should return 1.0 from #scaleFactor', function() { assert.equal(1.0, Leap.Frame.Invalid.scaleFactor())})
    it('should return a null vector from #translation', function() { assert.equal(1.0, Leap.Frame.Invalid.scaleFactor())})
  });

    describe('End to End', function(){
        var data = {"currentFrameRate": 110.729, "gestures": [], "hands": [
            {"direction": [0.202842, 0.239433, -0.949488], "grabStrength": 0, "id": 4, "palmNormal": [0.338788, -0.926922, -0.161366], "palmPosition": [-94.2569, 155.465, 103.744], "palmVelocity": [44.9697, -120.901, 16.8931], "pinchStrength": 0, "r": [
                [0.968116, 0.227429, 0.105011],
                [-0.228521, 0.973538, -0.00167153],
                [-0.102612, -0.022379, 0.99447]
            ], "s": 1.07478, "sphereCenter": [-58.086, 131.294, 41.8701], "sphereRadius": 75.274, "stabilizedPalmPosition": [-97.1, 159.815, 102.512], "t": [-94.6867, 156.734, 103.627], "timeVisible": 9523.28, "type": "left"},
            {"direction": [-0.741533, 0.432862, -0.5126], "grabStrength": 0, "id": 8, "palmNormal": [-0.223595, -0.879795, -0.419483], "palmPosition": [114.687, 256.156, 64.6155], "palmVelocity": [0, 0, 0], "pinchStrength": 0.321591, "r": [
                [0.981643, 0.0353126, -0.187428],
                [-0.0244919, 0.997914, 0.0597381],
                [0.189146, -0.054051, 0.98046]
            ], "s": 1.00289, "sphereCenter": [63.2405, 293.183, 45.2762], "sphereRadius": 62.529, "stabilizedPalmPosition": [114.687, 256.156, 64.6155], "t": [57.3436, 128.078, 32.3078], "timeVisible": 0, "type": "left"}
        ], "id": 195457, "interactionBox": {"center": [0, 200, 0], "size": [235.247, 235.247, 147.751]}, "pointables": [
            {"dipPosition": [-13.7659, 147.396, 89.2533], "direction": [0.789343, -0.0667904, -0.610309], "extended": true, "handId": 4, "id": 40, "length": 60.2506, "mcpPosition": [-74.5834, 154.294, 145.811], "pipPosition": [-42.8801, 149.86, 111.764], "stabilizedTipPosition": [5.63262, 151.872, 77.3854], "timeVisible": 9523.28, "tipPosition": [6.77138, 146.534, 78.1415], "tipVelocity": [42.5805, -178.206, 30.8631], "tool": false, "touchDistance": 0.340902, "touchZone": "hovering", "type": 0, "width": 21.9061},
            {"dipPosition": [-37.732, 165.629, -1.62964], "direction": [0.296462, -0.258295, -0.919453], "extended": true, "handId": 4, "id": 41, "length": 74.364, "mcpPosition": [-59.3218, 176.198, 72.5705], "pipPosition": [-46.5989, 173.355, 25.8704], "stabilizedTipPosition": [-34.5765, 163.376, -19.8552], "timeVisible": 9523.28, "tipPosition": [-31.3088, 156.597, -18.5322], "tipVelocity": [51.4299, -184.214, 18.9897], "tool": false, "touchDistance": 0.29964, "touchZone": "hovering", "type": 1, "width": 20.9247},
            {"dipPosition": [-60.8212, 159.358, -18.9129], "direction": [0.329188, -0.276094, -0.902999], "extended": true, "handId": 4, "id": 42, "length": 77.1622, "mcpPosition": [-84.2503, 170.469, 59.2142], "pipPosition": [-70.9477, 167.851, 8.86523], "stabilizedTipPosition": [-55.0228, 155.572, -35.8109], "timeVisible": 9523.28, "tipPosition": [-53.0279, 149.492, -34.8879], "tipVelocity": [44.0674, -193.702, 18.7112], "tool": false, "touchDistance": 0.281028, "touchZone": "hovering", "type": 2, "width": 20.5509},
            {"dipPosition": [-83.9459, 145.407, -15.8257], "direction": [0.329683, -0.29874, -0.89558], "extended": true, "handId": 4, "id": 43, "length": 74.3465, "mcpPosition": [-107.53, 162.816, 56.5847], "pipPosition": [-93.8257, 154.359, 11.0126], "stabilizedTipPosition": [-78.178, 142.16, -33.4785], "timeVisible": 9523.28, "tipPosition": [-76.4807, 136.986, -32.6153], "tipVelocity": [51.6691, -186.325, 25.1813], "tool": false, "touchDistance": 0.299121, "touchZone": "hovering", "type": 3, "width": 19.5555},
            {"dipPosition": [-113.434, 132.649, 4.08216], "direction": [0.260557, -0.321248, -0.910445], "extended": true, "handId": 4, "id": 44, "length": 58.4981, "mcpPosition": [-126.119, 147.883, 59.0545], "pipPosition": [-118.947, 139.446, 23.3457], "stabilizedTipPosition": [-109.135, 130.002, -12.9285], "timeVisible": 9523.28, "tipPosition": [-107.371, 124.972, -11.7922], "tipVelocity": [53.0003, -182.683, 33.9598], "tool": false, "touchDistance": 0.288832, "touchZone": "hovering", "type": 4, "width": 17.3707},
            {"dipPosition": [46.4743, 282.233, -4.8361], "direction": [-0.868955, 0.0578465, -0.491498], "extended": true, "handId": 8, "id": 81, "length": 63.65, "mcpPosition": [104.781, 278.351, 28.1434], "pipPosition": [68.7196, 280.752, 7.74626], "stabilizedTipPosition": [31.4414, 283.234, -13.339], "timeVisible": 0, "tipPosition": [31.4414, 283.234, -13.339], "tipVelocity": [0, 0, 0], "tool": false, "touchDistance": 0.333333, "touchZone": "hovering", "type": 1, "width": 17.91},
            {"dipPosition": [24.965, 268.12, 76.7826], "direction": [-0.892366, -0.29899, -0.338065], "extended": true, "handId": 8, "id": 84, "length": 50.07, "mcpPosition": [68.8033, 258.903, 76.2824], "pipPosition": [41.1257, 273.535, 82.9049], "stabilizedTipPosition": [22.6712, 255.429, 67.381], "timeVisible": 0, "tipPosition": [22.6712, 255.429, 67.381], "tipVelocity": [0, 0, 0], "tool": false, "touchDistance": 0.333333, "touchZone": "hovering", "type": 4, "width": 14.868},
            {"dipPosition": [108.136, 269.31, 11.1776], "direction": [-0.714182, 0.303148, -0.630908], "extended": false, "handId": 8, "id": 80, "length": 51.57, "mcpPosition": [153.232, 246.893, 61.5334], "pipPosition": [130.682, 259.74, 31.0954], "stabilizedTipPosition": [91.4127, 274.771, 1.6633], "timeVisible": 0, "tipPosition": [91.4127, 274.771, 1.6633], "tipVelocity": [0, 0, 0], "tool": false, "touchDistance": 0.333333, "touchZone": "hovering", "type": 0, "width": 18.75},
            {"dipPosition": [103.563, 228.501, 36.7695], "direction": [0.858224, -0.291773, 0.42228], "extended": false, "handId": 8, "id": 82, "length": 66.045, "mcpPosition": [85.7571, 276.673, 43.8044], "pipPosition": [80.9657, 236.184, 25.6509], "stabilizedTipPosition": [105.455, 244.279, 43.8588], "timeVisible": 0, "tipPosition": [105.455, 244.279, 43.8588], "tipVelocity": [0, 0, 0], "tool": false, "touchDistance": 0.333333, "touchZone": "none", "type": 2, "width": 17.59},
            {"dipPosition": [95.3571, 228.26, 50.8667], "direction": [0.923514, -0.237784, 0.300966], "extended": false, "handId": 8, "id": 83, "length": 63.635, "mcpPosition": [75.2429, 271.36, 61.3038], "pipPosition": [71.669, 234.36, 43.1469], "stabilizedTipPosition": [96.8771, 243.727, 58.4678], "timeVisible": 0, "tipPosition": [96.8771, 243.727, 58.4678], "tipVelocity": [0, 0, 0], "tool": false, "touchDistance": 0.333333, "touchZone": "none", "type": 3, "width": 16.738}
        ], "r": [
            [0.956807, 0.263466, 0.122907],
            [-0.265562, 0.964094, 0.000696639],
            [-0.11831, -0.0333058, 0.992418]
        ], "s": 1.05194, "t": [-94.6385, 218.232, 114.818], "timestamp": 9523277878}

        var frame = new Leap.Frame(data);

        it('should have ten pointables', function(){
            assert.equal(frame.pointables.length, 10, 'ten pointables found');
        });

        it('should make a valid frame', function(){
            assert.ok(frame.valid, 'frame is valid');
        });

        _.each(data.pointables, function (pointable) {
            var stp = pointable.stabilizedTipPosition;
            var match = _.find(frame.pointables, function (p) {
                return  p.stabilizedTipPosition[0] == stp[0] &&
                    p.stabilizedTipPosition[0] == stp[0] &&
                    p.stabilizedTipPosition[0] == stp[0];
            });

            assert.ok(match, 'found a match for stp ' + stp.join(','));
            assert.ok(match.id, 'match has an ID');
            var foundPointable = frame.pointable(match.id);
            assert.ok(foundPointable, 'found the pontable by id in frame');
            assert.equal(foundPointable.stabilizedTipPosition[0], stp[0], 'stp match')

            var hand = frame.hand(match.handId);

            assert.ok(hand, 'frame has pointables hand');

            var hand_pointable = hand.finger(match.id);

            assert.ok(hand_pointable, 'found finger in its hand; also , is finger');
        });
    });
})
