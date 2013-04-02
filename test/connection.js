describe('Connection', function(){
  describe('#new', function(){
    it('should return a connection that pumps events', function(done) {
      var controller = fakeController()
      var connection = controller.connection
      controller.on('ready', function() {
        connection.handleData(JSON.stringify(fakeFrame({id:123})))
      })
      controller.on('frame', function() {
        assert.equal(123, controller.lastFrame.id)
        done()
      })
      connection.connect()
    })
  })

  describe('#connect', function(){
    it('should fire a "connect" event', function(done){
      var controller = fakeController()
      var connection = controller.connection
      connection.on('ready', done)
      connection.connect()
    })
  })

  describe('#disconnect', function(){
    it('should fire a "disconnect" event', function(done){
      var controller = fakeController()
      var connection = controller.connection
      connection.on('disconnect', function() {
        assert.isUndefined(connection.socket);
        assert.isUndefined(connection.protocol);
        done();
      });
      connection.on('ready', function() {
        assert.isDefined(connection.socket);
        assert.isDefined(connection.protocol);
        connection.disconnect()
      })
      connection.connect()
    })
  })
})
