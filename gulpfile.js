'use strict';
//imagemin makes the file smaller and the image load faster
var gulp = require('gulp');
var Sass = require('gulp-Sass');
var imagemin = require('gulp-imagemin')

gulp.task('Sass', function () {
return gulp.src('./public/Sass/**/*.scss')
.pipe(Sass().on('error', Sass.logError))
.pipe(gulp.dest('./public/css'));
});

gulp.task('Sass:watch', function () {
gulp.watch('./public/Sass/**/*.scss', ['Sass']);
});


