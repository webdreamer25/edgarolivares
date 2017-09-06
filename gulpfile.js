// Gulp it up
'use strict'

var gulp = require('gulp'),
    // sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver'),
    browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	// ts = require('gulp-typescript'),
	// tsProject = ts.createProject('tsconfig.json'),
	tsify = require('tsify')

var pub = 'public/',
    src = 'src/',
    sassSrc = 'src/scss/'

gulp.task('markup', function () {
	gulp.src(src + '*.html')
		.pipe(gulp.dest(pub))
})

gulp.task('scripts', function () {
	return gulp.src(src + '**/*.js')
	.pipe(sourcemaps.init())
	.pipe(gulp.dest(pub))
	.pipe(uglify({ preserveComments: 'license' }))
	// .pipe(rename({ extname: '.min.js' }))
	.pipe(sourcemaps.write('maps'))
	.pipe(gulp.dest(pub))
})

// gulp.task('typescript', ['markup'], () => {
// 	return browserify({
// 		basedir: '.',
// 		debug: true,
// 		entries: [tsSrc + 'main.ts'],
// 		cache: {},
// 		packageCache: {}
// 	})
// 	.plugin(tsify)
// 	.transform('babelify')
// 	.bundle()
// 	.pipe(source('bundle.js'))
// 	.pipe(buffer())
// 	.pipe(sourcemaps.init({loadMaps: true}))
// 	.pipe(uglify())
// 	.pipe(sourcemaps.write('./'))
// 	.pipe(gulp.dest(appSrc + 'js'))
// });

// gulp.task('typescript', () => 
// 	tsProject.src()
// 		.pipe(ts(tsProject))
// 		.js.pipe(gulp.dest(appSrc + 'js'))
// 	);

// gulp.task('sass', function () {
// 	return gulp.src(src + 'scss/**/*.scss')
// 		.pipe(sass().on('error', sass.logError))
// 		.pipe(gulp.dest(pub + 'css'))
// })

// Watch task
gulp.task('watch', function () {
	// gulp.watch(src + 'scss/**/*.scss', ['sass'])
	gulp.watch(src + 'js/**/*.js', ['scripts'])
	gulp.watch(src + '*.html', ['markup'])
})

// Start
gulp.task('webserver', function () {
	gulp.src(pub)
		.pipe(webserver({
			livereload: true,
			open: true
		}))
})

gulp.task('default', ['markup', 'scripts', 'watch', 'webserver'])
