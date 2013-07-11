describe('Gestures', function(){
  it("should allow single callback creation", function(done) {
    var controller = fakeController({enableGestures:true});
    controller.gesture('keyTap', function() {
      assert(this.frames[0])
      controller.disconnect();
      done()
    })
    controller.on('ready', function() {
      controller.processFrame(fakeFrame({gestures:[fakeGesture({type:'keyTap', state:'stop'})]}))
    })
    controller.connect();
  })

  it("should allow multiple callback creation", function(done) {
    var controller = fakeController({enableGestures:true});
    var states = [];
    var swiper = controller.gesture('swipe')
    .start(function() {
      states.push("start");
    })
    .stop(function() {
      assert.deepEqual(['start', 'update', 'update', 'update'], states);
      controller.disconnect();
      done();
    })
    .update(function() {
      states.push("update");
    });

    controller.on('ready', function() {
      controller.processFrame(fakeFrame({gestures:[fakeGesture({type:'swipe', state:'start'})]}))
      controller.processFrame(fakeFrame({gestures:[fakeGesture({type:'swipe', state:'update'})]}))
      controller.processFrame(fakeFrame({gestures:[fakeGesture({type:'swipe', state:'update'})]}))
      controller.processFrame(fakeFrame({gestures:[fakeGesture({type:'swipe', state:'update'})]}))
      controller.processFrame(fakeFrame({gestures:[fakeGesture({type:'swipe', state:'stop'})]}))
    })

    controller.connect();
  })
})
