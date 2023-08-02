let BaseConnection = module.exports = require('./base');


let BrowserConnection = module.exports = function(opts) {
  BaseConnection.call(this, opts);
  let connection = this;
  this.on('ready', function() { connection.startFocusLoop(); })
  this.on('disconnect', function() { connection.stopFocusLoop(); })
}

Object.assign(BrowserConnection.prototype, BaseConnection.prototype);

BrowserConnection.__proto__ = BaseConnection;

BrowserConnection.prototype.useSecure = function(){
  return location.protocol === 'https:'
}

BrowserConnection.prototype.getScheme = function(){
  return this.useSecure() ? 'wss:' : 'ws:'
}

BrowserConnection.prototype.getPort = function(){
  return this.useSecure() ? 6436 : 6437
}

BrowserConnection.prototype.setupSocket = function() {
  let connection = this;
  let socket = new WebSocket(this.getUrl());
  socket.onopen = function() { connection.handleOpen(); };
  socket.onclose = function(data) { connection.handleClose(data['code'], data['reason']); };
  socket.onmessage = function(message) { connection.handleData(message.data) };
  socket.onerror = function(error) {

    // attempt to degrade to ws: after one failed attempt for older Leap Service installations.
    if (connection.useSecure() && connection.scheme === 'wss:'){
      connection.scheme = 'ws:';
      connection.port = 6437;
      connection.disconnect();
      connection.connect();
    }

  };
  return socket;
}

BrowserConnection.prototype.startFocusLoop = function() {
  if (this.focusDetectorTimer) return;
  let connection = this;
  let propertyName = null;
  if (typeof document.hidden !== "undefined") {
    propertyName = "hidden";
  } else if (typeof document.mozHidden !== "undefined") {
    propertyName = "mozHidden";
  } else if (typeof document.msHidden !== "undefined") {
    propertyName = "msHidden";
  } else if (typeof document.webkitHidden !== "undefined") {
    propertyName = "webkitHidden";
  } else {
    propertyName = undefined;
  }

  if (connection.windowVisible === undefined) {
    connection.windowVisible = propertyName === undefined ? true : document[propertyName] === false;
  }

  let focusListener = window.addEventListener('focus', function(e) {
    connection.windowVisible = true;
    updateFocusState();
  });

  let blurListener = window.addEventListener('blur', function(e) {
    connection.windowVisible = false;
    updateFocusState();
  });

  this.on('disconnect', function() {
    window.removeEventListener('focus', focusListener);
    window.removeEventListener('blur', blurListener);
  });

  let updateFocusState = function() {
    let isVisible = propertyName === undefined ? true : document[propertyName] === false;
    connection.reportFocus(isVisible && connection.windowVisible);
  }

  // save 100ms when resuming focus
  updateFocusState();

  this.focusDetectorTimer = setInterval(updateFocusState, 100);
}

BrowserConnection.prototype.stopFocusLoop = function() {
  if (!this.focusDetectorTimer) return;
  clearTimeout(this.focusDetectorTimer);
  delete this.focusDetectorTimer;
}
