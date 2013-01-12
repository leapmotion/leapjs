var multiply = function(vec, c) {
  return [vec[0] * c, vec[1] * c, vec[2] * c]
};

var normalize = function(vec) {
  var denom = vec[0]*vec[0] + vec[1]*vec[1] + vec[2]*vec[2];
  if (denom <= 0) return [0,0,0];
  var c = 1.0 / Math.sqrt(denom);
  return multiply(vec, c);
}

var Motion = exports.Motion = {
  matrix: function() {
    if (this._matrix) return this._matrix;
    return this._matrix = $M(this.rotation);
  },
  translation: function(fromFrame) {
    if (!this.valid || !fromFrame.valid) {
      return [0, 0, 0];
    }
    return [ this._translation[0] - fromFrame._translation[0],
             this._translation[1] - fromFrame._translation[1],
             this._translation[2] - fromFrame._translation[2] ];
  },
  rotationAxis: function(fromFrame) {
    if (!this.valid || !fromFrame.valid) return [0, 0, 0];
    var vec = [ this.rotation[2][1] - fromFrame.rotation[1][2],
                this.rotation[0][2] - fromFrame.rotation[2][0],
                this.rotation[1][0] - fromFrame.rotation[0][1] ];
    return normalize(vec);
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
    return this.matrix().transpose().multiply(fromFrame.matrix());
  },
  scaleFactor: function(fromFrame) {
    if (!this.valid || !fromFrame.valid) 1.0;
    return Math.exp(this._scaleFactor - fromFrame._scaleFactor);
  }
}
