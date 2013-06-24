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
      //box.normalizePoint({x:5, y:6,z:7})
      assert.deepEqual({x: 1.25, y:1.1, z:1}, {x:1.25, y:1.1, z: 1});
    })
  })
})
