describe('Frame', function(){
  describe('#finger()', function(){
    it('should return a valid finger when requested', function(){
      var data = fakeFrame({fingers: 2})
      var frame = new Leap.Frame(data);
      assert.equal(2, frame.fingers.length);
      assert(frame.finger(0).valid);
      assert(frame.finger(1).valid);
    })

    it('should return an invalid finger when an invalid finger is requested', function(){
      var data = fakeFrame()
      var frame = new Leap.Frame(data);
      assert.equal(0, frame.fingers.length);
      assert.equal(false, frame.finger(0).valid);
    })
  })

  describe('#fingers', function(){
    it('should return a list of fingers', function(){
      var data = fakeFrame({fingers: 2})
      var frame = new Leap.Frame(data);
      assert.equal(2, frame.fingers.length);
      assert(frame.fingers[0].valid);
      assert(frame.fingers[1].valid);
    })
  })

  describe('#hand()', function(){
    it('should return a valid hand when requested', function(){
      var data = fakeFrame({hands: 1})
      var frame = new Leap.Frame(data);
      assert.equal(1, frame.hands.length);
      assert(frame.hand(0).valid);
    })

    it('should return an invalid hand when an invalid hand is requested', function(){
      var data = fakeFrame()
      var frame = new Leap.Frame(data);
      assert.equal(0, frame.hands.length);
      assert.equal(false, frame.hand(0).valid);
    })
  })

  describe('#hands', function(){
    it('should return a list of valid hands', function(){
      var data = fakeFrame({hands:1})
      var frame = new Leap.Frame(data);
      assert.equal(1, frame.hands.length);
      assert(frame.hands[0].valid);
    })
  })
})
