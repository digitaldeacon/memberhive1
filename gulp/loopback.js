'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var loopbackAngular = require('gulp-loopback-sdk-angular');
module.exports = function(options) {

  gulp.task('loopback', function () {
      return gulp.src('./server/server.js')
      .pipe(loopbackAngular({apiUrl:'http://127.0.0.1:8000/api'}))
      .pipe(rename('lb-services.js'))
      .pipe(gulp.dest(options.src+'./modules/core/services/'));
  });
}
