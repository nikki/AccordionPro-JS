module.exports = function (grunt) {
  'use strict';

    grunt.initConfig({
      banner: '/*!\n' +
              ' * Plugin Name:    Accordion Pro JS - a responsive accordion plugin for jQuery\n' +
              ' * Plugin URI:     http://stitchui.com/accordion-pro-js/\n' +
              ' * Version:        2.0.4\n' +
              ' * Author:         Stitch UI\n' +
              ' * Author URI:     http://stitchui.com\n' +
              ' *\n' +
              ' * Copyright:      (c) 2011-2016 Stitch UI\n' +
              ' */\n',

      concat: {
        banner: {
          options: {
            banner: '<%= banner %>'
          },
          files: [
            { src:
              [
                'js/lib/start.js',
                'js/lib/globals.js',
                'js/lib/helpers.js',
                'js/lib/setup.js',
                'js/lib/events.js',
                'js/lib/core.js',
                'js/lib/methods.js',
                'js/lib/defaults.js',
                'js/lib/init.js',
                'js/lib/end.js'
              ],
              dest: 'js/accordionpro.js' }
          ]
        },

        build: {
          options: {
            separator: '\n\n',
          },
          src: [
            'js/vendor/transitiontest.js',
            'js/vendor/animate.js',
            'js/accordionpro.js'
          ],
          dest: 'js/jquery.accordionpro.js'
        }
      },

      uglify: {
        build: {
          options: {
            preserveComments: 'some'
          },
          files: {
            'js/jquery.accordionpro.min.js' : 'js/jquery.accordionpro.js'
          }
        }
      },

      sass: {
        expanded: {
          options: {
            banner: '<%= banner %>',
            style: 'expanded',
            "sourcemap=none": ''
          },
          files: {
            'css/accordionpro.css' : 'css/scss/accordionpro.scss'
          }
        },
        compressed: {
          options: {
            banner: '<%= banner %>',
            style: 'compressed',
            "sourcemap=none": ''
          },
          files: {
            'css/accordionpro.min.css' : 'css/scss/accordionpro.scss'
          }
        }
      },

      sync: {
        toBuild: {
          files: [
            {
              src: ['CHANGELOG'],
              dest: '_build'
            }
          ],
          failOnError: true,
          pretend: false, // Don't do any IO. Before you run the task with `updateAndDelete` PLEASE MAKE SURE it doesn't remove too much.
          verbose: false // Display log messages when copying files
        },

        toBuildCSS: {
          files: [
            {
              src: ['css/accordionpro.css', 'css/accordionpro.min.css'],
              dest: '_build'
            }
          ],
          failOnError: true,
          pretend: false, // Don't do any IO. Before you run the task with `updateAndDelete` PLEASE MAKE SURE it doesn't remove too much.
          verbose: false // Display log messages when copying files
        },

        toBuildJS: {
          files: [
            {
              src: ['js/jquery.accordionpro.js', 'js/jquery.accordionpro.min.js'],
              dest: '_build'
            }
          ],
          failOnError: true,
          pretend: false, // Don't do any IO. Before you run the task with `updateAndDelete` PLEASE MAKE SURE it doesn't remove too much.
          verbose: false // Display log messages when copying files
        },

        toWPCSS: {
          files: [
            {
              src: ['css/accordionpro.css', 'css/accordionpro.min.css'],
              dest: '../accordionpro_wp/'
            }
          ],
          failOnError: true,
          pretend: false, // Don't do any IO. Before you run the task with `updateAndDelete` PLEASE MAKE SURE it doesn't remove too much.
          verbose: false // Display log messages when copying files
        },

        toWPJS: {
          files: [
            {
              src: ['js/jquery.accordionpro.js', 'js/jquery.accordionpro.min.js'],
              dest: '../accordionpro_wp/'
            }
          ],
          failOnError: true,
          pretend: false, // Don't do any IO. Before you run the task with `updateAndDelete` PLEASE MAKE SURE it doesn't remove too much.
          verbose: false // Display log messages when copying files
        }
      },

      watch: {
        options: {
          livereload: true,
          spawn: false
        },

        html: {
          files: ['index.html']
        },

        scss: {
          files: ['css/scss/*.scss'],
          tasks: ['sass']
        },

        images: {
          files: ['img-demo/*.*']
        },

        scripts: {
          files: ['js/lib/*.js'],
          tasks: ['default']
        },

        jasmine: {
          files: ['test/**/*.js'],
          tasks: ['test']
        }
      }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-sync');

    // Default task
    grunt.registerTask('default', ['sass', 'concat', 'uglify', 'sync']);

  };

