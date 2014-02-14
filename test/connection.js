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

  describe('background in protocol 4', function(){
    it('should send background true', function(done){
      var controller = fakeController({version: 4});
      var connection = controller.connection;
      connection.setBackground(true);
      controller.on('ready', function() {
        setTimeout(function() {
          assert.include(connection.socket.messages, JSON.stringify({"background":true}));
          connection.disconnect();
          done();
        }, 100);
      })
      controller.connection.connect()
    })

    it('should send background false', function(done){
      var controller = fakeController({version: 4});
      var connection = controller.connection;
      controller.on('ready', function() {
        controller.setBackground(false);
        setTimeout(function() {
          assert.include(connection.socket.messages, JSON.stringify({"background":false}));
          connection.disconnect();
          done();
        }, 100);
      })
      controller.connection.connect()
    })

    it('should send focused true', function(done){
      var controller = fakeController({version: 4});
      var connection = controller.connection;
      controller.on('ready', function() {
        controller.setBackground(false);
        setTimeout(function() {
          assert.include(connection.socket.messages, JSON.stringify({"focused":true}));
          connection.disconnect();
          done();
        }, 100);
      })
      controller.connection.connect()
    })
  })
})
