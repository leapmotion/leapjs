var WebSocket = require('ws')
  , BaseConnection = require('./base');

var NodeConnection = module.exports = function(opts) {
  BaseConnection.call(this, opts);
}

_.extend(NodeConnection.prototype, BaseConnection.prototype);

NodeConnection.prototype.setupSocket = function() {
  var connection = this;
  var socket = new WebSocket(this.getUrl());
  socket.on('open', function() { connection.handleOpen(); });
  socket.on('message', function(m) { connection.handleData(m); });
  socket.on('close', function() { connection.handleClose(); });
  socket.on('error', function() { connection.startReconnection(); });
  return socket;
}
