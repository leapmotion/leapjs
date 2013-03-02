describe('Controller', function(){
  describe('#connect()', function(){
    it('should pump frames', function(done) {
      var controller = new Leap.Controller()
      var count = 0
      controller.on('frame', function() {
        count++
        if (count == 3) done()
      })
      controller.processFrame(fakeFrame())
      controller.processFrame(fakeFrame())
      controller.processFrame(fakeFrame())
    })
  })

  describe('#connect', function(){
    it('should fire a "connect" event', function(done){
      var controller = new Leap.Controller()

      controller.on('connect', done)
      controller.connect()
    })
  })

  describe('#disconnect', function() {
    it('should fire a "disconnect" event', function(done){
      var controller = new Leap.Controller()

      controller.on('disconnect', done)
      controller.on('connect', function() {
        controller.disconnect()
      })

      controller.connect()
    })
  })
})
