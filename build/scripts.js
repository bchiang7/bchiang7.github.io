const jshint      = require('gulp-jshint');
const babel       = require('gulp-babel');
const uglify      = require('gulp-uglify');

const jsPath = '_scripts/*.js';
const destPath = '_site/js';

module.exports = gulp => {

  gulp.task('scripts', () => {
    return gulp.src( jsPath )
    .pipe(jshint())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest( destPath ))
    .pipe(gulp.dest( 'js' ));
  });

}
