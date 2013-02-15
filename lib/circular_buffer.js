var CircularBuffer = exports.CircularBuffer = function(size) {
  this.pos = 0
  this._buf = []
  this.size = size
}

CircularBuffer.prototype.get = function(i) {
  if (i == undefined) i = 0;
  if (i > this.size) return null;
  if (i > this._buf.length) return null;
  return this._buf[this.pos - i % this.length]
}

CircularBuffer.prototype.push = function(o) {
  this._buf[this.pos % this.length] = o
  this.pos++
}
