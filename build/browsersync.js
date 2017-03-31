const browserSync  = require('browser-sync').create();
const cp           = require('child_process');

const jekyll       = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

const scssPath     = ['_scss/**/*.scss'];
const jsPath       = ['_scripts/*.js'];
const templatePath = [ '*.html', '+(_includes|_layouts)/*.html', '*.yml', '_data/*.yml', '_posts/*'];

module.exports = gulp => {

  // run `jekyll build`
  gulp.task('jekyll-build', done => {
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
    .on('close', done);
  });

  // Rebuild Jekyll then reload the page
  gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
    browserSync.reload();
  });

  gulp.task('serve', ['jekyll-build'], () => {
    browserSync.init({
      server: {
        baseDir: '_site'
      }
    });

    gulp.watch(scssPath, ['sass', 'jekyll-rebuild']);
    gulp.watch(jsPath, ['scripts', 'jekyll-rebuild']);
    gulp.watch(templatePath, ['jekyll-rebuild']);
  });

}