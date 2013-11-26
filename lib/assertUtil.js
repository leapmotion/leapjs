var assert = require('assert');
var util = require('util');
var _ = require('underscore');
var _DEBUG = false;

module.exports = {
    vectorCloseTo: function (vecA, vecB, comment, min) {
        if (!vecA && _.isObject(vecA)){
            throw new Error (util.format('vectorCloseTo bad argument 1: %s', vecA));
        }
        if (!vecB && _.isObject(vecB)){
            throw new Error (util.format('vectorCloseTo bad argument 2: %s', vecB));
        }
       if (_DEBUG) console.log('veca: %s', util.inspect(vecA));
        if (!min) min = 0.0000001;

        _.each(_.keys(vecA), function (dim) {
            module.exports.closeTo(vecA[dim], vecB[dim], min, comment);
        });
    },

    matrixCloseTo: function (mA, mB, comment, min) {
        if (!mA && _.isObject(mA)){
            throw new Error (util.format('matrixCloseTo bad argument 1: %s', mA));
        }
        if (!mB && _.isObject(mB)){
            throw new Error (util.format('matrixCloseTo bad argument 2: %s', mB));
        }
        if (!min) min = 0.0000001;

        _.each(_.keys(mA), function (dim) {
            module.exports.closeTo(mB[dim], mA[dim], min, dim + ': ' + comment);
        });
    },
    closeTo: function (a, b, dif, comment) {
       var dd = Math.abs(a - b);
        if (_DEBUG) console.log('dd: %s, dif: %s ', dd, dif);
        assert.ok(dd <= dif, comment);
    }
}