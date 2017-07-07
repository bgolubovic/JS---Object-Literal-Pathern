//gulpfile.js - build tool configuration

var gulp = require('gulp'),
cssmin = require('gulp-clean-css'), 
sourcemaps = require('gulp-sourcemaps'), 
rename = require('gulp-rename'),
prefix = require('gulp-autoprefixer'),
clean = require('gulp-clean'), 
jshint = require('gulp-jshint'),
runSequence = require('run-sequence'),
bSync = require('browser-sync');

// Paths
var main = 'src';
var assets = main + '/assets';
var css = main + '/css';
var js = main + '/js';
var dist = 'dist';

// Clean dist directory
gulp.task('clean', function(cb) {
	return gulp.src(dist, {
		read : false
	}).pipe(clean());
});

//Lint JS files
gulp.task('jshint', function() {
    gulp.src( [js +'/**/*.js' ,  '!' + js + '/libs/*'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

// Copy index.html
gulp.task('html', function() {
	return gulp.src(main + '/index.html')
		.pipe(gulp.dest(dist))
});

// Minify all css files to css/style.min.css
gulp.task('style', function() {
	return gulp.src(css + '/style.css')
	.pipe(sourcemaps.init())
	.pipe(cssmin())
	.pipe(prefix())
	.pipe(rename('style.min.css'))
	.pipe(sourcemaps.write('/'))
	.pipe(gulp.dest(dist + '/css'));
});

// Copy js files
gulp.task('scripts', function() {
	return gulp.src([ js + '/main.js',  js + '/**/*.js' ]).pipe(
			gulp.dest(dist + '/js'));
});

// Copy static assets
gulp.task('assets', function() {
	return gulp.src(main + '/assets/**/*').pipe(gulp.dest(dist + '/assets'))
});

// Copy data.json
gulp.task('json', function() {
	return gulp.src(main + '/js/data.json').pipe(gulp.dest(dist + '/js'))
});

// [DEV] Browser sync server & watch task --DEV
gulp.task('server-dev', function(done) {
	bSync.init({
		server : {
			watchTask : true,
			baseDir : [ dist ],
			port : 3010,
			livereload : true
		},
		livereload : true,
		port : 8000
	});

	gulp.watch(main + '/templates/**/*.html', [ 'html-watch' ]);
	gulp.watch(css + '/**/*.css', [ 'css-watch' ]);
	gulp.watch(js + '/**/*.js', [ 'js-watch' ]);

	done();
});

// [DEV] Watch tasks
gulp.task('js-watch', [ 'scripts' ], bSync.reload);
gulp.task('css-watch', [ 'style' ], bSync.reload);
gulp.task('html-watch', [ 'html' ], bSync.reload);

//////////////////////////////////////////////////////////////////
// development build task
// //////////////////////////////////////////////////////////////
gulp.task('dev', function	(callback) {
	runSequence(
		'clean',
		'jshint', 
		[ 'html', 'style', 'assets', 'scripts', 'json'],
		'server-dev', 
		callback);
});

/////////////////////////////////////////////////////////////////
// production build task
////////////////////////////////////////////////////////////////
gulp.task('pro', function(callback) {
	runSequence(
			'jshint', 
			'clean', 
			[ 'html', 'style', 'assets', 'script', 'json'],
			callback);
});

////////////////////////////////////////////////////////////////
// Gulp default task
////////////////////////////////////////////////////////////////
gulp.task('default', [ 'dev' ]);