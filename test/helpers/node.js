assert = require('chai').assert;

Leap = require('../../lib');

let common = require('./common');
assertUtil = require('./../assertUtil');

fakeHand = common.fakeHand;
fakeFrame = common.fakeFrame;
fakeActualFrame = common.fakeActualFrame;
fakeFinger = common.fakeFinger;
fakeController = common.fakeController;
createFrame = common.createFrame;
fakePluginFactory = common.fakePluginFactory;
