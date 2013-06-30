var Frame = require('./frame').Frame
  , util = require('util');

var JSONProtocol = function(version) {
  var protocol = function(data) {
    return new Frame(data);
  }
  protocol.encode = function(message) {
    return util.format("%j", message);
  }
  protocol.version = version;
  protocol.versionLong = 'Version ' + version;
  protocol.type = 'protocol';
  return protocol;
};

var chooseProtocol = exports.chooseProtocol = function(header) {
  var protocol;
  switch(header.version) {
    case 1:
      protocol = JSONProtocol(1);
      break;
    case 2:
      protocol = JSONProtocol(2);
      protocol.sendHeartbeat = function(connection) {
        connection.send(protocol.encode({heartbeat: true}));
      }
      break;
    default:
      throw "unrecognized version";
  }
  return protocol;
}
