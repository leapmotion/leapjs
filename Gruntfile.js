/*global module*/

module.exports = function (grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        clean:['lib/invalid_objects/*'],

        execute: {
            target: {
                src: ['build_tasks/make_invalid.js']
            }
        },

        'template': {
            'invalid-defs': {
                'options': {
                    data: function(){
                        return {
                            invalid_pointable: require('./lib/invalid_objects/pointable.json'),
                            invalid_hand: require('./lib/invalid_objects/hand.json'),
                            invalid_frame: require('./lib/invalid_objects/frame.json')
                        };
                    }
                },
                'files': {
                        'lib/invalid.js': ['build_tasks/templates/invalid_template.ejs']
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    // grunt.loadNpmTasks("grunt-contrib-uglify");
    // grunt.loadNpmTasks("grunt-contrib-jshint");
    // grunt.loadNpmTasks("grunt-contrib-concat");

    grunt.loadNpmTasks("grunt-execute");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-template');

    // Default task(s).
    grunt.registerTask("default", ["clean","execute", "template:invalid-defs"]);
};
