var gulp = require('gulp')
var concat = require('gulp-concat')
var server = require('gulp-connect')
var prefix = require('gulp-autoprefixer')
var vendor = require('bower-files')(require('./bower.json'))


gulp.task('default', ['build', 'watch', 'serve'])
gulp.task('build', ['scripts', 'styles'])

gulp.task('scripts', function() {
  return gulp.src(['source/index.js','source/**/*.js'])
    .pipe(concat('pull-menu.js', {newLine: '.'}))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('demo'))
    .pipe(server.reload());
})
gulp.task('styles', function() {
  return gulp.src('source/**/*.css')
    .pipe(concat('pull-menu.css'))
    .pipe(prefix())
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('demo'))
    .pipe(server.reload());
})
gulp.task('vendor', function () {
  gulp.src(vendor.ext('js').files)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('demo'))
    .pipe(server.reload());
})

gulp.task('watch', ['vendor'], function() {
  gulp.watch('source/**/*.js', ['scripts'])
  gulp.watch('source/**/*.css', ['styles'])
})

gulp.task('serve', function() {
  server.server({
    root: 'demo',
    livereload: true
  });
});
