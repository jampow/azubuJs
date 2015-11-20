var gulp = require('gulp');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var mocha = require('gulp-mocha');

var lib = 'lib/azubu-api.js';

gulp.task('default', ['build']);

gulp.task('watch', function(){
	watch(['test/**/*.js', lib], batch(function(events, done) {
		gulp.start('test', done);
	}));
});

gulp.task('build', function(){
	return gulp.src(lib)
		.pipe(replace(/\/\*\* Test-begins[.\n\N\s\S]*?Test-ends \*\*\//g, ''))
		.pipe(uglify())
		.pipe(rename('azubu-api.min.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('test-build', function(){
	return gulp.src(lib)
		.pipe(uglify())
		.pipe(rename('azubu-api.test.min.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('test', ['test-build'], function(){
	return gulp.src('test/**/*.js')
		pipe(mocha());
});
