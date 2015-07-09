'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var loopbackAngular = require('gulp-loopback-sdk-angular');
module.exports = function(options) {

  gulp.task('loopback-services', function () {
      return gulp.src('./server/server.js')
      .pipe(loopbackAngular({apiUrl:'https://127.0.0.1:3994/api'}))
      .pipe(rename('lb-services.js'))
      .pipe(gulp.dest(options.src+'/app/modules/core/services/'));
  });

  gulp.task('loopback', ['loopback-services'], function () {
    gulp.start('grunt-loopback_angular_addModelData');
  });
}
