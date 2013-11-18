'use strict';

exports.init = function ( grunt, options ) {

	var handlebars = require( 'handlebars' );
	var todaysDate = grunt.template.today('dd-mm-yyyy');
	var currentDir = '../http/snapshots/' + todaysDate;

	exports.singleFile = function ( file ) {
		var cleanFileName =  file.toString().replace('../', '');
		grunt.file.copy(file, currentDir + '/' + cleanFileName);
		grunt.log.writeln('file copied: ' + cleanFileName);
	};

	exports.generateIndex = function ( baseDir ) {
		

		var source = grunt.file.read('../build/node_modules/grunt-static-snapshot/snapshotTemplate.html');
		var template = handlebars.compile(source);
		var data = { 
			"currentdate": grunt.template.today('dd-mm-yyyy'),
			"snapshots": []
		};
		
		var snapshotList = baseDir.toString().split(',');

		snapshotList.forEach(function(f){
			var cleanDirectoryName =  f.toString().replace('../http/snapshots/', '');
			if(cleanDirectoryName.indexOf('.html')=== -1){
				data.snapshots.push({
					date: cleanDirectoryName,
					url: cleanDirectoryName + '/http/template/dist/kitchen-sink.html'
				});
			}
		});
		
		var result = template(data);

		grunt.file.write('../http/snapshots/index.html', result);
		grunt.log.writeln('Index.html Created');

	};

	return exports;

};