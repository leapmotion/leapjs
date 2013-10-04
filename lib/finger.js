var Pointable = require('./pointable')
  , _ = require('underscore');

var Finger = module.exports = function(data) {
  Pointable.call(this, data); // use pointable as super-constructor
  this.dipPosition = data.dipPosition;
  this.pipPosition = data.pipPosition;
  this.mcpPosition = data.mcpPosition;
  this.extended = data.extended;
  this.type = data.type;
  this.finger = true;
  this.positions = [this.mcpPosition, this.pipPosition, this.dipPosition, this.tipPosition];
};

_.extend(Finger.prototype, Pointable.prototype);

Finger.prototype.toString = function() {
  if(this.tool == true){
    return "Finger [ id:" + this.id + " " + this.length + "mmx | with:" + this.width + "mm | direction:" + this.direction + ' ]';
  } else {
    return "Finger [ id:" + this.id + " " + this.length + "mmx | direction: " + this.direction + ' ]';
  }
};

Finger.Invalid = { valid: false };
