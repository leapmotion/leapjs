var Gesture = exports.Gesture = function(data) {
  this.id = data.id
  this.type = data.type
  this.state = data.state
  this.startTime = data.startTime
  this.lastUpdatedTime = data.lastUpdatedTime
  this.duration = data.duration
  this.progress = data.progress
  this.magnitude = data.magnitude
  this.position = data.position
  this.direction = data.direction
  this.handIds = data.handIds
  this.pointableIds = data.pointableIds
}
