describe('CircularBuffer', function(){
  describe('#push', function(){
    it('should allow pushing elements', function(){
      var buf = new Leap.CircularBuffer(10);
      buf.push(1)
      buf.push(2)
      buf.push(3)
      assert.equal(3, buf.get())
      assert.equal(2, buf.get(1))
      assert.equal(1, buf.get(2))
      assert.equal(undefined, buf.get(3))
    })
  })

  describe('overflowing', function(){
    it('should return elements after its overflowed', function(){
      var buf = new Leap.CircularBuffer(10);
      for (var i = 0; i != 20; i++) {
        buf.push(i)
      }
      assert.equal(19, buf.get())
      assert.equal(18, buf.get(1))
      assert.equal(undefined, buf.get(10))
    })
  })
})
