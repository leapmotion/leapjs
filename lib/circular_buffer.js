var CircularBuffer = exports.CircularBuffer = function(size) {
  this.pos = 0
  this._buf = []
  this.size = size
}

CircularBuffer.prototype.get = function(i) {
  if (i == undefined) i = 0;
  if (i >= this.size) return undefined;
  if (i >= this._buf.length) return undefined;
  return this._buf[this.pos - i % this._buf.length - 1]
}

CircularBuffer.prototype.push = function(o) {
  this._buf[this.pos % this.size] = o
  this.pos++
  return o
}
