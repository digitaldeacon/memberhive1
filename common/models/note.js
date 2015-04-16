var loopback = require('loopback');
module.exports = function(Note) {
  Note.definition.rawProperties.created.default =
  Note.definition.properties.created.default = function() {
        return new Date();
  };

  Note.beforeCreate = function(next, modelInstance) {
    var userId = loopback.getCurrentContext().get('accessToken').userId;
    modelInstance.ownerId = userId;
    next();
  };

  //return only the results, which belong to the user
  Note.observe('access', function limitToUser(ctx, next) {
    var userId = loopback.getCurrentContext().get('accessToken').userId;
    if(ctx.query.where === undefined) {
      ctx.query.where = {};
    }
    ctx.query.where.ownerId = userId;

    next();
  });
};

