var chooseProtocol = require('./protocol').chooseProtocol
  , util = require('util')
  , EventEmitter = require('events').EventEmitter
  , extend = require('./util').extend;

var Connection = exports.Connection = function(opts) {
  this.host = opts && opts.host || "127.0.0.1";
  var connection = this;
  this.on('connect', function() {
    connection.enableGestures(opts && opts.enableGestures);
  })
}

Connection.prototype.handleOpen = function() {
  this.stopReconnection();
  this.emit('connect');
}

Connection.prototype.enableGestures = function(enabled) {
  this.socket.send(util.format("%j", {"enableGestures": enabled}));
  this.gesturesEnabled = enabled;
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
  this.protocol = undefined;
}

Connection.prototype.handleData = function(data) {
  var message = JSON.parse(data);
  var messageEvent;
  if (this.protocol === undefined) {
    messageEvent = this.protocol = chooseProtocol(message);
  } else {
    messageEvent = this.protocol(message);
  }
  this.emit(messageEvent.type, messageEvent);
}

Connection.prototype.connect = function() {
  this.disconnect();
  this.socket = this.setupSocket();
  return true;
}

extend(Connection.prototype, EventEmitter.prototype);
