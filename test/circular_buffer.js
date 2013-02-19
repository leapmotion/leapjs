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
})
