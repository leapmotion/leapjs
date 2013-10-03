assert = require('chai').assert
_ = require("underscore")

Leap = require('../../lib')

var common = require('./common');

fakeHand = common.fakeHand;
fakeFrame = common.fakeFrame;
fakeFinger = common.fakeFinger;
fakeController = common.fakeController;
fakeGesture = common.fakeGesture;
createFrame = common.createFrame;
