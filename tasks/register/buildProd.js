module.exports = function (grunt) {
	grunt.registerTask('buildProd', [
		'bower:prod',
		'compileAssets',
		'concat',
		'uglify',
		'cssmin',
		'linkAssetsBuildProd',
		'clean:build',
		'copy:build'
	]);
};
