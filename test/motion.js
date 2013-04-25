describe('Motion', function(){
  describe('Frame', function() {

    describe('#translation()', function(){
      it('should return the translation', function(){
        var data1 = fakeFrame({translation: new Leap.Vector([1, 2, 3])})
        var frame1 = new Leap.Frame(data1);
        var data2 = fakeFrame({translation: new Leap.Vector([3, 1, 5])})
        var frame2 = new Leap.Frame(data2);
        assert.deepEqual(new Leap.Vector([-2, 1, -2]), frame1.translation(frame2))
      })
    })

    describe('#rotationAxis()', function(){
      it('should return the rotationAxis', function(){
        var data1 = fakeFrame({rotation: new Leap.Matrix([[0,1,2], [2,3,4], [2,3,4]])})
        var frame1 = new Leap.Frame(data1);
        var data2 = fakeFrame({rotation: new Leap.Matrix([[0,4,5], [1,3,7], [5,4,2]])})
        var frame2 = new Leap.Frame(data2);
        var result = frame1.rotationAxis(frame2);
        assert.closeTo(-0.7427813, result.x, 0.0001)
        assert.closeTo(-0.55708, result.y, 0.0001)
        assert.closeTo(-0.37139, result.z, 0.0001)
      })
    })

    describe('#rotationAngle()', function(){
      it('should return the rotationAngle', function(){
        var data1 = fakeFrame({rotation: new Leap.Matrix([[1.0,0.0,0.0], [0.0,1.0,0.0], [0.0,0.0,1.0]])})
        var frame1 = new Leap.Frame(data1);
        var data2 = fakeFrame({rotation: new Leap.Matrix([[1.0,0.0,0.0], [0.0,1.0,0.0], [0.5,0.0,0.5]])})
        var frame2 = new Leap.Frame(data2);
        var result = frame1.rotationAngle(frame2);
        assert.closeTo(0.72273, result, 0.0001)
      })
    })
  })

  describe('Hand', function() {

    describe('#translation()', function(){
      it('should return the translation', function(){
        var data1 = fakeFrame({handData: [fakeHand({translation: new Leap.Vector([1, 2, 3])})]})
        var frame1 = new Leap.Frame(data1);
        var data2 = fakeFrame({handData: [fakeHand({translation: new Leap.Vector([3, 1, 5])})]})
        var frame2 = new Leap.Frame(data2);
        assert.deepEqual(new Leap.Vector([-2, 1, -2]), frame1.hand(0).translation(frame2))
      })
    })

    describe('#rotationAxis()', function(){
      it('should return the rotationAxis', function(){
        var data1 = fakeFrame({handData: [fakeHand({rotation: new Leap.Matrix([[0,1,2], [2,3,4], [2,3,4]])})]})
        var frame1 = new Leap.Frame(data1);
        var data2 = fakeFrame({handData: [fakeHand({rotation: new Leap.Matrix([[0,4,5], [1,3,7], [5,4,2]])})]})
        var frame2 = new Leap.Frame(data2);
        var result = frame1.hand(0).rotationAxis(frame2);
        assert.closeTo(-0.74278, result.x, 0.0001)
        assert.closeTo(-0.55708, result.y, 0.0001)
        assert.closeTo(-0.37139, result.z, 0.0001)
      })
    })

    describe('#rotationAngle()', function(){
      it('should return the rotationAngle', function(){
        var data1 = fakeFrame({handData: [fakeHand({rotation: new Leap.Matrix([[1,0,0], [0,1,0], [0,0,1]])})]})
        var frame1 = new Leap.Frame(data1);
        var data2 = fakeFrame({handData: [fakeHand({rotation: new Leap.Matrix([[1,0,0], [0,1,0], [0.5,0,0.5]])})]})
        var frame2 = new Leap.Frame(data2);
        var result = frame1.hand(0).rotationAngle(frame2);
        assert.closeTo(0.72273, result, 0.0001)
      })
    })
  })
})
