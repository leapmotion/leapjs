var BugReport = module.exports = function(connection) {
  this.connection = connection;
  this.progress = 0;
  this.duration = null;
  this.isActive = false;
};

BugReport.prototype.beginRecording = function() {
  console.log("beginRecording");
  //this.connection.send({bugReportBegin: true});
};

BugReport.prototype.endRecording = function() {
  //this.connection.send({bugReportEnd: false});
};