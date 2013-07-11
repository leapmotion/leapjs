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
        connection.disconnect()
        done()
      })
      connection.connect()
    })
  })

  describe('#connect', function(){
    it('should fire a "connect" event', function(done){
      var controller = fakeController()
      var connection = controller.connection
      connection.on('ready', function() {
        connection.disconnect()
        done()
      })
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

  if (typeof(window) === 'undefined') {
    describe('heartbeating', function(){
      it('should heartbeat', function(done){
        var controller = fakeController({enableHeartbeat: true, version: 2})
        var connection = controller.connection
        connection.on('focus', function() {
          setTimeout(function() {
            assert.equal('{"heartbeat":true}', connection.socket.messages[connection.socket.messages.length - 1]);
            connection.disconnect();
            done();
          }, 200);
        })
        connection.connect()
      })
    })
  }
})
