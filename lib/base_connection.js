var chooseProtocol = require('./protocol').chooseProtocol
  , util = require('util')
  , EventEmitter = require('events').EventEmitter
  , extend = require('./util').extend

var Connection = exports.Connection = function(opts) {
  this.host = opts && opts.host || "127.0.0.1"
  if (opts && opts.frame) this.frameHandler = opts.frame
  this.enableGestures = opts && opts.enableGestures ? true : false
}

Connection.prototype.handleOpen = function() {
  if (this.openTimer) {
    clearTimeout(this.openTimer)
    this.openTimer = undefined
  }
  this.socket.send(util.format("%j", {enableGestures: this.enableGestures}))
  this.emit('connect');
}

Connection.prototype.handleClose = function() {
  var connection = this
  this.openTimer = setTimeout(function() { connection.connect() }, 1000)
  this.emit('disconnect');
}

Connection.prototype.disconnect = function() {
  if (!this.socket) return
  this.socket.close()
  this.socket = undefined
}

Connection.prototype.handleData = function(data) {
  var message = JSON.parse(data)
  if (message.version) {
    this.protocol = chooseProtocol(message)
    this.serverVersion = this.protocol.version
    if (this.readyHandler) this.readyHandler(this.serverVersion)
  } else {
    this.protocol(message, this)
  }
}

extend(Connection.prototype, EventEmitter.prototype)
