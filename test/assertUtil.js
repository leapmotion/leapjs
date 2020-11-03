(function (window) {

    if (typeof module != 'undefined') {
        var assert = require('assert');
        var util = require('util');
    } else {
        var assert = window.assert;
    }

    function ok(test, message) {
        if (assert && assert.ok) {
            assert.ok(test, message);
        } else {
            assert.strictEqual(!!test, message);
        }
    }

    function isObject(o){
        return typeof o == 'object';
    }

    var _DEFAULT_RANGE = 1e-6;

    var _DEBUG = 0;

    function f(v1, v2, v3) {
        var args = arguments || [v1, v2, v3];
        if (typeof util !== 'undefined') {
            return util.format.apply(util, args);
        } else {
            try {
                return args.join(',');// very sloppy hack of util.format
            } catch (er) {
                return args[0];
            }
        }
    }

    var lib = {

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
            ok(!Number.isNaN(threshold), "matrix3CloseTo: third argument must be a number");
            ok(threshold >= 0, 'matrix3CloseTo: threshold must be >= 0 -- is ' + threshold);
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
         * @param vecA {Object|array}
         * @param vecB {Object|array}
         * @param threshold {float}
         * @param comment {string}
         */
        vectorCloseTo: function (vecA, vecB, threshold, comment) {
            try {
                if (!comment) comment = 'vectorCloseTo';
                lib.validThreshold(threshold, 'vectorCloseTo: ' + comment);

                ok(vecA && isObject(vecA), f('vectorCloseTo bad argument 1: %s', vecA));
                ok(vecB && isObject(vecB), f('vectorCloseTo bad argument 2: %s', vecB));

                if (_DEBUG) console.log('veca: %s', f(vecA));
                if (!threshold) threshold = lib.DEFAULT_RANGE();
                for (let dim = 0; dim < 3; dim++){
                    lib.closeTo(vecA[dim], vecB[dim], threshold, comment, dim);
                }
            } catch (e) {
                console.log('vct error: %s', e, f(vecA), f(vecB));
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
         * @param threshold {number} a number
         * @param comment : {string}
         */
        matrix3CloseTo: function (matA, matB, threshold, comment) {

            try {
                if (!comment) comment = 'matrix3CloseTo';
                lib.validThreshold(threshold, 'matrix3CloseTo: ' + comment);

                if (!(typeof threshold == 'number')) throw new Error("matrix3CloseTo: third argument must be a number");
                if (threshold < 0) throw new Error('matrix3CloseTo: threshold must be >= 0 -- is ' + threshold);

                ok(matA && isObject(matA), f('vectorCloseTo bad argument 1: %s', matA));
                ok(matB && isObject(matB), f('vectorCloseTo bad argument 2: %s', matB));

                if (!threshold) threshold = lib.DEFAULT_RANGE();

                for (let dim = 0; dim < 9; dim++){
                    lib.closeTo(matB[dim], matA[dim], threshold, dim + ': ' + comment, dim);
                }
            } catch (e) {
                console.log('mct error: %s -- %s, %s', e, f(matA), f(matB));
                throw e;
            }
        },
        closeTo: function (a, b, threshold, comment, dim) {
            // Inline Definition of Number.IsNaN()
            ok(!(typeof a === 'number' && a !== a), 'bad number a: ' + comment);
            ok(!(typeof b === 'number' && b !== b), 'bad number b: ' + comment);
            var dd = Math.abs(a - b);
            if (_DEBUG) console.log('dim: %s, dd: %s, threshold: %s ', dim, dd, threshold);
            ok(dd <= threshold, comment);
        }
    };

    if (typeof module == 'undefined') {
        window.assertUtil = lib;
    } else {
        module.exports = lib;
    }
})(this);