'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

module.exports = function(options) {
  gulp.task('watch', ['scripts:watch', 'inject', 'inject'], function () {

    gulp.watch([options.src + '/*.html', 'bower.json'], ['inject']);
        gulp.watch(['common/**/*'], ['loopback']);

    gulp.watch([
      options.src + '/app/styles/**/*.css',
      options.src + '/app/styles/**/*.scss'
    ], function(event) {
      if(isOnlyChange(event)) {
        gulp.start('styles');
        gulp.start('styles-standalone');
      } else {
        gulp.start('inject');
      }
    });


    
  });
};
