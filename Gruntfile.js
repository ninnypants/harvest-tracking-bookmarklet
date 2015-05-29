/*global module:false*/
module.exports = function( grunt ) {
	'use strict';

	// load all dependencies
	require( 'matchdep' ).filterAll( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		jshint: {
			files: {
				src: 'harvest.js'
			}
		},

		uglify: {
			options: {
				sourceMap: false,
				screwIE8: true,
				banner: 'javascript:(function(){',
				footer: '})();',
				preserveComments: false,
			},
			build: {
				files: {
					'bookmarklet.js': 'harvest.js',
				},
			},
		},
	} );

	grunt.registerTask( 'default', ['jshint', 'uglify'] );
};