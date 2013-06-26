var Connection = exports.Connection = require('./base_connection').Connection

Connection.prototype.setupSocket = function() {
  var connection = this;
  var socket = new WebSocket("ws://" + this.host + ":" + this.port);
  socket.onopen = function() { connection.handleOpen() };
  socket.onmessage = function(message) { connection.handleData(message.data) };
  socket.onclose = function() { connection.handleClose() };
  return socket;
}

Connection.prototype.teardownSocket = function() {
  this.socket.close();
}

Connection.prototype.startHeartbeat = function() {
  if (!this.protocol.sendHeartbeat || this.heartbeatTimer) return;
  var connection = this;
  var propertyName = null;
  if (typeof document.hidden !== "undefined") {
    propertyName = "hidden";
  } else if (typeof document.mozHidden !== "undefined") {
    propertyName = "mozHidden";
  } else if (typeof document.msHidden !== "undefined") {
    propertyName = "msHidden";
  } else if (typeof document.webkitHidden !== "undefined") {
    propertyName = "webkitHidden";
  } else {
    propertyName = "hidden";
  }

  var windowVisible = true;

  var focusListener = window.addEventListener('focus', function(e) { windowVisible = true; });
  var blurListener = window.addEventListener('blur', function(e) { windowVisible = false; });

  this.on('disconnect', function() {
    window.removeEventListener(focusListener);
    window.removeEventListener(blurListener);
  });

  this.heartbeatTimer = setInterval(function() {
    var isVisible = document[propertyName] === false;
    if (isVisible && windowVisible) {
      connection.sendHeartbeat();
    } else {
      connection.setHeartbeatState(false);
    }
  }, this.opts.heartbeatInterval);
}
