const imagemin = require('gulp-imagemin');

const imgPath = 'img/**/*.+(png|jpg|gif|svg)';
const destPath = '_site/img';

module.exports = gulp => {
  gulp.task('images', () => {
    return gulp
      .src(imgPath)
      .pipe(imagemin())
      .pipe(gulp.dest(destPath));
  });
};
