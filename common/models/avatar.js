var path = require('path');
var fs = require('fs');
var lwip = require('lwip');
var async = require('async');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'gem.avatar'});

module.exports = function(Avatar) {
  var self = this;

  this.uploadPath = './uploads/avatar/';
  this.thumbSizes = {
    'xs': 50,
    's':  150,
    'm':  400,
    'l': 800
  };

  /**
   * Create the container if it doesn't exist
   */
  Avatar.beforeRemote('upload', function(ctx, res, next) {
    var personId = ctx.req.params.container;
    Avatar.getContainer(personId, function(err, container){
      if (err && err.code == 'ENOENT') { // Container doesn't exist
        Avatar.createContainer({name: personId}, function(err, container) {});
      }
    });
    next();
  });

  /**
   * Check input file and create thumbnails
   */
  Avatar.afterRemote('upload', function(ctx, res, next) {
    var inputfile = res.result.files.file[0];

    var folder = path.join(self.uploadPath, inputfile.container);
    var src = path.join(folder, inputfile.name);

    if (inputfile.type != 'image/png' && inputfile.type != 'image/jpg' && inputfile.type != 'image/jpeg') {
      fs.unlinkSync(src);
      next(new Error('Wrong file type. Only jpg and png are supported.'));
      return;
    }

    Object.keys(self.thumbSizes).forEach(function(size) {
      lwip.open(src, function(err, image) {
        if (err) {
          log.error(err);
          next(new Error('Could not read image file.'));
          return;
        }
        image.batch()
          .resize(self.thumbSizes[size])
          .writeFile(path.join(folder, `${size}.jpg`), function(err){
            if (err) {
              log.error(err);
              next(new Error('Could not create image thumbnails.'));
            }
          });
      });
    });

    next();
  });

};
