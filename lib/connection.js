var Connection = exports.Connection = require('./base_connection').Connection

Connection.prototype.connect = function() {
  if (this.socket) return false
  var connection = this
  this.socket = new WebSocket("ws://" + this.host + ":6437")
  this.socket.onopen = function() { connection.handleOpen(); }
  this.socket.onmessage = function(message) { connection.handleData(message.data) }
  this.socket.onclose = function() { connection.handleClose(); }
  this.connected = true
  return true
}
