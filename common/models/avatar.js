var path = require('path');
var fs = require('fs');
var easyimg = require('easyimage');

module.exports = function(Avatar) {
  this.thumbSizes = {
    'xs': 50,
    's':  150,
    'm':  400,
    'l': 800
  };
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
    var filePath = path.join(folderPath, inputfile.name);
    if (inputfile.type != 'image/png' && inputfile.type != 'image/jpg' && inputfile.type != 'image/jpeg') {
      fs.unlinkSync(filePath);
      next(new Error('Wrong file type. Only jpg and png are supported.'));
      return;
    }
 
     this.createThumb(filePath, folderPath, 'xs')
      .then(this.createThumb(filePath, folderPath, 's'))
      .then(this.createThumb(filePath, folderPath, 'm'))
      .then(this.createThumb(filePath, folderPath, 'l'))
      .then(() => next());
  });

  this.createThumb = (filePath, folder, size) => {
    return easyimg.resize(
      {
        src: filePath,
        dst: path.join(folder, size+'.jpg'),
        width: self.thumbSizes[size],
        height: self.thumbSizes[size]
      })
      .then(() => {
          return easyimg.resize({
            src: filePath,
            dst: path.join(folder, size+"@2x.jpg"),
            width: self.thumbSizes[size]*2,
            height: self.thumbSizes[size]*2});
      });
  };
  
};
