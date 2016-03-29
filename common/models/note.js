module.exports = function(Note) {
  var utils = require('../utils.js');
  Note.definition.rawProperties.created.default =
  Note.definition.properties.created.default = function() {
    return new Date();
  };

  Note.observe('before save', function(ctx, next) {
    var userId = Note.app.loopback.getCurrentContext().get('accessToken').userId;
    ctx.instance.ownerId = userId;
    next();
  });

  //return only the results, which belong to the user
  Note.observe('access', function limitToUser(ctx, next) {
    var userId = Note.app.loopback.getCurrentContext().get('accessToken').userId;
    //ctx = utils.whereAddAnd(ctx, {"ownerId": userId.toString()});
    next();
  });
  
  Note.createRemotes();

};

