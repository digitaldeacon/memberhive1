var path = require('path');
var fs = require('fs');
var bunyan = require('bunyan');
var lwip = require('lwip');
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
   * Create the container (=folder named by userId) if it doesn't exist
   */
  Avatar.beforeRemote('upload', function(ctx, res, next) {
    console.log("avatar before remote upload");
    var personId = ctx.req.params.container;
    Avatar.getContainer(personId, function(err, container){
      if (err && err.code == 'ENOENT') { // Container doesn't exist
        Avatar.createContainer({name: personId}, function(err, container) { next();});
        console.log("container created");
      } else {
        next();
      }
    });
   
  });

  /**
   * Check input file and create thumbnails
   */
  Avatar.afterRemote('upload', function(ctx, res, next) {
    console.log("avatar after remote");
    var inputfile = res.result.files.file[0];
    var folderPath = path.join(self.uploadPath, inputfile.container);
    var filePath = path.join(folderPath, inputfile.name);
    if (inputfile.type != 'image/png' && inputfile.type != 'image/jpg' && inputfile.type != 'image/jpeg') {
      fs.unlinkSync(filePath);
      next(new Error('Wrong file type. Only jpg and png are supported.'));
      return;
    }
    //hacky callbacks
    // FIXME: use a async library or q
    this.createThumb(filePath, folderPath, 'xs',
      this.createThumb(filePath, folderPath, 's',
        this.createThumb(filePath, folderPath, 'm',
          this.createThumb(filePath, folderPath, 'l', function(err) { next();})
        )
      )
    )();
  });
  
  this.createThumb = function (filePath, folder, size, cb) {
    return function(err) {
      lwip.open(filePath, function(err, image) {
        image.batch()
          .resize(self.thumbSizes[size])
          .writeFile(path.join(folder, size+".jpg"), cb);
      });
    };
  };
    

};
