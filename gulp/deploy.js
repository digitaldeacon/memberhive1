'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');
var $ = require('gulp-load-plugins')();
var _ = require('lodash');
module.exports = function(options) {
  var config = require('../servers.json');
  gulp.task('deploy', function() {
    var cmds = [];
    _.forEach(config.hosts, function (server, name) {
      var git = "git push " + server + "data/git " + config.defaultBranch;
      cmds.push(git);
    });
    console.log(cmds);
    //shell.task(cmds);
  });
};
