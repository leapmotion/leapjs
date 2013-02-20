var Frame = require('./frame').Frame

var Protocol = exports.Protocol = function(header) {
  switch(header.version) {
    case 1:  return new Protocol1()
    default: throw "unrecognized version"
  }
}

var Protocol1 = function() {

}

Protocol1.prototype.process = function(data, connection) {
  if (connection.frameHandler) connection.frameHandler(new Frame(data))
}
