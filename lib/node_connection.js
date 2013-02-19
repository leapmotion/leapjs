var Frame = require('./frame').Frame
  , WebSocket = require('ws')

var Connection = exports.Connection = require('./base_connection').Connection

Connection.prototype.connect = function() {
  if (this.socket) return false
  var connection = this
  this.socket = new WebSocket("ws://" + this.host + ":6437")
  this.socket.on('open', connection.handleOpen)
  this.socket.on('message', function(message) {
    var data = JSON.parse(message)
    if (data.version) {
      connection.serverVersion = data.version
      if (connection.readyHandler) connection.readyHandler(connection.serverVersion)
    } else {
      if (connection.frameHandler) connection.frameHandler(new Frame(data))
    }
  })
  this.socket.on('close', connection.handleClose)
  return true
}
