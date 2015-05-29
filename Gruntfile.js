/*global module:false*/
module.exports = function( grunt ) {
	'use strict';

	/**
	 * includeFile() - embeds a file content within another. Meant to be
	 * used from the copy task as a 'processContent' function. The following
	 * tokens can be used in files: <br>
	 *
	 *  -   BUILD_INCLUDE('file')
	 *  -   /* BUILD_INCLUDE('file') *\x47
	 *  -   &lt;!-- BUILD_INCLUDE("file") --&gt;
	 *
	 * In addition, options can be added to the token above that further
	 * process the file being included:
	 *
	 *  -   BUILD_INCLUDE('file')[option1,option2,option3]
	 *
	 * Supported options:
	 *
	 *  -   asJsString : Escapes all double-quotes and new line characters
	 *                   in the file
	 *
	 * @param {String} fileContent
	 * @param {String} filePath
	 *
	 * @return {String} fileContent
	 *
	 * @example
	 *
	 *  ...
	 *  copy: {
	 *      options: {
	 *          expand: true,
	 *          process: includeFile
	 *      }
	 *  }
	 *  ...
	 *
	 */
	function includeFile(fileContent, filePath){

		if (fileContent.indexOf("BUILD_INCLUDE") > -1) {

			grunt.log.write("includeFile(): [" + filePath + "] has BUILD_INCLUDE: ");

			// Match:
			//      // BUILD_INCLUDE('file')
			//      /* BUILD_INCLUDE('file') */
			//      <!-- BUILD_INCLUDE("file") -->
			//
			//  Token OPtions:
			//      // BUILD_INCLUDE('file')[options,here,as,array]
			//
			//      asJsString
			//
			var re = /(?:(?:\/\/)|(?:<\!\-\-)|(?:\/\*)) {0,}BUILD_INCLUDE\(['"](.*)['"]\)(?:\[(.*)\])?(?: {0,}(?:\-\-\>)| {0,}(?:\*\/))?/i,
				match, file, fileIncludeOptions;

			while ((match = re.exec(fileContent)) !== null) {

				grunt.log.write(".");
				grunt.verbose.writeln("    Match array: " + match );

				file = grunt.template.process( match[1] );

				grunt.verbose.writeln("    File to embed: " + file );

				file = grunt.file.read( file );

				// If options were set, then parse them
				if (match[2]) {

					fileIncludeOptions = match[2].split(',');

					// If option: asJsString
					if (
						fileIncludeOptions.some(function(option){
							return String(option).toLowerCase() === "asjsstring";
						})
					) {

						file = file
								.replace(/\"/g, '\\x22')
								.replace(/\r\n|\n/g, "\\n");

					}


				}

				fileContent = fileContent.replace(match[0], function(){ return file; });

			}
			grunt.log.writeln("");
			return fileContent;

		}

		return fileContent;

	}


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
				// setup a closure here or firefox will just navigate to a page with the text of true
				banner: 'javascript:(function(){',
				footer: '})();',
				preserveComments: false,
				quoteStyle: 1,
			},
			build: {
				files: {
					'bookmarklet.js': 'harvest.js',
				},
			},
		},

		copy: {
			options: {
				process: includeFile,
			},
			build: {
				files: {
					'readme.md': 'readme.md.src',
				}
			},
		},
	} );

	grunt.registerTask( 'default', ['jshint', 'uglify', 'copy'] );
};