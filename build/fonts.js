const fontsPath = 'fonts/**/*';
const destPath = '_site/fonts';

module.exports = gulp => {

  gulp.task('fonts', () => {
    return gulp.src( fontsPath )
    .pipe(gulp.dest( destPath ));
  });

}
