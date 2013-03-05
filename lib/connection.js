var Connection = exports.Connection = require('./base_connection').Connection

Connection.prototype.setupSocket = function() {
  var connection = this;
  var socket = new WebSocket("ws://" + this.host + ":6437");
  socket.onopen = function() { connection.handleOpen() };
  socket.onmessage = function(message) { connection.handleData(message.data) };
  socket.onclose = function() { connection.handleClose() };
  return socket;
}
