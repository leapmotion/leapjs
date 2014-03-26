"use strict";

var ZSchema = require('./../lib/vendor/ZSchema');
var fs = require('fs');
var path = require('path');

var pointableSchema = require('./../schema/pointable_schema.json');
var handSchema = require('./../schema/hand_schema.json');
var frameSchema = require('./../schema/frame_schema.json');

var invalidPointableFactory = new ZSchema.Factory(pointableSchema, {})
    .addHandler(/^(tipVelocity|tipPosition|stabilizedTipPosition)$/, function () {
        return [0, 0, 0]
    })
    .addHandler(/^direction$/, function () {
        return [0, 0, -1]
    })
    .addHandler('valid', false);

var invalidPointable = invalidPointableFactory.create();
fs.writeFileSync(path.resolve(__dirname, '../lib/invalid_objects/pointable.json'), JSON.stringify(invalidPointable));

var invalidTool = invalidPointableFactory.create();
invalidTool.tool = true;
fs.writeFileSync(path.resolve(__dirname, '../lib/invalid_objects/tool.json'), JSON.stringify(invalidTool));

var invalidFinger = invalidPointableFactory.create();
invalidFinger.tool = false;
fs.writeFileSync(path.resolve(__dirname, '../lib/invalid_objects/finger.json'), JSON.stringify(invalidFinger));

/**
 * creating invalid hand
 */
var invalidHandFactory = new ZSchema.Factory(handSchema)
    .addHandler(/(direction)/, function () {
        return [0, 0, -1]
    })
    .addHandler(/(palmPosition|stabilizedPalmPosition|tipVelocity)/, function(){
        return [0, 0, 0];
    })
    .addHandler(/(fingers|pointables|tools)/,function () {
        return [];
    })
    .addHandler(/palmNormal/, function () {
        return [0, -1, 0];
    })
    .addHandler('valid', false);

var invalidHand = invalidHandFactory.create();
fs.writeFileSync(path.resolve(__dirname, '../lib/invalid_objects/hand.json'), JSON.stringify(invalidHand));

/**
 * Creating  invalid frame
 */
var invalidFrameFactory = new ZSchema.Factory(frameSchema)
    .addHandler(/(fingers|pointables|tools|hands|gestures)/,function () {
        return [];
    })
    .addHandler('valid', false);

/**
 * An invalid Frame object.
 *
 * You can use this invalid Frame in comparisons testing
 * whether a given Frame instance is valid or invalid. (You can also check the
 * [Frame.valid]{@link Leap.Frame#valid} property.)
 *
 * @static
 * @type {Leap.Frame}
 * @name Invalid
 * @memberof Leap.Frame
 */

var invalidFrame = invalidFrameFactory.create();
fs.writeFileSync(path.resolve(__dirname, '../lib/invalid_objects/frame.json'), JSON.stringify(invalidFrame));