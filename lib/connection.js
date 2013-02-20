var Protocol = require('./protocol').Protocol

var Connection = exports.Connection = require('./base_connection').Connection

Connection.prototype.connect = function() {
  if (this.socket) return false
  var connection = this
  var handler = undefined
  this.socket = new WebSocket("ws://" + this.host + ":6437")
  this.socket.onopen = connection.handleOpen
  this.socket.onmessage = function(message) {
    var data = JSON.parse(message.data)
    if (data.version) {
      handler = Protocol(data)
      connection.serverVersion = data.version
      if (connection.readyHandler) connection.readyHandler(connection.serverVersion)
    } else {
      handler.process(data, connection)
    }
  }
  this.socket.onclose = connection.handleClose
  return true
}
