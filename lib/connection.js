var Connection = exports.Connection = function(opts) {
  if (opts && opts.frame) this.frameHandler = opts.frame;
  if (opts && opts.ready) this.readyHandler = opts.ready;
};

Connection.prototype.handleOpen = function() {
  if (this.openTimer) {
    clearTimeout(this.openTimer);
    this.openTimer = undefined;
  }
};

Connection.prototype.handleClose = function() {
  var _this = this;
  this.openTimer = setTimeout(function() { console.log("reconnecting..."); _this.connect(); }, 1000)
};

Connection.prototype.createSocket = function() {
  this.socket = new WebSocket("ws://127.0.0.1:6437");
}

Connection.prototype.connect = function() {
  if (!this.socket) {
    var _this = this
    this.createSocket()
    this.socket.onopen = function() {
      _this.handleOpen()
    }
    this.socket.onmessage = function(message) {
      var data = JSON.parse(message.data);
      if (data.version) {
        _this.serverVersion = data.version
        if (_this.readyHandler) _this.readyHandler(_this.serverVersion)
      } else {
        if (_this.frameHandler) _this.frameHandler(new Frame(data))
      }
    }
    this.socket.onclose = function(message) {
      _this.handleClose()
    }
  }
}
