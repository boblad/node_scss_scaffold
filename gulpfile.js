'use strict';

var path = require('path');

var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var env = require('gulp-env');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  gulp.src('public/scss/**/*.scss')
    .pipe(sassGlob())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('public/scss/**/*.scss', ['sass']);
});

gulp.task('dev', function () {
  nodemon({
    script: 'app.js'
    , ext: 'js html'
  });
  env({
  vars: {
    NODE_ENV: 'development'
  }
});
  gulp.watch('public/scss/**/*.scss', ['sass']);
})
