(function() {
  var Connection = window.Leap.Connection = function(opts) {
    if (opts && opts.frame) this.handleRawFrame = opts.frame;
    this.connect();
  };

  Connection.prototype.handleOpen = function() {
    if (this.openTimer) {
      clearTimeout(this.openTimer);
      this.openTimer = undefined;
    }
  }

  Connection.prototype.handleClose = function() {
    var _this = this;
    this.openTimer = setTimeout(function() { console.log("reconnecting..."); _this.connect(); }, 1000)
  }

  Connection.prototype.connect = function() {
    var _this = this
    this.socket = new WebSocket("ws://127.0.0.1:6437");
    this.socket.onopen = function() {
      _this.handleOpen()
    }
    this.socket.onmessage = function(message) {
      _this.handleRawFrame(JSON.parse(message.data))
    }
    this.socket.onclose = function(message) {
      _this.handleClose()
    }
  }
})();
