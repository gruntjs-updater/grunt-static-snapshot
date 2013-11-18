/*
 * grunt-snapshot
 * https://github.com/lindsay/snapshot
 *
 * Copyright (c) 2013 lindsayjopson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
   /* snapshot: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123'],
        },
      },
      custom_options: {
        options: {
          separator: ': ',
          punctuation: ' !!!',
        },
        files: {
          'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123'],
        },
      },

    },*/

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, src: ['http/template/dist/**'], dest: 'snapshots/<%= grunt.template.today("dd-mm-yyyy") %>', filter: 'isFile'},
          {expand: true, src: ['http/content/css/**', 'http/content/fonts/**','http/content/images/**','http/content/scripts/**'], dest: 'snapshots/<%= grunt.template.today("dd-mm-yyyy") %>/', filter: 'isFile'}
        ]
      }
    },
    staticsnapshot: {
      files: ['http/content/fonts/**/*.*', 'http/content/images/**/*.*', 'http/content/**/*.css' , 'http/content/**/*.js', 'http/template/dist/**/*.html'], //fonts images css js html
      options: {
        html: true,
        css: false
      }
    },
    generateindex: {
      files: []
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  /*grunt.loadNpmTasks('grunt-contrib-copy');*/

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nodeunit']);
  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
