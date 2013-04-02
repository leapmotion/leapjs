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