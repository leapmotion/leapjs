var Frame = require('./frame')
  , WebSocket = require('ws')

var Connection = module.exports = require('./base_connection')

Connection.prototype.setupSocket = function() {
  var connection = this;
  var socket = new WebSocket(this.getUrl());
  socket.on('open', function() { connection.handleOpen() });
  socket.on('message', function(m) { connection.handleData(m) });
  socket.on('close', function() { connection.handleClose() });
  socket.on('error', function() { connection.startReconnection() });
  return socket;
}

Connection.prototype.startHeartbeat = function() {
  if (!this.protocol.sendHeartbeat || this.heartbeatTimer) return;
  var connection = this;
  var heartbeatTimer = setInterval(function() {
    connection.sendHeartbeat();
  }, this.opts.heartbeatInterval);
}
