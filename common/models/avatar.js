var quickthumb = require('quickthumb');
var async = require('async');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'gem.avatar'});

module.exports = function(Avatar) {
  var self = this;

  this.thumbSizes = {
    'xs': 50,
    's':  150,
    'm':  400,
    'l': 800
  };

  Avatar.afterRemote('upload', function(ctx, res, next) {
    var file = res.result.files.file[0];

    // convert to jpg if neccessary
    /*quickthumb.convert({
      src: `./uploads/avatar/${file.container}/${file.name}`,
      dst: `./uploads/avatar/${file.container}/original.jpg`
    }, function(err, path) {
      log.error(err);
    });*/

    var tasks = [];

    for (var size in self.thumbSizes) {
      tasks.push(function(cb) {
        quickthumb.convert({
          src: `./uploads/avatar/${file.container}/${file.name}`,
          dst: `./uploads/avatar/${file.container}/${size}.jpg`,
          width: self.thumbSizes[size]
        }, function(err, path) {
          log.error(err);
        });
      });
    }
    console.log(tasks);

    async.parallel(tasks, function(err, results) {
      // All thumbnails created, delete the original image
      console.log("ready");
    });

    next();
  });

};
