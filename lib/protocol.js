var Frame = require('./frame').Frame
  , util = require('util');

var chooseProtocol = exports.chooseProtocol = function(header) {
  switch(header.version) {
    case 1:
      var protocol = function(data) {
        return new Frame(data);
      }
      protocol.encode = function(message) {
        return util.format("%j", message);
      }
      protocol.version = 1;
      protocol.versionLong = 'Version 1';
      protocol.type = 'version';
      return protocol;
    default:
      throw "unrecognized version";
  }
}
