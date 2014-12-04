module.exports = function (grunt) {
  'use strict';

    grunt.initConfig({
      banner: '/*!\n' +
              ' * Project:    Accordion Pro JS - a responsive accordion plugin for jQuery\n' +
              ' * Author:     Nicola Hibbert\n' +
              ' * URL:        http://codecanyon.net/item/accordion-pro-js-responsive-jquery-accordion/5480772?ref=StitchUI\n' +
              ' *\n' +
              ' * Version:    2.0\n' +
              ' * Copyright:  (c) 2010-2015 Nicola Hibbert\n' +
              ' */\n',

      concat: {
        banner: {
          options: {
            banner: '<%= banner %>'
          },
          files: [
            { src: 'js/lib/jquery.accordionpro.js', dest: 'js/jquery.accordionpro.js' }
          ]
        },

        build: {
          options: {
            separator: '\n\n',
          },
          src: [
            'js/vendor/imagesloaded.js',
            'js/vendor/transitiontest.js',
            'js/vendor/animate.js',
            'js/jquery.accordionpro.js'
          ],
          dest: 'js/jquery.accordionpro.js'
        }
      },

      uglify: {
        options: {
          preserveComments: 'some'
        },
        build: {
          files: {
            'js/jquery.accordionpro.min.js' : 'js/jquery.accordionpro.js'
          }
        }
      },

      sass: {
        build: {
          options: {
            banner: '<%= banner %>',
            style: 'compressed'
          },
          files: {
            'css/accordionpro.css' : 'css/scss/accordionpro.scss'
          }
        }
      },

      jasmine: {
        src: 'js/jquery.accordionpro.js',
        options: {
          vendor: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
          ],
          specs: 'test/**/*.js'
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
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task
    grunt.registerTask('default', ['sass', 'concat', 'uglify']);
    grunt.registerTask('test', ['default', 'jasmine']);

  };

