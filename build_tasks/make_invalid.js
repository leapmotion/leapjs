"use strict";

var ZSchema = require('./../lib/vendor/ZSchema');
var fs = require('fs');
var path = require('path');

var pointableSchema = require('./../schema/pointable_schema.json');
var handSchema = require('./../schema/hand_schema.json');
var frameSchema = require('./../schema/frame_schema.json');

var invalidPointableFactory = new ZSchema.Factory(pointableSchema, {})
    .addHandler(/(tipPosition|direction)/,function () {
        return [1, 0, 0]
    }).addHandler(/(position|stabilizedTipPosition|tipVelocity)\/item/, 0);

var invalidPointable = invalidPointableFactory.create();
fs.writeFileSync(path.resolve(__dirname, '../lib/invalid_objects/pointable.json'), JSON.stringify(invalidPointable));

var invalidHandFactory = new ZSchema.Factory(handSchema)
    .addHandler(/(direction)/,function () {
        return [1, 0, 0]
    }).addHandler(/(palmPosition|stabilizedPalmPosition|tipVelocity)\/item/, 0)
    .addHandler(/(fingers|pointables|tools)/,function () {
        return [];
    }).addHandler(/palmNormal/, function () {
        return [0, -1, 0];
    });

var invalidHand = invalidHandFactory.create();
fs.writeFileSync(path.resolve(__dirname, '../lib/invalid_objects/hand.json'), JSON.stringify(invalidHand));

var invalidFrameFactory = new ZSchema.Factory(frameSchema)
    .addHandler(/(direction)/,function () {
        return [1, 0, 0]
    }).addHandler(/(palmPosition|stabilizedPalmPosition|tipVelocity)\/item/, 0)
    .addHandler(/(fingers|pointables|tools|hands|gestures)/,function () {
        return [];
    }).addHandler(/palmNormal/, function () {
        return [0, -1, 0];
    });


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