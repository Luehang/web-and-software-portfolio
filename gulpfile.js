"use strict";

const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
     babel = require('gulp-babel'),
      sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps');

gulp.task('compileSass', function() {
    gulp.src('src/styles/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('../../maps'))
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('concatScripts', function() {
    return gulp.src([
        'src/js/main.js',
        'src/js/scroll-animation.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('index.js'))
    .pipe(sourcemaps.write('../../maps'))
    .pipe(gulp.dest('src/js'));
});

gulp.task('compileReact', function() {
    return gulp.src(['src/app.js', 'src/components/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env', 'react']
        }))
        .pipe(rename('bundle.js'))
        .pipe(sourcemaps.write('../../maps'))
        .pipe(gulp.dest('public'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
    return gulp.src('src/js/index.js')
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
    .pipe(concat('index.min.js'))
    .pipe(gulp.dest('public/javascripts'));
})

gulp.task('imageMin', function() {
    gulp.src(['src/img/calc.jpg', 
        'src/img/camper_leaderboard.jpg',
        'src/img/game_of_life.jpg',
        'src/img/lue_hang.jpg',
        'src/img/markdown.jpg',
        'src/img/pomodoro.jpg',
        'src/img/quote.jpg',
        'src/img/recipe_box.jpg',
        'src/img/riverside-pizza.jpg',
        'src/img/simon.jpg',
        'src/img/tic_tac_toe.jpg',
        'src/img/twitch.jpg',
        'src/img/weather.jpg',
        'src/img/wiki.jpg',])
            .pipe(imagemin({optimizationLevel: 5}))
            .pipe(gulp.dest('public/img'));
});

gulp.task('build', ['compileSass', 'concatMinify']);

gulp.task('test', ['concatMinify']);