let WebSocket = require('ws')
  , BaseConnection = require('./base');

let NodeConnection = module.exports = function(opts) {
  BaseConnection.call(this, opts);
  let connection = this;
  this.on('ready', function() { connection.reportFocus(true); });
}

Object.assign(NodeConnection.prototype, BaseConnection.prototype);

NodeConnection.__proto__ = BaseConnection;

NodeConnection.prototype.setupSocket = function() {
  let connection = this;
  let socket = new WebSocket(this.getUrl());
  socket.on('open', function() { connection.handleOpen(); });
  socket.on('message', function(m) { connection.handleData(m); });
  socket.on('close', function(code, reason) { connection.handleClose(code, reason); });
  socket.on('error', function() { connection.startReconnection(); });
  return socket;
}
