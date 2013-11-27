var assert = require('assert');
var util = require('util');
var _ = require('underscore');
var _DEBUG = 0;

var _DEFAULT_RANGE = 1e-6;

module.exports = {

    /**
     * A "Constant function" -- returns the default threshold, so you can see but not alter it.
     *
     * @returns {number}
     * @constructor
     */
    DEFAULT_RANGE: function () {
        return  _DEFAULT_RANGE;
    },

    /**
     * validates that a number >= 0 has been passed.
     *
     * @param threshold {number}
     * @param comment {string}
     */
    validThreshold: function (threshold, comment) {
        if (!comment) comment = 'threshold violation';
        assert.ok(_.isNumber(threshold), "matrix3CloseTo: third argument must be a number");
        assert.ok(threshold >= 0, 'matrix3CloseTo: threshold must be >= 0 -- is ' + threshold);
    },

    /**
     * compares one vector to another.
     * Uses the properties of the first parameter , and compares them to the second one.
     *
     * A few assumptions made:
     * 1) we don't care if vecB has extra properties
     * 2) nobody has/should add extra properties to either vecA, vecB
     * 3) these properties are numeric.
     *
     * @param vecA {Object}
     * @param vecB {Object}
     * @param threshold {float}
     * @param comment {string}
     */
    vectorCloseTo: function (vecA, vecB, threshold, comment) {
        try {
        if (!comment) comment = 'vectorCloseTo';
        module.exports.validThreshold(threshold, 'vectorCloseTo: ' + comment);

        assert.ok(vecA && _.isObject(vecA), util.format('vectorCloseTo bad argument 1: %s', vecA));
        assert.ok(vecB && _.isObject(vecB), util.format('vectorCloseTo bad argument 2: %s', vecB));

        if (_DEBUG) console.log('veca: %s', util.inspect(vecA));
        if (!threshold) threshold = module.exports.DEFAULT_RANGE();
        _.each(_.range(0, 3), function (dim) {
            module.exports.closeTo(vecA[dim], vecB[dim], threshold, comment, dim);
        });
} catch (e) {
    console.log('vct error: %s', e, util.inspect(vecA), util.inspect(vecB));
    throw e;
}
    },

    /**
     * compares one matrix to another. Same assumptions as vectorCloseTo.
     * While both functions are identical, this makes it easier to keep discrete tests
     * if vector and/or matrix definitions are changed in the future.
     *
     * @param matA {Object} : a Leap Matrix
     * @param matB {Object} : a Leap Matrix
     * @param threshold {float} a number
     * @param comment : {string}
     */
    matrix3CloseTo: function (matA, matB, threshold, comment) {

        try {
        if (!comment) comment = 'matrix3CloseTo';
        module.exports.validThreshold(threshold, 'matrix3CloseTo: ' + comment);

        if (!_.isNumber(threshold)) throw new Error("matrix3CloseTo: third argument must be a number");
        if (threshold < 0) throw new Error('matrix3CloseTo: threshold must be >= 0 -- is ' + threshold);

        assert.ok(matA && _.isObject(matA), util.format('vectorCloseTo bad argument 1: %s', matA));
        assert.ok(matB && _.isObject(matB), util.format('vectorCloseTo bad argument 2: %s', matB));

        if (!threshold) threshold = module.exports.DEFAULT_RANGE();

            _.each(_.range(0, 9), function (dim) {
                module.exports.closeTo(matB[dim], matA[dim], threshold, dim + ': ' + comment, dim);
            });
        } catch (e) {
            console.log('mct error: %s -- %s, %s', e, util.inspect(matA), util.inspect(matB));
            throw e;
        }
    },
    closeTo: function (a, b, threshold, comment, dim) {
        assert.ok(!_.isNaN(a), 'bad number a: ' + comment);
        assert.ok(!_.isNaN(b), 'bad number b: ' + comment);
        var dd = Math.abs(a - b);
        if (_DEBUG) console.log('dim: %s, dd: %s, threshold: %s ', dim, dd, threshold);
        assert.ok(dd <= threshold, comment);
    }
}