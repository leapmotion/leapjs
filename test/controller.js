describe('Controller', function(){

  describe('#new', function(){
    it('should allow passing in options', function(done) {
      var controller = fakeController({"background":true})
      controller.connection.send = function(message) {
        if (message == '{"background":true}') {
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

    it('should respond to streaming', function () {
      var controller = fakeController()
      assert.equal(controller.streaming(), false);
      controller.connect()
      controller.on('streamingStarted', function () {
        assert.equal(controller.streaming(), true);
        controller.disconnect()
      });
      controller.on('streamingStopped', function () {
        assert.equal(controller.streaming(), false);
      });
    });

    it('should respond to connected', function(){
      var controller = fakeController()
      assert.equal(controller.connected(), false);
      controller.connect()
      controller.on('ready', function() {
        assert.equal(controller.connected(), true);
      });
    });
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

  describe('frame events', function(){
    it('should fire hand events for frames', function(done){
      this.timeout(500);

      var controller = fakeController();
      var handCount = 0;
      controller.on('hand', function(hand){
        handCount++;
        console.assert(hand.fingers, hand, "is invalid");
        if (handCount == 2){
          done();
        }
      });
      controller.processFrame(fakeFrame({hands: 2}));
    });

    it('should allow frame and hand event binding as options', function(done){
      this.timeout(500);
      var frameCount = 0;
      var handCount = 0;

      var controller = fakeController({
        frame: function(frame){
          frameCount++;
          console.assert(frame.hands, frame, "is invalid");
        },
        hand: function(hand){
          handCount++;
          console.assert(hand.fingers, hand, "is invalid");
          if (handCount == 2 && frameCount == 1){
            done();
          }
        }
      });
      controller.processFrame(fakeFrame({hands: 2}));
    });

    it('should work with leap.loop', function(done){
      this.timeout(500);
      Leap.loopController = fakeController();
      Leap.loop({
        hand: function(){
          done();
          Leap.loopController = null;
        }
      });
      Leap.loopController.processFrame(fakeFrame({hands: 1}));
    });

    it('should work with leap.loop and options', function(done){
      this.timeout(500);
      Leap.loopController = fakeController();
      Leap.loop({background: true}, {
        hand: function(){
          done();
          Leap.loopController = null;
        }
      });
      Leap.loopController.processFrame(fakeFrame({hands: 1}));
    });

    it('should work with leap.loop and no arguments', function(done){
      this.timeout(500);
      Leap.plugin('test', function(){
        return {
          frame: function(){
            console.log('frame');
            done();
            Leap.loopController = null;
          }
        }
      });
      Leap.loopController = fakeController();
      Leap.loop().use('test');
      Leap.Controller._pluginFactories = {};
      Leap.loopController.processFrame(fakeFrame({hands: 1}));
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

  describe('version warning [browser-only]', function(){
    it ('should fire no warning by default', function(done){
      this.timeout(500);

      var controller = fakeController({version: 6}).connect();
      controller.on('ready', function(){
        assert(controller.checkOutOfDate() == false, 'Should not show version warning dialog');
        done();
      });
    });

    it ('should fire warning when out of date', function(done){
      this.timeout(500);

      var controller = fakeController({version: 5}).connect();
      controller.on('ready', function(){
        assert(controller.checkOutOfDate() == true, 'Should show version warning dialog');
        done();
      });
    });

  });

  describe('plugins', function(){
    Leap.Controller._pluginFactories = {}
    it('should register plugins', function(){
      Leap.Controller.plugin('testPlugin', fakePluginFactory());
      assert.equal(Leap.Controller.plugins()[0], 'testPlugin');
      Leap.Controller._pluginFactories = {}
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
      Leap.Controller._pluginFactories = {}
    });

    it('should list plugins being used', function(){
      Leap.Controller._pluginFactories = {}
      Leap.Controller.plugin('testPlugin', fakePluginFactory());

      var scope = {color: 'blue'};
      var plugins = fakeController()
        .use('testPlugin', scope)
        .plugins;

      assert.equal(plugins.testPlugin, scope);
      Leap.Controller._pluginFactories = {}
    });

    it('should merge options when re-using', function(){
      Leap.Controller._pluginFactories = {}
      Leap.Controller.plugin('testPlugin', fakePluginFactory());

      var scope = {color: 'blue'};
      var plugins = fakeController()
        .use('testPlugin', scope)
        .use('testPlugin', {color: 'red'})
        .plugins;

      assert.equal(plugins.testPlugin, scope);
      assert.equal(scope.color, 'red');
      Leap.Controller._pluginFactories = {}
    });

    it('should list plugins being used after stopping using a plugin', function(){
      Leap.Controller._pluginFactories = {}
      Leap.Controller.plugin('testPlugin', fakePluginFactory());

      var plugins = fakeController()
        .use('testPlugin')
        .stopUsing('testPlugin')
        .plugins;

      assert.equal(plugins.testPlugin, undefined);
      Leap.Controller._pluginFactories = {}
    });

    describe('use', function () {
      it('should accept plugin factories directly', function () {
        var controller = fakeController()
        controller.use(function (options) {
          assert.equal(options.x, 2)
          return {}
        }, {x: 2})
      });
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
      Leap.Controller._pluginFactories = {}
    });

    it('should stop decorating hands, fingers, and pointables', function(){
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

      var controller = fakeController();
      controller.use('testPlugin')
      controller.on('frame', function(frame){
        assert.equal(frame.hands[0].idWithExclamation, undefined)
        assert.equal(frame.fingers[0].testFinger, undefined)
        assert.equal(frame.pointables[0].testPointable, undefined)
      });
      controller.connect();
      controller.stopUsing('testPlugin');
      controller.processFrame(fakeFrame({hands: 1, fingers: 1}))
      Leap.Controller._pluginFactories = {}
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
        },
        finger: {
          testFnFinger: function(){
            return 'finger';
          }
        }
      }));
      var controller = fakeController()
      controller.use('testPlugin')
      // our test doubles are not actual instances of the class, so we test the prototype
      assert.equal(Leap.Frame.prototype.testFn(), 'frame');
      assert.equal(Leap.Frame.Invalid.testFn(), 'frame');

      assert.equal(Leap.Hand.prototype.testFn(), 'hand');
      assert.equal(Leap.Hand.Invalid.testFn(), 'hand');

      assert.equal(Leap.Pointable.prototype.testFn(), 'pointable');
      assert.equal(Leap.Pointable.Invalid.testFn(), 'pointable');

      assert.equal(Leap.Finger.prototype.testFnFinger(), 'finger');
      assert.equal(Leap.Finger.Invalid.testFnFinger(), 'finger');

      Leap.Controller._pluginFactories = {}
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
      Leap.Controller._pluginFactories = {}
    });

    it('should stop extending frame, hand, and pointable prototypes', function(){
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
        },
        finger: {
          testFnFinger: function(){
            return 'pointable';
          }
        }
      }));
      var controller = fakeController();
      controller.use('testPlugin');
      controller.stopUsing('testPlugin');
      // our test doubles are not actual instances of the class, so we test the prototype
      assert.equal(Leap.Frame.prototype.testFn, undefined);
      assert.equal(Leap.Frame.Invalid.testFn, undefined);

      assert.equal(Leap.Hand.prototype.testFn, undefined);
      assert.equal(Leap.Hand.Invalid.testFn, undefined);

      assert.equal(Leap.Pointable.prototype.testFn, undefined);
      assert.equal(Leap.Pointable.Invalid.testFn, undefined);

      assert.equal(Leap.Finger.prototype.testFnFinger, undefined);
      assert.equal(Leap.Finger.Invalid.testFnFinger, undefined);
      Leap.Controller._pluginFactories = {}
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
      Leap.Controller._pluginFactories = {}
    });
  });

  describe('method chaining', function(){
    it('should return a controller from .connect()', function(){
      var controller = fakeController();
      assert.equal(controller.connect(), controller);
    });

    it('should return a controller from .on()', function(){
      var controller = fakeController();
      assert.equal(controller.on('frame', function(){}), controller);
    });

    it('should return a controller from .use()', function(){
      Leap.Controller._pluginFactories = {}
      Leap.plugin('testPlugin', fakePluginFactory({
        frame: function(frame){
          frame.foo = 'bar'
        }
      }));
      var controller = new Leap.Controller

      assert.equal(controller.use('testPlugin'), controller);
      Leap.Controller._pluginFactories = {}
    });

    it('should return a controller from .stopUsing()', function(){
      Leap.Controller._pluginFactories = {}
      Leap.plugin('testPlugin', fakePluginFactory({
        frame: function(frame){
          frame.foo = 'bar'
        }
      }));
      var controller = new Leap.Controller
      controller.use('testPlugin');
      assert.equal(controller.stopUsing('testPlugin'), controller);
      Leap.Controller._pluginFactories = {}
    });

    it('should return a controller from .disconnect()', function(){
      var controller = new Leap.Controller;
      assert.equal(controller.disconnect(), controller);
    });

    it('should return a controller from .setBackground()', function(){
      var controller = new Leap.Controller;
      assert.equal(controller.setBackground(true), controller);
    });

    it('should return a controller from .optimizeHMD()', function(){
      var controller = new Leap.Controller;
      assert.equal(controller.setOptimizeHMD(true), controller);
    });


  })
})
