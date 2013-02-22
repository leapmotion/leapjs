var Frame = require('./frame').Frame
  , WebSocket = require('ws')

var Connection = exports.Connection = require('./base_connection').Connection

Connection.prototype.connect = function() {
  if (this.socket) return false
  this.socket = new WebSocket("ws://" + this.host + ":6437")
  this.socket.on('open', this.handleOpen)
  var connection = this
  this.socket.on('message', function(m) { connection.handleData(m) })
  this.socket.on('close', this.handleClose)
  return true
}
