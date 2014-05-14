assert = require('chai').assert;
_ = require("underscore");

Leap = require('../../lib');

var common = require('./common');
assertUtil = require('./../assertUtil');

fakeHand = common.fakeHand;
fakeFrame = common.fakeFrame;
fakeActualFrame = common.fakeActualFrame;
fakeFinger = common.fakeFinger;
fakeController = common.fakeController;
fakeGesture = common.fakeGesture;
createFrame = common.createFrame;
fakePluginFactory = common.fakePluginFactory;
