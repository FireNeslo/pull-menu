var gulp = require('gulp')
var concat = require('gulp-concat')
var server = require('gulp-connect')
var prefix = require('gulp-autoprefixer')
var vendor = require('bower-files')(require('./bower.json'))
var styl = require('gulp-stylus')

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
  return gulp.src('source/demo.styl')
    .pipe(styl())
    .pipe(prefix())
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('demo'))
    .pipe(server.reload());
})
gulp.task('vendor',['vendor.css'], function () {
  gulp.src(vendor.ext('js').files)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('demo'))
    .pipe(server.reload());
})

gulp.task('vendor.css', function(){
  gulp.src(vendor.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('demo'))
    .pipe(server.reload());
})

gulp.task('watch', ['vendor'], function() {
  gulp.watch('source/**/*.js', ['scripts'])
  gulp.watch('source/**/*.styl', ['styles'])
})

gulp.task('serve', function() {
  server.server({
    root: 'demo',
    port: 8081,
    livereload: true
  });
});
