describe('Bone', function(){
  describe("properties", function() {
    var frame = fakeActualFrame();
    var bone = frame.hands[0].fingers[0].bones[0];

    it('should have nextJoint', function() { assert.property(bone, 'nextJoint')  });
    it('should have prevJoint', function() { assert.property(bone, 'prevJoint')  });
    it('should have basis', function()     { assert.property(bone, 'basis')      });
    it('should have length', function()    { assert.property(bone, 'length')     });
    it('should have width', function()     { assert.property(bone, 'width')      });
    it('should have direction', function() { assert.property(bone, 'direction')  });
    it('should have matrix', function()    { assert(bone.matrix().length == 16)  });
    it('should have finger', function()    { assert.property(bone, 'finger')     });

    it('center() should return a vec3', function(){ assert(bone.center().length == 3) });


  });
});
