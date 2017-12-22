"use strict";

const gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
  imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
     babel = require('gulp-babel'),
sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

//       sass = require('gulp-sass');
    


// gulp.task('compileSass', function() {
//     gulp.src('src/styles/style.scss')
//         .pipe(sourcemaps.init())
//         .pipe(sass())
//         .pipe(sourcemaps.write('../../maps'))
//         .pipe(gulp.dest('public/stylesheets'));
// });

gulp.task('minifyCss', function() {
    gulp.src('public/stylesheets/style.css')
        .pipe(cssmin())
        .pipe(rename('style.min.css'))
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

// gulp.task('compileReact', function() {
//     return gulp.src(['src/app.js', 'src/components/*.js'])
//         .pipe(sourcemaps.init())
//         .pipe(babel({
//             presets: ['env', 'react']
//         }))
//         .pipe(rename('bundle.js'))
//         .pipe(sourcemaps.write('../../maps'))
//         .pipe(gulp.dest('public'));
// });

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
    gulp.src(['src/img/*.jpg', 
        'src/img/*.png', 
        'src/img/*.svg'])
            .pipe(imagemin({optimizationLevel: 5}))
            .pipe(gulp.dest('public/img'));
});

gulp.task('build', ['imageMin', 'concatMinify', 'minifyCss']);

// gulp.task('default', ['']);