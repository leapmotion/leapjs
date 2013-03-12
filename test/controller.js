describe('Controller', function(){
  describe('#new', function(){
    it('should allow passing in options', function(done) {
      var controller = fakeController({enableGestures:true})
      controller.connection.send = function(message) {
        if (message == '{"enableGestures":true}') {
          done();
        }
      }
      controller.connect()
    })
  });

  describe('#connect', function(){
    it('should pump frames', function(done) {
      var controller = fakeController()
      var count = 0
      controller.on('frame', function(frame) {
        count++;
        if (count == 3) {
          done()
        }
      })
      controller.on('ready', function() {
        controller.processFrame(fakeFrame())
        controller.processFrame(fakeFrame())
        controller.processFrame(fakeFrame())
      })
      controller.connect()
    })

    it('should fire a "connect" event', function(done) {
      var controller = fakeController()
      controller.on('ready', done)
      controller.connect()
    })
  });

  describe('#disconnect', function() {
    it('should fire a "disconnect" event', function(done) {
      var controller = fakeController()
      controller.on('disconnect', done)
      controller.on('ready', function() {
        controller.disconnect()
      })
      controller.connect()
    })
  })
})
