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
      var controller = fakeController({suppressAnimationLoop: true, frameEventName: 'animationFrame'})
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

  describe('device events', function() {
    it('should fire deviceAttached/Removed ', function(done) {
	    var controller = fakeController({version: 5});
      var count = 0;
      
	    controller.on('protocol', function(protocol) {
	      assert.equal(5, protocol.version);
		    controller.disconnect();
		    done();
	    });
	    
	    controller.on('ready', function(protocol) {
	      controller.connection.handleData(JSON.stringify({event: {type:'deviceEvent', state: { type: 'peripheral', streaming: false, attached: true}}}));
		    controller.connection.handleData(JSON.stringify({event: {type:'deviceEvent', state: { type: 'peripheral', streaming: false, attached: false}}}));
	    });
	    
      var assertFalseFunc = function(deviceInfo) {
        assert.equal(true,false); //I'm sure there's a better way to do this...
      };
      
      controller.on('deviceStreaming', assertFalseFunc);
      controller.on('deviceStopped', assertFalseFunc);
      controller.on('streamingStarted', assertFalseFunc);
      controller.on('streamingStopped', assertFalseFunc);
      controller.on('deviceAttached', function(deviceInfo) {
        count++;
      });
	    controller.on('deviceRemoved', function(deviceInfo) {
	      assert.equal('peripheral', deviceInfo.type);
        assert.equal(count, 1);
	    });
      
	    controller.connect();
    });
    
    it('should fire both deviceAttached AND deviceStreaming', function(done) {
      var controller = fakeController({version: 5});
      var count = 0;
      
	    controller.on('protocol', function(protocol) {
	      assert.equal(5, protocol.version);
		    controller.disconnect();
	    });
	    
	    controller.on('ready', function(protocol) {
	      controller.connection.handleData(JSON.stringify({event: {type:'deviceEvent', state: { type: 'peripheral', streaming: true, attached: true}}}));
	    });
	    
      //This shouldn't happen since we're emulating a pre-existing device
      controller.on('deviceConnected', function() {
        assert.equal(true,false);
      });
      
	    controller.on('deviceAttached', function(deviceInfo) {
	      assert.equal(count, 0);
        count++;
	    });
      controller.on('deviceStreaming', function(deviceInfo) {
       assert.equal(count, 1);
       count++;
      });
      controller.on('streamingStarted', function(deviceInfo) {
        assert.equal(count, 2);
        done();
      });
 
	    controller.connect();
    });

    it('Should fire deviceConnected & deviceRemoved', function(done) {
      var controller = fakeController({version: 5});
      var count = 0;
      
      controller.on('protocol', function(protocol) {
        assert.equal(5, protocol.version);
        controller.disconnect();
      });
      
      controller.on('ready', function(protocol) {
        controller.connection.handleData(JSON.stringify({event: {type:'deviceEvent', state: {
        type: 'peripheral', streaming: false, attached: true}}}));
        controller.connection.handleData(JSON.stringify({event: {type:'deviceEvent', state: {
        type: 'peripheral', streaming: true, attached: true}}}));
        controller.connection.handleData(JSON.stringify({event: {type:'deviceEvent', state: {
        type: 'peripheral', streaming: false, attached: false}}}));
      });
      
      controller.on('deviceConnected', function() {
        assert.equal(count, 0);
        count++;
      });
      controller.on('deviceDisconnected', function() {
        assert.equal(count, 1);
        done();
      });
      
      controller.connect();
    });
  });
})
