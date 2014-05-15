'use strict';

module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Notify Config
    notify: {
      build: {
        options: {
          title: 'Build Complete',
          message: 'Build has completed'
        }
      }
    },

    // Watch Config
    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        options: {
          reload: true
        }
      },
      js: {
        files: ['jvfloat.js'],
        tasks: ['jshint']
      }
    },

    // JSHint Config
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: 'jvfloat.js'
    },

    // Uglify Config
    uglify: {
      build: {
        options: {
          mangle: {
            except: ['jQuery']
          },
          compress: {
            drop_console: true
          },
          banner: '/* JVFloat.js v<%= pkg.version %> - Generated on: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'jvfloat.min.js': 'jvfloat.js'
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', 'Build JVFloat.js', [
    'uglify:build',
    'notify:build'
  ]);

  grunt.registerTask('default', ['watch']);
}


