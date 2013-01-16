var UI = exports.UI = {
  Cursor: function(screen) {
    this.screen = screen;
    this.referenceFrame = null;
    this.ttl = null;
    this.x = 0;
    this.y = 0;
  }
}

UI.Cursor.prototype.onKill = function() {};
UI.Cursor.prototype.onCreate = function() {};
UI.Cursor.prototype.onMove = function() {};

UI.Cursor.prototype.update = function(frame) {
  if (this.ttl) {
    // calculate the relative co-ords and report to div
    // nothing to track ...
    if (frame.hands.length + frame.pointables.length == 0) {
      // and kill the cursor here
      if (this.ttl > (new Date()).getTime()) {
        console.log("killing cursor")
        this.ttl = null
        this.onKill()
      }
    } else {
      // there must be something to track
      this.ttl = (new Date()).getTime() + 1000;
      var translation = this.screen.translate(frame.translation(this.referenceFrame))
      this.onMove({x: translation[0], y: translation[1]})
    }
  } else {
    if (frame.hands.length + frame.pointables.length > 0) {
      this.ttl = (new Date()).getTime() + 1000;
      this.referenceFrame = frame;
      this.onCreate()
    }
  }

}

