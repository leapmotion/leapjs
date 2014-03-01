var Frame = require('./frame')
  , Hand = require('./hand')
  , Pointable = require('./pointable')
  , Finger = require('./finger');

var Event = function(data) {
  this.type = data.type;
  this.state = data.state;
};

var chooseProtocol = exports.chooseProtocol = function(header) {
  var protocol;
  switch(header.version) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      protocol = JSONProtocol(header.version, function(data) {
        return data.event ? new Event(data.event) : new Frame(data);
      });
      protocol.sendBackground = function(connection, state) {
        connection.send(protocol.encode({background: state}));
      }
      protocol.sendFocused = function(connection, state) {
        connection.send(protocol.encode({focused: state}));
      }
      break;
    default:
      throw "unrecognized version";
  }
  return protocol;
}

var JSONProtocol = exports.JSONProtocol = function(version) {
  var protocol = function(data) {
    if (data.event) {
      return new Event(data.event);
    } else {
      var frame = new Frame(data);
      return frame;
    }
  };
  protocol.encode = function(message) {
    return JSON.stringify(message);
  }
  protocol.version = version;
  protocol.versionLong = 'Version ' + version;
  protocol.type = 'protocol';
  return protocol;
};
