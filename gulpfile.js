var gulp        = require('gulp');
var browserSync = require('browser-sync');
var cp          = require('child_process');
var htmlmin     = require('gulp-htmlmin');
var sass        = require('gulp-sass');
var cleanCSS    = require('gulp-clean-css');
var autoprefix  = require('gulp-autoprefixer');
var concat      = require('gulp-concat');
var jshint      = require('gulp-jshint');
var babel       = require('gulp-babel');
var uglify      = require('gulp-uglify');
var imagemin    = require('gulp-imagemin');
var deploy      = require('gulp-gh-pages');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// Build the Jekyll Site
gulp.task('jekyll-build', function(done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
  .on('close', done);
  });

// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
  });

// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['styles', 'jekyll-build'], function() {
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
  return gulp.src('_scss/main.scss')
  .pipe(sass({
    includePaths: ['scss'],
    onError: browserSync.notify
    })
  )
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(autoprefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(gulp.dest('_site/css'))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest('css'));
  });


gulp.task('scripts', function() {
  return gulp.src('js/*.js')
  .pipe(jshint())
  .pipe(babel({
    presets: ['es2015']
    }))
  //.pipe(concat('scripts.js'))
  //.pipe(uglify())
  .pipe(gulp.dest('_site/js'));
  });

gulp.task('images', function() {
  return gulp.src('img/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('_site/img'));
  });

gulp.task('fonts', function() {
  return gulp.src('fonts/**/*')
  .pipe(gulp.dest('_site/fonts'))
})

// Watch scss files for changes & recompile
// Watch html/md files, run jekyll & reload BrowserSync
gulp.task('watch', function() {
  gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_data/*.yml'], ['jekyll-rebuild']);
  gulp.watch('_scss/**/*.scss', ['styles']);
  gulp.watch('js/*.js', ['scripts']);
  });

// deploy to github pages
gulp.task('deploy', ["jekyll-build"], function () {
  return gulp.src("./_site/**/*")
  .pipe(deploy());
  });

// Default task, running just `gulp` will compile the sass, compile the jekyll site, launch BrowserSync & watch files.
gulp.task('default', ['browser-sync', 'watch']);
