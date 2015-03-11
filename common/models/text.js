var loopback = require('loopback');
module.exports = function(Text) {

  Text.beforeCreate = function(next, modelInstance) {
    var userId = loopback.getCurrentContext().get('accessToken').userId;
    modelInstance.ownerId = userId;
    next();
  };

  //return only the results, which belong to the user
  Text.observe('access', function limitToUser(ctx, next) {
    var userId = loopback.getCurrentContext().get('accessToken').userId;
    if(ctx.query.where === undefined) {
      ctx.query.where = {};
    }
    ctx.query.where.ownerId = userId;

    next();
  });
};

