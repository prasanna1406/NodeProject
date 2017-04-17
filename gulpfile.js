var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');

gulp.task('default', function() {
    // place code for your default task here
});
gulp.task('js', function() {
    gulp.src('public/javascripts/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/scripts/'));
});

gulp.task('css', function() {
    gulp.src('src/styles/*.css')
        .pipe(concat('styles.css'))
        .pipe(minify())
        .pipe(gulp.dest('build/styles/'));
});

gulp.task('default', ['js', 'css'], function() {});