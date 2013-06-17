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
  window.previousOnfocus = window.onfocus ? window.onfocus : null;
  window.previousOnblur = window.onblur ? window.onblur : null;
  var windowVisible = document[propertyName] === false;
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
    if (isVisible) connection.sendHeartbeat();
  }, this.opts.heartbeatInterval);
}
