describe('Connection', function(){
  describe('#new', function(){
    it('should return a connection that pumps events', function(){
      var frame = null;
      var connection = new Leap.Connection({frame: function(f) {
        frame = f
      }})
      connection.createSocket = function() { this.socket = { } }
      connection.connect()
      connection.socket.onmessage({data: JSON.stringify(fakeFrame({id:123}))})
      assert.equal(123, frame.id)
    })
  })
})
