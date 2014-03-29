module.exports = function(grunt){
  var filename = "leap-<%= pkg.version %>"
  var banner = "/*!                                                              \
\n * LeapJS v<%= pkg.version %>                                                  \
\n * http://github.com/leapmotion/leapjs/                                        \
\n *                                                                             \
\n * Copyright 2013 LeapMotion, Inc. and other contributors                      \
\n * Released under the BSD-2-Clause license                                     \
\n * http://github.com/leapmotion/leapjs/blob/master/LICENSE.txt                 \
\n */"

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    // This updates the version.js to match pkg.version
    'string-replace': {
      build: {
        files: {
          'lib/': 'lib/version.js',
          './': 'bower.json',
          'examples/': 'examples/*',
          'test/': 'test/helpers/browser.html'
        },
        options:{
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
        src: filename  + '.js',
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
      // -i -g stands for inverse grep.  Tests tagged browser-only will be excluded.
      'test-node': './node_modules/.bin/mocha lib/index.js test/helpers/node.js test/*.js -R dot -i -g browser-only',
      'test-integration': 'node integration_test/reconnection.js && node integration_test/protocol_versions.js'
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'string-replace',
    'clean',
    'browserify',
    'uglify',
    'usebanner'
  ]);

  grunt.registerTask('test-only', [
    'exec:test-browser',
    'exec:test-node',
    'exec:test-integration'
  ]);

  grunt.registerTask('test', [
    'default',
    'test-only'
  ]);
}