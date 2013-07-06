describe('InteractionBox', function(){
  describe('#new', function(){
    it('should return a new interaction box', function() {
      var box = new Leap.InteractionBox({center:[2,3,4], size:[4,5,6]});
      assert.equal(4, box.width);
      assert.equal(5, box.height);
      assert.equal(6, box.depth);
    })
  })

  describe('#normalizePoint', function(){
    it('should normalize a point', function() {
      var box = new Leap.InteractionBox({center:[2,3,4], size:[4,5,6]});
      var point = box.normalizePoint([3,4,5])
      assert.closeTo(0.75, point[0], 0.1);
      assert.closeTo(0.70, point[1], 0.1);
      assert.closeTo(0.66, point[2], 0.1);
    })

    it('should normalize a point but clamp', function() {
      var box = new Leap.InteractionBox({center:[2,3,4], size:[4,5,6]});
      var point = box.normalizePoint([10,-20,20], true)
      assert.equal(1, point[0]);
      assert.equal(0, point[1]);
      assert.equal(1, point[2]);
    })
  })

  describe('#denormalizePoint', function(){
    it('should denormalize a point', function() {
      var box = new Leap.InteractionBox({center:[2,3,4], size:[4,5,6]});
      var point = box.denormalizePoint([0.75,0.70,0.66])
      assert.closeTo(3, point[0], 0.1);
      assert.closeTo(4, point[1], 0.1);
      assert.closeTo(5, point[2], 0.1);
    })

  })
})
