// Gulp it up
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver'),
    browserify = require('browserify'),
	  source = require('vinyl-source-stream'),
	  buffer = require('vinyl-buffer'),
	  // ts = require('gulp-typescript'),
	  // tsProject = ts.createProject('tsconfig.json'),
	  tsify = require('tsify');

var appSrc = 'public/',
    tsSrc = 'src/ts/',
    sassSrc = 'src/scss/';

gulp.task('markup', () => {
	gulp.src('src/*.html')
		.pipe(gulp.dest(appSrc));
});

gulp.task('typescript', ['markup'], () => {
	return browserify({
		basedir: '.',
		debug: true,
		entries: [tsSrc + 'main.ts'],
		cache: {},
		packageCache: {}
	})
	.plugin(tsify)
	.transform('babelify')
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(appSrc + 'js'))
});

// gulp.task('typescript', () => 
// 	tsProject.src()
// 		.pipe(ts(tsProject))
// 		.js.pipe(gulp.dest(appSrc + 'js'))
// 	);

gulp.task('sass', () => {
	return gulp.src(sassSrc + '**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(appSrc + './css'));
});

// Watch task
gulp.task('watch', () => {
	gulp.watch(sassSrc + '**/*.scss', ['sass']);
	// gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch(tsSrc + '**/*.ts', ['typescript']);
	gulp.watch('src/**/*.html', ['markup']);
});

// Start
gulp.task('webserver', () => {
	gulp.src(appSrc)
		.pipe(webserver({
			livereload: true,
			open: true
		}));
});

gulp.task('default', ['sass', 'markup', 'typescript', 'watch', 'webserver']);
