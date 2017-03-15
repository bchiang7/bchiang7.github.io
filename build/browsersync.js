const browserSync  = require('browser-sync');
const cp           = require('child_process');

const jekyll       = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

const scssPath     = ['_scss/**/*.scss'];
const jsPath       = ['_scripts/*.js'];
const templatePath = [ '**/*.html', '**/*.yml', '_posts/*', '_drafts/*'];

module.exports = gulp => {

  // Build the Jekyll Site
  gulp.task('jekyll-build', done => {
    return cp.spawn( jekyll , ['build', '--drafts', '--config', '_config.yml'], {stdio: 'inherit'})
    .on('close', done);
  });

  // Rebuild Jekyll then reload the page
  gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
    browserSync.reload();
  });

  // Wait for jekyll-build task to complete, then launch the Server
  gulp.task('browser-sync', ['sass', 'scripts', 'jekyll-build'], () => {
    browserSync({
      server: {
        baseDir: '_site'
      }
    });
  });

  gulp.task('watch', () => {
    gulp.watch(scssPath, ['sass', 'jekyll-rebuild']);
    gulp.watch(jsPath, ['scripts', 'jekyll-rebuild']);
    gulp.watch(templatePath, ['jekyll-rebuild']);
  });

  gulp.task('serve', ['browser-sync', 'watch']);

}