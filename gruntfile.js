var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});

var mountFolder = function (connect, dir) {
	var res = require('path').resolve(dir);
    return connect.static(require('path').resolve(dir));
};
module.exports = function(grunt) {

	// Configuration goes here 
	grunt.initConfig({
			watch: {
			livereload:{
				files: 'app/*',
				options: {
					livereload: LIVERELOAD_PORT,
				},
				}
			},
			connect: {
					livereload: {
						options: {
						middleware: function (connect) {
							return [
								lrSnippet,
								mountFolder(connect, 'app')
							];
							}
						},
				},
			},
			open: {
				dev: {
					path: 'http://localhost:8000/'
				},
			}
		});
		// Load plugins here
		grunt.loadNpmTasks('grunt-contrib-watch'); 
		grunt.loadNpmTasks('grunt-contrib-connect');
		grunt.loadNpmTasks('grunt-open');

		// Define your tasks here
		grunt.registerTask('default', ['connect','open', 'watch']);


	};