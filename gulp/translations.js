var gulp = require('gulp');
var gettext = require('gulp-angular-gettext');

module.exports = function(options) {
  gulp.task('pot', function() {
    return gulp.src([options.src + '/app/**/*.html', options.src + 'app/**/*.js'])
      .pipe(gettext.extract('template.pot', {
        // options to pass to angular-gettext-tools...
      }))
      .pipe(gulp.dest(options.po));
  });

  gulp.task('translations', function() {
    return gulp.src(options.po + '/**/*.po')
      .pipe(gettext.compile({
        // options to pass to angular-gettext-tools...
      }))
      .pipe(gulp.dest(options.src + '/app/translations/'));
  });
};
