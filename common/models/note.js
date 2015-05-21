module.exports = function(Note) {
  var utils = require('../utils.js');
  var bunyan = require('bunyan');
  var log = bunyan.createLogger({name: 'gem.note'});

  Note.definition.rawProperties.created.default =
  Note.definition.properties.created.default = function() {
        return new Date();
  };

  Note.observe('before save', function(ctx, next) {
    console.log("note - before save called");
    var userId = Note.app.loopback.getCurrentContext().get('accessToken').userId;
    ctx.instance.ownerId = userId;
    next();
  });

  //return only the results, which belong to the user
  Note.observe('access', function limitToUser(ctx, next) {
    console.log("note - access");
    log.info("before", ctx.query);
    var userId = Note.app.loopback.getCurrentContext().get('accessToken').userId;
    ctx = utils.whereAddAnd(ctx, {"ownerId": userId.toString()});
    log.info("after", ctx.query.where);
    next();
  });
};

