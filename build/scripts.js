const eslint   = require('gulp-eslint');
const babel    = require('gulp-babel');
const uglify   = require('gulp-uglify');
const pump     = require('pump');

const jsPath   = '_scripts/*.js';
const destPath = '_site/js';

module.exports = gulp => {

  // gulp.task('scripts', function (cb) {
  //   console.log('compress');
  //   pump([
  //     gulp.src(jsPath),
  //     uglify(),
  //     gulp.dest(destPath)
  //     ],
  //     cb
  //     );
  // });

  gulp.task( 'scripts', () => {
    return gulp.src( jsPath )
    .pipe( eslint( {
      useEslintrc: true
    } ) )
    // .pipe( eslint.format() )
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe( uglify() )
    .pipe( gulp.dest( destPath ) )
    .pipe( gulp.dest( 'js' ) );
  });

}
