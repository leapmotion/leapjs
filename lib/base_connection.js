var chooseProtocol = require('./protocol').chooseProtocol
  , EventEmitter = require('events').EventEmitter
  , _ = require('underscore');

var BaseConnection = module.exports = function(opts) {
  this.opts = _.defaults(opts || {}, {
    host : '127.0.0.1',
    enableGestures: false,
    port: 6437,
    enableHeartbeat: true,
    heartbeatInterval: 100,
    requestProtocolVersion: 3
  });
  this.host = this.opts.host;
  this.port = this.opts.port;
  this.on('ready', function() {
    this.enableGestures(this.opts.enableGestures);
    if (this.opts.enableHeartbeat) this.startHeartbeat();
  });
  this.on('disconnect', function() {
    if (this.opts.enableHeartbeat) this.stopHeartbeat();
  });
  this.heartbeatTimer = null;
}

BaseConnection.prototype.getUrl = function() {
  return "ws://" + this.host + ":" + this.port + "/v" + this.opts.requestProtocolVersion + ".json";
}

BaseConnection.prototype.sendHeartbeat = function() {
  if (this.protocol) {
    this.setHeartbeatState(true);
    this.protocol.sendHeartbeat(this);
  }
}

BaseConnection.prototype.handleOpen = function() {
  if (this.connected === true) return;
  this.connected = true;
  this.emit('connect');
}

BaseConnection.prototype.enableGestures = function(enabled) {
  this.gesturesEnabled = enabled ? true : false;
  this.send(this.protocol.encode({"enableGestures": this.gesturesEnabled}));
}

BaseConnection.prototype.handleClose = function() {
  if (!this.connected) return;
  this.disconnect();
  this.startReconnection();
}

BaseConnection.prototype.startReconnection = function() {
  var connection = this;
  setTimeout(function() { connection.connect() }, 1000);
}

BaseConnection.prototype.disconnect = function() {
  if (!this.socket) return;
  this.socket.close();
  this.connected = false;
  delete this.socket;
  delete this.protocol;
  this.emit('disconnect');
}

BaseConnection.prototype.handleData = function(data) {
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

BaseConnection.prototype.connect = function() {
  if (this.socket) return;
  this.socket = this.setupSocket();
  return true;
}

BaseConnection.prototype.send = function(data) {
  this.socket.send(data);
}

BaseConnection.prototype.stopHeartbeat = function() {
  if (!this.heartbeatTimer) return;
  clearInterval(this.heartbeatTimer);
  delete this.heartbeatTimer;
  this.setHeartbeatState(false);
};

BaseConnection.prototype.setHeartbeatState = function(state) {
  if (this.heartbeatState === state) return;
  this.heartbeatState = state;
  this.emit(this.heartbeatState ? 'focus' : 'blur');
};

_.extend(BaseConnection.prototype, EventEmitter.prototype);

