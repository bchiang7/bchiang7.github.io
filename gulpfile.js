'use strict';

const gulp        = require('gulp');
const browserSync = require('browser-sync');
const cp          = require('child_process');
const sass        = require('gulp-sass');
const prefix      = require('gulp-autoprefixer');
const cleanCSS    = require('gulp-clean-css');
const jshint      = require('gulp-jshint');
const babel       = require('gulp-babel');
const uglify      = require('gulp-uglify');
const imagemin    = require('gulp-imagemin');

const jekyll      = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

// Build the Jekyll Site
gulp.task('jekyll-build', done => {
  return cp.spawn( jekyll , ['build', '--drafts', '--config', '_config.yml'], {stdio: 'inherit'})
  .on('close', done);
});

// Rebuild Jekyll & reload the page
gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
  browserSync.reload();
});

// Wait for jekyll-build task to complete, then launch the Server
gulp.task('browser-sync', ['styles', 'scripts', 'jekyll-build'], () => {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

const scssPath = ['_scss/**/*.scss','_scss/*.scss'];
const jsPath = ['_scripts/*.js'];
const templatePath = ['index.html', '404.html', '_layouts/*.html', '_includes/*.html', '_data/*.yml', '_posts/*', '_drafts/*', '**/*.html'];

gulp.task('watch', () => {
  gulp.watch(scssPath, ['styles', 'jekyll-rebuild']);
  gulp.watch(jsPath, ['scripts', 'jekyll-rebuild']);
  gulp.watch(templatePath, ['jekyll-rebuild']);
});

gulp.task('styles', () => {
  return gulp.src('_scss/*.scss')
  .pipe(sass({
    includePaths: ['scss'],
    onError: browserSync.notify
  }))
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('_site/css'))
  .pipe(gulp.dest('css'));
});

gulp.task('scripts', () => {
  return gulp.src('_scripts/*.js')
  .pipe(jshint())
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(uglify())
  .pipe(gulp.dest('_site/js'))
  .pipe(gulp.dest('js'));
});

gulp.task('images', () => {
  return gulp.src('img/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('_site/img'));
});

gulp.task('fonts', () => {
  return gulp.src('fonts/**/*')
  .pipe(gulp.dest('_site/fonts'));
});


gulp.task('serve', ['browser-sync', 'watch']);

gulp.task('build', ['styles', 'scripts', 'images', 'fonts', 'jekyll-build']);
