var path = require('path');
var fs = require('fs');
var easyimg = require('easyimage');

module.exports = function(Avatar) {

  var self = this;
  /**
   * Create the container (=folder named by userId) if it doesn't exist
   */
  Avatar.beforeRemote('upload', function(ctx, res, next) {
    var personId = ctx.req.params.container;
    Avatar.getContainer(personId, function(err, container){
      if (err) { // Container doesn't exist
        Avatar.createContainer({name: personId}, function(err, container) {
          Avatar.app.models.Person.findById(personId, function(err, person) {
            person.hasAvatar = true;
            Avatar.app.models.Person.upsert(person, next);
          });
        });
      } else {
       Avatar.app.models.Person.findById(personId, function(err, person) {
          person.hasAvatar = true;
          Avatar.app.models.Person.upsert(person, next);
        });
      }
    });

  });

  /**
   * Check input file and create thumbnails
   */
  Avatar.afterRemote('upload', function(ctx, res, next) {
    var inputfile = res.result.files.file[0];
    var uploadPath = Avatar.app.datasources["uploads.avatar"].settings.root;
    var folderPath = path.join(uploadPath, inputfile.container);
    var inputFilePath = path.join(folderPath, inputfile.name);
    if (inputfile.type != 'image/png' && inputfile.type != 'image/jpg' && inputfile.type != 'image/jpeg') {
      fs.unlinkSync(inputFilePath);
      next(new Error('Wrong file type. Only jpg and png are supported.'));
      return;
    }
    var croppedFilePath = path.join(folderPath, 'cropped.jpg');
    var createThumb = function (filePath, folder, size) {
      var thumbSizes = {
        'xs': 50,
        's':  150,
        'm':  400,
        'l': 800
      };
      return easyimg.resize(
        {
          src: filePath,
          dst: path.join(folder, size+'.jpg'),
          width: thumbSizes[size],
          height: thumbSizes[size]
        })
        .then(() => {
            return easyimg.resize({
              src: filePath,
              dst: path.join(folder, size+"@2x.jpg"),
              width: thumbSizes[size]*2,
              height: thumbSizes[size]*2
            });
        });
    };

    var query = ctx.args.req.query;
    easyimg.crop({
      src: inputFilePath,
      dst: croppedFilePath,
      cropwidth: query.w,
      cropheight: query.h,
      x: query.x,
      y: query.y,
      gravity: 'NorthWest'
     })
      .then(() => { return createThumb(croppedFilePath, folderPath, 'xs')})
      .then(() => { return createThumb(croppedFilePath, folderPath, 's')})
      .then(() => { return createThumb(croppedFilePath, folderPath, 'm')})
      .then(() => { return createThumb(croppedFilePath, folderPath, 'l')})
      .then(() => next(), (err) => { console.log(err); next()} );
  });
};
