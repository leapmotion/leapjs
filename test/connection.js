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

  describe('#connect', function(){
    it('should fire a "connect" event', function(done){
      var controller = new Leap.Controller()
      var connection = controller.connection
      connection.createSocket = function() { this.socket = { } }

      connection.on('connect', done)

      connection.connect()
    })
  })

  describe('#disconnect', function(){
    it('should fire a "disconnect" event', function(done){
      var controller = new Leap.Controller()
      var connection = controller.connection
      connection.createSocket = function() { this.socket = { } }

      connection.on('disconnect', done)
      connection.on('connect', function() {
        connection.disconnect()
      })

      connection.connect()
    })
  })
})
