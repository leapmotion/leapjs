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
      controller.on('disconnect', done);
      controller.on('frame', function(frame) {
        count++;
        if (count == 3) {
          controller.disconnect()
        }
      })
      controller.on('ready', function() {
        controller.processFrame(fakeFrame())
        controller.processFrame(fakeFrame())
        controller.processFrame(fakeFrame())
      })
      controller.connect()
    })
  });

  describe('#disconnect', function() {
    it('should fire a "disconnect" event', function(done) {
      var controller = fakeController()
      controller.on('disconnect', done);
      controller.on('ready', function() {
        controller.disconnect()
      })
      controller.connect()
    })
  })

  describe('accumulating gestures', function() {
    it('should accumulate gestures', function(done) {
      var controller = fakeController({supressAnimationLoop: true, frameEventName: 'animationFrame'})
      var count = 0
      controller.on('animationFrame', function(frame) {
        assert.equal(7, frame.gestures.length);
        controller.disconnect();
        done();
      });

      controller.on('ready', function() {
        controller.connection.handleData(JSON.stringify(fakeFrame({gestures:[fakeGesture()]})));
        controller.connection.handleData(JSON.stringify(fakeFrame({gestures:[fakeGesture(), fakeGesture()]})));
        controller.connection.handleData(JSON.stringify(fakeFrame({gestures:[fakeGesture(), fakeGesture(), fakeGesture(), fakeGesture()]})));

        setTimeout(function() {
          controller.emit('animationFrame', controller.lastConnectionFrame)
        }, 50)
      });
      controller.connect()
    });
  });
})
