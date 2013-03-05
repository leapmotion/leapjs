var chooseProtocol = require('./protocol').chooseProtocol
  , util = require('util')
  , EventEmitter = require('events').EventEmitter
  , extend = require('./util').extend;

var Connection = exports.Connection = function(opts) {
  this.host = opts && opts.host || "127.0.0.1";
  if (opts && opts.frame) this.frameHandler = opts.frame;
  this.enableGestures = opts && opts.enableGestures ? true : false;
}

Connection.prototype.handleOpen = function() {
  this.stopReconnection();
  this.socket.send(util.format("%j", {enableGestures: this.enableGestures}));
  this.emit('connect');
}

Connection.prototype.handleClose = function() {
  this.startReconnection();
  this.emit('disconnect');
}

Connection.prototype.startReconnection = function() {
  var connection = this;
  if (!this.openTimer) this.openTimer = setInterval(function() { connection.connect() }, 1000);
}

Connection.prototype.stopReconnection = function() {
  var connection = this;
  if (this.openTimer) {
    clearTimeout(this.openTimer);
    this.openTimer = undefined;
  }
}

Connection.prototype.disconnect = function() {
  if (!this.socket) return;
  this.socket.close();
  this.socket = undefined;
}

Connection.prototype.handleData = function(data) {
  var message = JSON.parse(data);
  if (message.version) {
    this.protocol = chooseProtocol(message);
    this.serverVersion = this.protocol.version;
    if (this.readyHandler) this.readyHandler(this.serverVersion);
  } else {
    this.protocol(message, this);
  }
}

Connection.prototype.connect = function() {
  if (this.socket) {
    this.socket.disconnect();
    this.socket = null;
  }
  this.socket = this.setupSocket();
  return true;
}

extend(Connection.prototype, EventEmitter.prototype);
