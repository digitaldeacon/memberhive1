'use strict';

var gulp = require('gulp');

var ngGraph = require('gulp-angular-architecture-graph');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {
  gulp.task('angular-graph', function(){
    gulp.src(options.tmp+'/serve/app/index.js')
      .pipe(ngGraph({dest: 'architecture'}));
  });
}
