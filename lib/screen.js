var Screen = exports.Screen = function(input, opts) {
  if (input.clientWidth && input.clientHeight) {
    this.width = input.clientWidth
    this.height = input.clientHeight
  } else {
    this.width = input[0]
    this.height = input[1]
  }
  var size = opts && opts.size ? opts.size : 5
  var max = Math.max(this.width, this.height);
  this.isX = (this.width / max) * size;
  this.isY = (this.height / max) * size;
}

Screen.prototype.translate = function(vec) {
  var x = vec[0], y = vec[1], z = vec[2];
  if (x + this.isX < 0) x = -this.isX;
  if (y + this.isY < 0) y = -this.isY;
  if (x - this.isX > 0) x = this.isX;
  if (y - this.isY > 0) y = this.isY;

  return [
    Math.round(((x + this.isX) / (this.isX * 2)) * el.clientWidth),
    Math.round(((this.isY - y) / (this.isY * 2)) * el.clientHeight),
    z
  ];
}
