var Frame = require('./frame').Frame

var Connection = exports.Connection = require('./base_connection').Connection

Connection.prototype.connect = function() {
  if (this.socket) return false
  var connection = this
  this.socket = new WebSocket("ws://" + this.host + ":6437")
  this.socket.onopen = connection.handleOpen
  this.socket.onmessage = function(message) {
    var data = JSON.parse(message.data)
    if (data.version) {
      connection.serverVersion = data.version
      if (connection.readyHandler) connection.readyHandler(connection.serverVersion)
    } else {
      if (connection.frameHandler) connection.frameHandler(new Frame(data))
    }
  }
  this.socket.onclose = connection.handleClose
  return true
}
