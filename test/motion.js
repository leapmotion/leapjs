describe('Motion', function(){
  describe('Frame', function() {
    describe('#matrix()', function(){
      it('should return a rotation matrix', function(){
        var data1 = fakeFrame({rotation: [[0,1,2], [2,3,4], [2,3,4]]})
        var frame1 = new Leap.Frame(data1);
        assert.deepEqual([[0,1,2],[2,3,4],[2,3,4]], frame1.matrix())
      })
    })

    describe('#translation()', function(){
      it('should return the translation', function(){
        var data1 = fakeFrame({translation: [1, 2, 3]})
        var frame1 = new Leap.Frame(data1);
        var data2 = fakeFrame({translation: [3, 1, 5]})
        var frame2 = new Leap.Frame(data2);
        assert.deepEqual([-2, 1, -2], frame1.translation(frame2))
      })
    })

    describe('#rotationAxis()', function(){
      it('should return the rotationAxis', function(){
        var data1 = fakeFrame({rotation: [[0,1,2], [2,3,4], [2,3,4]]})
        var frame1 = new Leap.Frame(data1);
        var data2 = fakeFrame({rotation: [[0,4,5], [1,3,7], [5,4,2]]})
        var frame2 = new Leap.Frame(data2);
        var result = frame1.rotationAxis(frame2);
        assert.closeTo(-0.7427813, result[0], 0.0001)
        assert.closeTo(-0.55708, result[1], 0.0001)
        assert.closeTo(-0.37139, result[2], 0.0001)
      })
    })

    describe('#rotationAngle()', function(){
      it('should return the rotationAngle', function(){
        var data1 = fakeFrame({rotation: [[1.0,0.0,0.0], [0.0,1.0,0.0], [0.0,0.0,1.0]]})
        var frame1 = new Leap.Frame(data1);
        var data2 = fakeFrame({rotation: [[1.0,0.0,0.0], [0.0,1.0,0.0], [0.5,0.0,0.5]]})
        var frame2 = new Leap.Frame(data2);
        var result = frame1.rotationAngle(frame2);
        assert.closeTo(0.72273, result, 0.0001)
      })
    })
  })

  describe('Hand', function() {
    describe('#matrix()', function(){
      it('should return a rotation matrix', function(){
        var data1 = fakeFrame({handData: [fakeHand({rotation: [[0,1,2], [2,3,4], [2,3,4]]})]})
        var frame1 = new Leap.Frame(data1);
        assert.deepEqual([[0,1,2],[2,3,4],[2,3,4]], frame1.hand(0).matrix())
      })
    })

    describe('#translation()', function(){
      it('should return the translation', function(){
        var data1 = fakeFrame({handData: [fakeHand({translation: [1, 2, 3]})]})
        var frame1 = new Leap.Frame(data1);
        var data2 = fakeFrame({handData: [fakeHand({translation: [3, 1, 5]})]})
        var frame2 = new Leap.Frame(data2);
        assert.deepEqual([-2, 1, -2], frame1.hand(0).translation(frame2.hand(0)))
      })
    })

    describe('#rotationAxis()', function(){
      it('should return the rotationAxis', function(){
        var data1 = fakeFrame({handData: [fakeHand({rotation: [[0,1,2], [2,3,4], [2,3,4]]})]})
        var frame1 = new Leap.Frame(data1);
        var data2 = fakeFrame({handData: [fakeHand({rotation: [[0,4,5], [1,3,7], [5,4,2]]})]})
        var frame2 = new Leap.Frame(data2);
        var result = frame1.hand(0).rotationAxis(frame2.hand(0));
        assert.closeTo(-0.74278, result[0], 0.0001)
        assert.closeTo(-0.55708, result[1], 0.0001)
        assert.closeTo(-0.37139, result[2], 0.0001)
      })
    })

    describe('#rotationAngle()', function(){
      it('should return the rotationAngle', function(){
        var data1 = fakeFrame({handData: [fakeHand({rotation: [[1,0,0], [0,1,0], [0,0,1]]})]})
        var frame1 = new Leap.Frame(data1);
        var data2 = fakeFrame({handData: [fakeHand({rotation: [[1,0,0], [0,1,0], [0.5,0,0.5]]})]})
        var frame2 = new Leap.Frame(data2);
        var result = frame1.hand(0).rotationAngle(frame2.hand(0));
        assert.closeTo(0.72273, result, 0.0001)
      })
    })
  })
})
