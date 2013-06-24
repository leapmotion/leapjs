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
      console.log("point!"+box.normalizePoint([5,6,7]));
    })
  })
})
