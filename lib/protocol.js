var Frame = require('./frame')

var Event = function(data) {
  this.type = data.type;
  this.state = data.state;
};

var chooseProtocol = exports.chooseProtocol = function(header) {
  var protocol;
  switch(header.version) {
    case 1:
      protocol = JSONProtocol(1, function(data) {
        return new Frame(data);
      });
      break;
    case 2:
      protocol = JSONProtocol(2, function(data) {
        return new Frame(data);
      });
      protocol.sendHeartbeat = function(connection) {
        connection.send(protocol.encode({heartbeat: true}));
      }
      break;
    case 3:
      protocol = JSONProtocol(3, function(data) {
        return data.event ? new Event(data.event) : new Frame(data);

      });
      protocol.sendHeartbeat = function(connection) {
        connection.send(protocol.encode({heartbeat: true}));
      }
      break;
    default:
      throw "unrecognized version";
  }
  return protocol;
}

var JSONProtocol = function(version, cb) {
  var protocol = cb;
  protocol.encode = function(message) {
    return JSON.stringify(message);
  }
  protocol.version = version;
  protocol.versionLong = 'Version ' + version;
  protocol.type = 'protocol';
  return protocol;
};
