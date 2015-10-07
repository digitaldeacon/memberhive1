'use strict';

var gulp = require('gulp');
var gulpDocs = require('gulp-ngdocs');
module.exports = function(options) {
  gulp.task('ngdocs', [], function () {
    return gulp.src('client/app/scripts/lb-services.js')
      .pipe(gulpDocs.process())
      .pipe(gulp.dest('./dist/docs'));
  });
};
