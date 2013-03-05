var Frame = require('./frame').Frame
  , WebSocket = require('ws')

var Connection = exports.Connection = require('./base_connection').Connection

Connection.prototype.setupSocket = function() {
  var connection = this;
  var socket = new WebSocket("ws://" + this.host + ":6437");
  socket.on('open', function() { connection.handleOpen() });
  socket.on('message', function(m) { connection.handleData(m) });
  socket.on('close', function() { connection.handleClose() });
  socket.on('error', function() { connection.startReconnection() });
  return socket;
}
