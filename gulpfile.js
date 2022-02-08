// Basis
// https://github.com/philhawksworth/hawksworx.com/blob/master/gulpfile.js

const gulp    = require("gulp");
const sass    = require("gulp-sass")(require("sass"));

/* ==== generate the css with sass */
gulp.task('css', function() {
  return gulp.src('scss/main.scss')
    .pipe(sass({
      outputStyle: 'expanded'
     // outputStyle: 'compressed'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest('_site/css'));
});

/* === Watch folders for changes */
gulp.task("watch", function() {
  gulp.watch('./scss/**/*.scss', gulp.parallel('css'));
});

/* === Let's build this sucker. */
gulp.task('build', gulp.parallel(
  'css'
));
