var Frame = require('./frame').Frame
  , WebSocket = require('ws')

var Connection = exports.Connection = require('./base_connection').Connection

Connection.prototype.connect = function() {
  if (this.socket) return false
  var connection = this
  this.socket = new WebSocket("ws://" + this.host + ":6437")
  this.socket.on('open', function() { connection.handleOpen() })
  this.socket.on('message', function(m) { connection.handleData(m) })
  this.socket.on('close', function() { connection.handleClose() })
  return true
}
