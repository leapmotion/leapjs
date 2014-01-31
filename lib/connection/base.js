var chooseProtocol = require('../protocol').chooseProtocol
  , EventEmitter = require('events').EventEmitter
  , _ = require('underscore');

var BaseConnection = module.exports = function(opts) {
  this.opts = _.defaults(opts || {}, {
    host : '127.0.0.1',
    enableGestures: false,
    port: 6437,
    background: false,
    requestProtocolVersion: 5
  });
  this.host = this.opts.host;
  this.port = this.opts.port;
  this.protocolVersionVerified = false;
  this.on('ready', function() {
    this.enableGestures(this.opts.enableGestures);
    this.setBackground(this.opts.background);
  });
}

BaseConnection.prototype.getUrl = function() {
  return "ws://" + this.host + ":" + this.port + "/v" + this.opts.requestProtocolVersion + ".json";
}

BaseConnection.prototype.setBackground = function(state) {
  this.opts.background = state;
  if (this.protocol && this.protocol.sendBackground && this.background !== this.opts.background) {
    this.background = this.opts.background;
    this.protocol.sendBackground(this, this.opts.background);
  }
}

BaseConnection.prototype.handleOpen = function() {
  console.log('handle open', this.connected);
  if (!this.connected) {
    this.connected = true;
    this.emit('connect');
  }
}

BaseConnection.prototype.enableGestures = function(enabled) {
  this.gesturesEnabled = enabled ? true : false;
  this.send(this.protocol.encode({"enableGestures": this.gesturesEnabled}));
}

BaseConnection.prototype.handleClose = function(code, reason) {
  console.log('handle close', this.connected);
  if (!this.connected) return;
  this.disconnect();

  // 1001 - an active connection is closed
  // 1006 - cannot connect
  if (code === 1001 && this.opts.requestProtocolVersion > 1) {
    if (this.protocolVersionVerified) {
      console.log('verified, not dec');
      this.protocolVersionVerified = false;
    }else{
      console.log('decrementing');
      this.opts.requestProtocolVersion--;
    }
  }else{
    if (code === 1001){
      console.log('nod dec, invalid v');
    }else{
      console.log('nod dec, invalid code');
    }
  }
  this.startReconnection();
}

BaseConnection.prototype.startReconnection = function() {
  var connection = this;
  this.reconnectionTimer = setInterval(function() { connection.reconnect(); console.log('timer resolved'); }, 1000);
  console.log('new timer')
}

BaseConnection.prototype.disconnect = function() {
  if (!this.socket) return;
  this.socket.close();
  delete this.socket;
  delete this.protocol;
  if (this.connected) {
    this.connected = false;
    this.emit('disconnect');
  }
  return true;
}

BaseConnection.prototype.reconnect = function() {
  console.log('reconnect', this.connected);
  if (this.connected) {
    console.log('timer removed');
    clearInterval(this.reconnectionTimer);
  } else {
    this.disconnect();
    this.connect();
  }
}

BaseConnection.prototype.handleData = function(data) {
  var message = JSON.parse(data);

  var messageEvent;
  if (this.protocol === undefined) {
    messageEvent = this.protocol = chooseProtocol(message);
    this.protocolVersionVerified = true;
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

BaseConnection.prototype.reportFocus = function(state) {
  if (this.focusedState === state) return;
  this.focusedState = state;
  this.emit(this.focusedState ? 'focus' : 'blur');
  if (this.protocol && this.protocol.sendFocused) {
    this.protocol.sendFocused(this, this.focusedState);
  }
}

_.extend(BaseConnection.prototype, EventEmitter.prototype);

