assert = require('chai').assert;
_ = require("underscore");

Leap = require('../../lib');

assertUtil = require('./../assertUtil');
var common =  require('./common');
fakeHand = common.fakeHand;
fakeFrame = common.fakeFrame;
fakeFinger = common.fakeFinger;
fakeTool = common.fakeTool;
fakeController = common.fakeController;
fakePluginFactory = common.fakePluginFactory;
fakeGesture = common.fakeGesture;

frame_schema = require('./../../schema/frame_schema.json');
pointable_schema = require('./../../schema/pointable_schema.json');
hand_schema = require('./../../schema/hand_schema.json');
ZSchema = require('./../../lib/vendor/ZSchema');

frame_captured =  require('./frame.json');