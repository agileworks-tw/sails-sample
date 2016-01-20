module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'bower:dev',
		// 'clean:dev',
		'jst:dev',
		// 'sass:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
