// tom-weatherhead/thaw-tic-tac-toe-engine/Gruntfile.js

'use strict';

module.exports = require('thaw-config').grunt({
	eslint: true,
	mocha: true,
	webpack: false,
	forClient: false,
	forServer: true //,
	// dirname: __dirname
});

/*
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		eslint: {
			target: [
				'*.js',
				'src/*.js',
				'test/*.js'
			]
		},
		mochaTest: {
			options: {
				reporter: 'spec'
			},
			test: {
				src: ['test/*_spec.js']
			}
		}
	});

	// Tasks
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-mocha-test');

	// Aliases
	grunt.registerTask('test', ['eslint', 'mochaTest']);
	grunt.registerTask('default', ['test']);
};
 */
