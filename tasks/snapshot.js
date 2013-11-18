/*
 * grunt-requirejs-revver
 * https://github.com/patocallaghan/grunt-requirejs-revver
 *
 * Copyright (c) 2013 Pat O'Callaghan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function ( grunt ) {

  grunt.registerMultiTask( 'staticsnapshot', 'Task to create snapshots based on dates.', function () {

    var copy = require( './lib/copy.js' ).init( grunt, this.data.options );
    var files = this.filesSrc;

    files.forEach(function(filepath) {
        copy.singleFile(filepath);        
    });
    grunt.log.writeln('file copied: ');
    grunt.task.run('generateindex');

  });

  grunt.registerMultiTask( 'generateindex', 'Task to create snapshots based on dates.', function () {

    var copy = require( './lib/copy.js' ).init( grunt );
    var baseDir =  grunt.file.expand('../http/snapshots/*');

    //generate snapshot Index
    copy.generateIndex( baseDir );
     
  } );

};
