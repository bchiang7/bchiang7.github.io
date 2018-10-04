const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');

const jsPath = '_scripts/*.js';
const destPath = '_site/js';

module.exports = gulp => {
  gulp.task('scripts', () => {
    return (
      gulp
        .src(jsPath)
        .pipe(
          eslint({
            useEslintrc: true,
          })
        )
        .pipe(eslint.format())
        // .pipe(uglify())
        .pipe(gulp.dest(destPath))
        .pipe(gulp.dest('js'))
    );
  });
};
