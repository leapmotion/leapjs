var assert = require('assert');
var util = require('util');
var _ = require('underscore');
var _DEBUG = false;

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
        assert.ok(_.isNumber(threshold), "MatrixCloseTo: third argument must be a number");
        assert.ok(threshold >= 0, 'MatrixCloseTo: threshold must be >= 0 -- is ' + threshold);
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
        if (!comment) comment = 'vectorCloseTo';
        module.exports.validThreshold(threshold, 'vectorCloseTo: ' + comment);

        assert.ok(vecA && _.isObject(vecA), util.format('vectorCloseTo bad argument 1: %s', vecA));
        assert.ok(vecB && _.isObject(vecB), util.format('vectorCloseTo bad argument 2: %s', vecB));

        if (_DEBUG) console.log('veca: %s', util.inspect(vecA));
        if (!threshold) threshold = module.exports.DEFAULT_RANGE();

        _.each(_.keys(vecA), function (dim) {
            module.exports.closeTo(vecA[dim], vecB[dim], threshold, comment);
        });
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
    matrixCloseTo: function (matA, matB, threshold, comment) {
        if (!comment) comment = 'matrixCloseTo';
        module.exports.validThreshold(threshold, 'matrixCloseTo: ' + comment);

        if (!_.isNumber(threshold)) throw new Error("MatrixCloseTo: third argument must be a number");
        if (threshold < 0) throw new Error('MatrixCloseTo: threshold must be >= 0 -- is ' + threshold);

        assert.ok(matA && _.isObject(matA), util.format('vectorCloseTo bad argument 1: %s', matA));
        assert.ok(matB && _.isObject(matB), util.format('vectorCloseTo bad argument 2: %s', matB));

        if (!threshold) threshold = module.exports.DEFAULT_RANGE();

        _.each(_.keys(matA), function (dim) {
            module.exports.closeTo(matB[dim], matA[dim], threshold, dim + ': ' + comment);
        });
    },
    closeTo: function (a, b, threshold, comment) {
        var dd = Math.abs(a - b);
        if (_DEBUG) console.log('dd: %s, threshold: %s ', dd, threshold);
        assert.ok(dd <= threshold, comment);
    }
}