const browserSync = require('browser-sync').create();
const cp = require('child_process');

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

const scssPath = '_scss/**/*.scss';
const jsPath = '_scripts/*.js';
const templatePath = [
  '*.html',
  '+(_includes|_layouts)/*.html',
  '*.yml',
  '_data/*.yml',
  '_posts/*',
];

module.exports = gulp => {
  // run `jekyll build`
  gulp.task('jekyll-build', done => {
    return cp.spawn(jekyll, ['build'], { stdio: 'inherit' }).on('close', done);
  });

  // run `jekyll build` with _config_dev.yml
  gulp.task('jekyll-dev', done => {
    return cp
      .spawn(jekyll, ['build', '--config', '_config.yml,_config_dev.yml'], {
        stdio: 'inherit',
      })
      .on('close', done);
  });

  // Rebuild Jekyll then reload the page
  gulp.task('jekyll-rebuild', ['jekyll-dev'], () => {
    browserSync.reload();
  });

  gulp.task('serve', ['jekyll-dev'], () => {
    browserSync.init({
      server: {
        baseDir: '_site',
      },
    });

    gulp.watch(scssPath, ['sass', browserSync.reload]);
    gulp.watch(jsPath, ['scripts', browserSync.reload]);
    gulp.watch(templatePath, ['jekyll-rebuild']);
  });
};
