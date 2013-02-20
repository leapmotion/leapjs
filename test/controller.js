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
})
