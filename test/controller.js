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

  describe('events', function() {
    it('should fire a protocol event', function(done) {
      var controller = fakeController()
      controller.on('protocol', function(protocol) {
        assert.equal(4, protocol.version);
        controller.disconnect();
        done();
      });
      controller.connect()
    });

    it('should fire a connection event when using protocol 4', function(done) {
      var controller = fakeController({version: 4})
      controller.on('ready', function(protocol) {
        controller.connection.handleData(JSON.stringify({event: {type: 'deviceConnect', state: true}}));
      });
      controller.on('deviceConnected', function() {
        controller.connection.handleData(JSON.stringify({event: {type: 'deviceConnect', state: false}}));
      });
      controller.on('deviceDisconnected', function() {
        done();
      });
      controller.connect()
    });
  });

  describe('plugins', function(){
    Leap.Controller._pluginFactories = {}
    it('should register plugins', function(){
      Leap.Controller.plugin('testPlugin', fakePluginFactory());
      assert.equal(Leap.Controller.plugins()[0], 'testPlugin');
    });

    it('should decorate frames', function(){
      Leap.Controller._pluginFactories = {}
      Leap.Controller.plugin('testPlugin', fakePluginFactory({
        frame: function(frame){
          frame.foo = 'bar'
        }
      }));

      var controller = fakeController()
      controller.use('testPlugin')
      controller.on('frame', function(frame){
        assert.equal(frame.foo, 'bar')
      });
      controller.connect();
      controller.processFrame(fakeFrame())
    });

    it('should decorate hands, fingers, and pointables', function(){
      Leap.Controller._pluginFactories = {}
      Leap.Controller.plugin('testPlugin', fakePluginFactory({
        frame: function(frame){
          frame.foo = 'bar'
        },
        hand: function(hand){
          hand.idWithExclamation = hand.id + '!'
        },
        finger: function(finger){
          finger.testFinger = true
        },
        pointable: function(pointable){
          pointable.testPointable = true
        }
      }));

      var controller = fakeController()
      controller.use('testPlugin')
      controller.on('frame', function(frame){
        assert.equal(frame.hands[0].idWithExclamation, '0!')
        assert.equal(frame.fingers[0].testFinger, true)
        assert.equal(frame.pointables[0].testPointable, true)
      });
      controller.connect();
      controller.processFrame(fakeFrame({hands: 1, fingers: 1}))
    });

    it('should extend frame, hand, and pointable prototypes', function(){
      Leap.Controller._pluginFactories = {}
      Leap.Controller.plugin('testPlugin', fakePluginFactory({
        frame: {
          testFn: function(){
            return 'frame';
          }
        },
        hand: {
          testFn: function(){
            return 'hand';
          }
        },
        pointable: {
          testFn: function(){
            return 'pointable';
          }
        }
      }));
      var controller = fakeController()
      controller.use('testPlugin')
      // our test doubles are not actual instances of the class, so we test the prototype
      assert.equal(Leap.Frame.prototype.testFn(), 'frame')
      assert.equal(Leap.Hand.prototype.testFn(), 'hand')
      assert.equal(Leap.Pointable.prototype.testFn(), 'pointable')
    });

    it('should use registered plugins when the flag is set', function(){
      Leap.Controller._pluginFactories = {}
      Leap.plugin('testPlugin', fakePluginFactory({
        frame: function(frame){
          frame.foo = 'bar'
        }
      }));

      var controller = fakeController({useAllPlugins: true})
      controller.on('frame', function(frame){
        assert.equal(frame.foo, 'bar')
      });
      controller.connect();
      controller.processFrame(fakeFrame())
    });
  });
})