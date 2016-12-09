var gulp        = require('gulp');
var browserSync = require('browser-sync');
var cp          = require('child_process');
var htmlmin     = require('gulp-htmlmin');
var sass        = require('gulp-sass');
var cssnano     = require('gulp-cssnano');
var cleanCSS    = require('gulp-clean-css');
var prefix      = require('gulp-autoprefixer');
var jshint      = require('gulp-jshint');
var babel       = require('gulp-babel');
var uglify      = require('gulp-uglify');
var imagemin    = require('gulp-imagemin');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
  jekyllDev: 'Running: $ jekyll build for dev',
  jekyllProd: 'Running: $ jekyll build for prod'
};

// Build the Jekyll Site
gulp.task('jekyll-dev', function(done) {
  browserSync.notify(messages.jekyllDev);
  return cp.spawn( jekyll , ['build', '--drafts', '--config', '_config.yml'], {stdio: 'inherit'})
  .on('close', done);
  });

// Rebuild Jekyll & reload the page
gulp.task('jekyll-rebuild', ['jekyll-dev'], function () {
  browserSync.reload();
  });

// Wait for jekyll-dev task to complete, then launch the Server
gulp.task('browser-sync', ['styles', 'scripts', 'jekyll-dev'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
    });
  });

gulp.task('htmlmin', function() {
  return gulp.src('*.html')
  .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
  .pipe(gulp.dest('_site'));
  });

// Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
gulp.task('styles', function() {
  return gulp.src('_scss/*.scss')
  .pipe(sass({
    includePaths: ['scss'],
    onError: browserSync.notify
    })
  )
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
  .pipe(cssnano())
  .pipe(gulp.dest('_site/css'))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest('css'));
  });

// Compile files from js folder into both _site/js folder (for live injecting)
gulp.task('scripts', function() {
  return gulp.src('js/*.js')
  .pipe(jshint())
  .pipe(babel({
    presets: ['es2015']
    }))
  .pipe(gulp.dest('_site/js'))
  .pipe(browserSync.reload({stream:true}));
  });

// Watch scss files for changes & recompile
// Watch html/md files, run jekyll & reload BrowserSync
gulp.task('watch', function () {
  gulp.watch(['_scss/**/*.scss','_scss/*.scss'], ['styles']);
  gulp.watch(['js/*.js'], ['scripts']);
  gulp.watch(['index.html', '404.html', '_layouts/*.html', '_posts/*', '_includes/*.html', '_drafts/*', '**/*.html'], ['jekyll-rebuild']);
  });

// Build the Jekyll Site in production mode
gulp.task('jekyll-prod', function (done) {
  browserSync.notify(messages.jekyllProd);
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
  .on('close', done);
  });

// Identical Sass compilation task to development mode, with an additional minification step thrown in using clean-css
gulp.task('styles-prod', function () {
  return gulp.src('_scss/*.scss')
  .pipe(sass({
    includePaths: ['scss'],
    onError: browserSync.notify
    }))
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(cssnano())
  .pipe(gulp.dest('_site/css'))
  .pipe(gulp.dest('css'));
  });

// Identical Javascript compilation task to development mode, with an additional minification step thrown in using uglify
gulp.task('scripts-prod', function() {
  return gulp.src(['js/*.js'])
  .pipe(uglify())
  .pipe(gulp.dest('_site/js'));
  });

gulp.task('images', function() {
  return gulp.src('img/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('_site/img'));
  });

gulp.task('fonts', function() {
  return gulp.src('fonts/**/*')
  .pipe(gulp.dest('_site/fonts'));
  });

// Default task, running just gulp will compile the sass, compile the Jekyll site, launch BrowserSync & watch files.
gulp.task('default', ['browser-sync', 'watch']);

// Build task, run using gulp build to compile Sass and Javascript ready for deployment.
gulp.task('build', ['fonts', 'images', 'styles-prod', 'scripts-prod', 'jekyll-prod']);
