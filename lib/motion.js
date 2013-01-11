var Vec3 = function(opts) {
  this.x = 0, this.y = 0, this.z = 0;
  if (opts) {
    if (opts.x) this.x = opts.x;
    if (opts.y) this.y = opts.y;
    if (opts.z) this.z = opts.z;
  }
}

Vec3.prototype.normalize = function() {
  var denom = this.x*this.x + this.y*this.y + this.z*this.z;
  if (denom <= 0) return new Vec3();
  var c = 1.0 / Math.sqrt(denom);
  return this.multiply(c);
}

Vec3.prototype.multiply = function(c) {
  return new Vec3({x: this.x * c, y: this.y * c, z: this.z * c})
}

var Motion = exports.Motion = {
  matrix: function() {
    if (this._matrix) return this._matrix;
    return this._matrix = $M(this.rotation);
  },
  translation: function(fromFrame) {
    if (!this.valid || !fromFrame.valid) {
      return new Vec3();
    }
    return new Vec3({x: this._translation[0] - fromFrame._translation[0],
                 y: this._translation[1] - fromFrame._translation[1],
                 z: this._translation[2] - fromFrame._translation[2] });
  },
  rotationAxis: function(fromFrame) {
    if (!this.valid || !fromFrame.valid) return {x:0, y:0, z:0};
    var vec = new Vec3({
      x: this.rotation[2][1] - fromFrame.rotation[1][2],
      y: this.rotation[0][2] - fromFrame.rotation[2][0],
      z: this.rotation[1][0] - fromFrame.rotation[0][1] })
    return vec.normalize();
  },
  rotationAngle: function(fromFrame) {
    if (!this.valid || !fromFrame.valid) return 0.0;
    var rot = this.rotationMatrix(fromFrame).elements;
    var cs = (rot[0][0] + rot[1][1] + rot[2][2] - 1.0)*0.5
    var angle = Math.acos(cs);
    return angle === NaN ? 0.0 : angle;
  },
  rotationMatrix: function(fromFrame) {
    if (!this.valid || !fromFrame.valid) $M.I(3);
    return fromFrame.matrix().multiply(this.matrix().transpose())
  },
  scaleFactor: function(fromFrame) {
    if (!this.valid || !fromFrame.valid) 1.0;
    return Math.exp(this._scaleFactor - fromFrame._scaleFactor);
  }
}
