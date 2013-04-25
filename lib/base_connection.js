var chooseProtocol = require('./protocol').chooseProtocol
  , EventEmitter = require('events').EventEmitter
  , _ = require('underscore');

var Connection = exports.Connection = function(opts) {
  opts = _.defaults(opts || {}, {host : '127.0.0.1', enableGestures: false, port: 6437});
  this.host = opts.host;
  this.port = opts.port;
  this.on('ready', function() {
    this.enableGestures(opts.enableGestures);
  });
}

Connection.prototype.handleOpen = function() {
  this.emit('connect');
}

Connection.prototype.enableGestures = function(enabled) {
  this.gesturesEnabled = enabled ? true : false;
  this.send(this.protocol.encode({"enableGestures": this.gesturesEnabled}));
}

Connection.prototype.handleClose = function() {
  this.startReconnection();
  this.emit('disconnect');
}

Connection.prototype.startReconnection = function() {
  var connection = this;
  setTimeout(function() { connection.connect() }, 1000);
}

Connection.prototype.disconnect = function() {
  if (!this.socket) return;
  this.teardownSocket();
  this.socket = undefined;
  this.protocol = undefined;
}

Connection.prototype.handleData = function(data) {
  var message = JSON.parse(data);
  var messageEvent;
  if (this.protocol === undefined) {
    messageEvent = this.protocol = chooseProtocol(message);
    this.emit('ready');
  } else {
    messageEvent = this.protocol(message);
  }
  this.emit(messageEvent.type, messageEvent);
}

Connection.prototype.connect = function() {
  if (this.socket) {
    this.teardownSocket();
  }
  this.socket = this.setupSocket();
  return true;
}

Connection.prototype.send = function(data) {
  this.socket.send(data);
}

_.extend(Connection.prototype, EventEmitter.prototype);
