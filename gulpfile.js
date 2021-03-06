"use strict";

const gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
  imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
     babel = require('gulp-babel'),
sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
      sass = require('gulp-sass');

gulp.task('minifyCss', function() {
    gulp.src('public/stylesheets/style.css')
        .pipe(cssmin())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('sassMainMin', () => {
    return gulp.src('src/styles/application.scss')
        .pipe(concat('index.min.css'))
        .pipe(sass())
        .pipe(cssmin())
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('concatScripts', function() {
    return gulp.src([
        'src/js/index.js',
        'src/js/scroll-animation.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('index.js'))
    .pipe(sourcemaps.write('../../maps'))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
    return gulp.src('public/javascripts/index.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('minifyThree', function() {
    return gulp.src('src/js/three-orbit-controls.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename('three-orbit-controls.min.js'))
        .pipe(sourcemaps.write('../../maps'))
        .pipe(gulp.dest('src/js'));
});

gulp.task('concatMinify', ['minifyScripts', 'minifyThree'], function() {
    return gulp.src([
        'src/js/three-orbit-controls.min.js',
        'public/javascripts/index.min.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('imageMin', function() {
    gulp.src(['src/img/**'])
            .pipe(imagemin({optimizationLevel: 5}))
            .pipe(gulp.dest('public/img'));
});

gulp.task('watch', () => {
    gulp.watch('src/styles/**/*.scss', ['sassMainMin']);
    gulp.watch('src/img/*.*', ['imageMin']);
});

gulp.task('default', ['watch']);

gulp.task('build', ['imageMin', 'concatMinify', 'minifyCss']);

// gulp.task('default', ['']);