var WebSocket = require('ws')
  , BaseConnection = require('./base')
  , _ = require('underscore');

var NodeConnection = module.exports = function(opts) {
  BaseConnection.call(this, opts);
  var connection = this;
  this.on('ready', function() { connection.reportFocus(true); });
}

_.extend(NodeConnection.prototype, BaseConnection.prototype);

NodeConnection.__proto__ = BaseConnection;

NodeConnection.prototype.setupSocket = function() {
  var connection = this;
  var socket = new WebSocket(this.getUrl());
  socket.on('open', function() { connection.handleOpen(); });
  socket.on('message', function(m) { connection.handleData(m); });
  socket.on('close', function(code, reason) { connection.handleClose(code, reason); });
  socket.on('error', function() { connection.startReconnection(); });
  return socket;
}
