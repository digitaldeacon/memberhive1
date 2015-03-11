var loopback = require('loopback');
module.exports = function(Text) {
  var userId = loopback.getCurrentContext().get('accessToken').userId;

  Text.beforeCreate = function(next, modelInstance) {
    modelInstance.ownerId = userId;
    next();
  };

  //return only the results, which belong to the user
  Text.observe('access', function limitToUser(ctx, next) {
    if(ctx.query.where === undefined) {
      ctx.query.where = {};
    }
    ctx.query.where.ownerId = userId;

    next();
  });
};

