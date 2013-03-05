var Pipeline = exports.Pipeline = function() {
  this.steps = [];
}

Pipeline.prototype.addStep = function(step) {
  this.steps.push(step);
}

Pipeline.prototype.run = function(frame) {
  var stepsLength = this.steps.length;
  for (var i = 0; i != stepsLength; i++) {
    if (!frame) break;
    frame = this.steps[i](frame);
  }
  return frame;
}
