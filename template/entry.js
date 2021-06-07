if (typeof (window) !== 'undefined'){
  if (typeof (window.requestAnimationFrame) !== 'function') {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) { setTimeout(callback, 1000 / 60); }
    );
  }
  window.Leap = require("../lib/index");
} else {
  Leap = require("../lib/index");
}
