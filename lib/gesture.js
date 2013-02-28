var Gesture = exports.Gesture = function(data) {
  var gesture = undefined
  switch (data.type) {
    case 'circle':
      gesture = new CircleGesture(data)
      break
    case 'swipe':
      gesture = new SwipeGesture(data)
      break
    case 'screenTap':
      gesture = new ScreenTapGesture(data)
      break
    case 'keyTap':
      gesture = new KeyTapGesture(data)
      break
    default:
      throw "unkown gesture type"
  }
  gesture.id = data.id
  gesture.handIds = data.handIds
  gesture.pointableIds = data.pointableIds
  gesture.duration = data.duration
  gesture.state = data.state
  gesture.type = data.type
  return gesture
}

var CircleGesture = function(data) {
  this.center = data.center
  this.normal = data.direction
  this.progress = data.progress
  this.radius = data.radius
}

var SwipeGesture = function(data) {
  this.startPosition = data.startPosition
  this.position = data.position
  this.direction = data.direction
  this.speed = data.speed
}

var ScreenTapGesture = function(data) {
  this.position = data.position
  this.direction = data.direction
  this.progress = data.progress
}

var KeyTapGesture = function(data) {
  this.position = data.position
  this.direction = data.direction
  this.progress = data.progress
}
