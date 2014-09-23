var Frame = require('./frame')
  , Hand = require('./hand')
  , Pointable = require('./pointable')
  , Finger = require('./finger')
  , _ = require('underscore')
  , EventEmitter = require('events').EventEmitter;

var Event = function(data) {
  this.type = data.type;
  this.state = data.state;
};

exports.chooseProtocol = function(header) {
  var protocol;
  switch(header.version) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      protocol = JSONProtocol(header);
      protocol.sendBackground = function(connection, state) {
        connection.send(protocol.encode({background: state}));
      }
      protocol.sendFocused = function(connection, state) {
        connection.send(protocol.encode({focused: state}));
      }
      protocol.sendOptimizeHMD = function(connection, state) {
        connection.send(protocol.encode({optimizeHMD: state}));
      }
      break;
    default:
      throw "unrecognized version";
  }
  return protocol;
}

var JSONProtocol = exports.JSONProtocol = function(header) {

  var protocol = function(frameData) {

    if (frameData.event) {

      return new Event(frameData.event);

    } else {

      protocol.emit('beforeFrameCreated', frameData);

      var frame = new Frame(frameData);

      protocol.emit('afterFrameCreated', frame, frameData);

      return frame;

    }

  };

  protocol.encode = function(message) {
    return JSON.stringify(message);
  };
  protocol.version = header.version;
  protocol.serviceVersion = header.serviceVersion;
  protocol.versionLong = 'Version ' + header.version;
  protocol.type = 'protocol';

  _.extend(protocol, EventEmitter.prototype);

  return protocol;
};


