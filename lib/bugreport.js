var BugReport = module.exports = function(connection) {
  this.connection = connection;
  this.progress = 0;
  this.duration = 0;
  this.isActive = false;
};

BugReport.prototype.beginRecording = function() {
  this.connection.send(this.connection.protocol.encode({SetBugReportRecording: true}));
};

BugReport.prototype.endRecording = function() {
  this.connection.send(this.connection.protocol.encode({SetBugReportRecording: false}));
};