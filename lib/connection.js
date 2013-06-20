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
  delete this.socket;
  delete this.protocol;
}

Connection.prototype.startHeartbeat = function() {
  if (this.heartbeatTimer) return;
  if (!this.protocol.sendHeartbeat) return;
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

  window.previousOnfocus = window.onfocus;
  window.previousOnblur = window.onblur;
  window.onfocus = function() {
    if (window.previousOnfocus) window.previousOnfocus();
    windowVisible = true;
  }
  window.onblur = function() {
    if (window.previousOnblur) window.previousOnblur();
    windowVisible = false;
  }
  this.on('disconnect', function() {
    window.onfocus = window.previousOnfocus;
    window.onblur = window.previousOnblur;
    delete window.previousOnfocus;
    delete window.previousOnblur;
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
