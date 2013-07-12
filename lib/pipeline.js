var _ = require("underscore");

var Pipeline = module.exports = function() {
  this.steps = [];
}

Pipeline.prototype.addStep = function(step) {
  this.steps.push(step);
}

Pipeline.prototype.run = function(frame) {
  _.each(this.steps, function(step) {
    if (!frame) return;
    frame = step(frame);
  });
  return frame;
}
