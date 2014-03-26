/*global module*/

module.exports = function (grunt) {
  "use strict";
  var filename = "leap-<%= pkg.version %>"
  var banner = "/*!                                                              \n * LeapJS v<%= pkg.version %>                                                  \n * http://github.com/leapmotion/leapjs/                                        \n *                                                                             \n * Copyright 2013 LeapMotion, Inc. and other contributors                      \n * Released under the BSD-2-Clause license                                     \n * http://github.com/leapmotion/leapjs/blob/master/LICENSE.txt                 \n */"

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    'string-replace': {
      build: {
        files: {
          'lib/': 'lib/version.js',
          './': 'bower.json',
          'examples/': 'examples/*',
          'test/': 'test/helpers/browser.html'
        },
        options: {
          replacements: [
            // version.js
            {
              pattern: /(full:\s)'.*'/,
              replacement: "$1'<%= pkg.version %>'"
            },
            {
              pattern: /(major:\s)\d/,
              replacement: "$1<%= pkg.version.split('.')[0] %>"
            },
            {
              pattern: /(minor:\s)\d/,
              replacement: "$1<%= pkg.version.split('.')[1] %>"
            },
            {
              pattern: /(dot:\s)\d/,
              replacement: "$1<%= pkg.version.split('.')[2] %>"
            },
            // bower.json
            {
              pattern: /"version": "\d.\d.\d"/,
              replacement: '"version": "<%= pkg.version %>"'
            },
            // examples
            {
              pattern: /leap.*\.js/,
              replacement: filename + '.js'
            }
          ]
        }
      }
    },

    clean: {
      build: {
        src: ['./leap-*.js']
      },
      invalid: {
        src: ['lib/invalid_objects/*']
      }
    },

    browserify: {
      build: {
        options: {
          ignore: ['lib/connection/node.js']
        },
        src: 'template/entry.js',
        dest: filename + '.js'
      }
    },

    uglify: {
      build: {
        src: filename + '.js',
        dest: filename + '.min.js'
      }
    },

    usebanner: {
      build: {
        options: {
          banner: banner
        },
        src: [filename + '.js', filename + '.min.js']
      }
    },

    watch: {
      files: 'lib/*',
      tasks: ['default']
    },

    exec: {
      'test-browser': './node_modules/.bin/mocha-phantomjs -R dot test/helpers/browser.html',
      'test-node': './node_modules/.bin/mocha lib/index.js test/helpers/node.js test/*.js -R dot',
      'test-integration': 'node integration_test/reconnection.js && node integration_test/protocol_versions.js'
    },

    execute: {
      target: {
        src: ['build_tasks/make_invalid.js']
      }
    },

    'template': {
      'invalid-defs': {
        'options': {
          data: function () {
            return {
              invalid_pointable: require('./lib/invalid_objects/pointable.json'),
              invalid_finger: require('./lib/invalid_objects/finger.json'),
              invalid_tool: require('./lib/invalid_objects/tool.json'),
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

  require('load-grunt-tasks')(grunt);

  grunt.registerTask("default", [
    "string-replace",
    "clean:invalid",
    "execute",
    "template:invalid-defs",
    "clean:build",
    'browserify',
    'uglify',
    'usebanner'
  ]);

  grunt.registerTask('test', [
    'default',
    'exec:test-browser',
    'exec:test-node',
    'exec:test-integration'
  ]);

};
