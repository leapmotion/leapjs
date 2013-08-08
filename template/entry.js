if (typeof(window.requestAnimationFrame) !== 'function') {
  window.requestAnimationFrame = (function() {
    return
    window.webkitRequestAnimationFrame   ||
    window.mozRequestAnimationFrame      ||
    window.oRequestAnimationFrame        ||
    window.msRequestAnimationFrame       ||
    function(callback) { setTimeout(callback, 1000 / 60); }
  })();
}

Leap = require("../lib/index");
