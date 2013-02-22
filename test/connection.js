describe('Connection', function(){
  describe('#new', function(){
    it('should return a connection that pumps events', function(){
      var controller = new Leap.Controller()
      var connection = controller.connection
      connection.createSocket = function() { this.socket = { } }
      connection.connect()
      connection.handleData(JSON.stringify({version: 1}))
      connection.handleData(JSON.stringify(fakeFrame({id:123})))
      assert.equal(123, controller.lastFrame.id)
    })
  })
})
