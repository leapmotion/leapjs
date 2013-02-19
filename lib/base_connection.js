var Frame = require('./frame').Frame

var Connection = exports.Connection = function(opts) {
  this.host = opts && opts.host || "127.0.0.1"
  if (opts && opts.frame) this.frameHandler = opts.frame
  if (opts && opts.ready) this.readyHandler = opts.ready
};

Connection.prototype.handleOpen = function() {
  if (this.openTimer) {
    clearTimeout(this.openTimer)
    this.openTimer = undefined
  }
};

Connection.prototype.handleClose = function() {
  var connection = this;
  this.openTimer = setTimeout(function() { connection.connect(); }, 1000)
};

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

Connection.prototype.disconnect = function() {
  if (!this.socket) return
  this.socket.close()
  this.socket = undefined
}
