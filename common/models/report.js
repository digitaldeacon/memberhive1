var loopback = require('loopback');
module.exports = function(Report) {
  
  Report.beforeCreate = function(next, modelInstance) {
    modelInstance.ownerId = loopback.getCurrentContext().get('accessToken').userId;
    next();
  };
  
  //return only the results, which belong to the user
  Report.observe('access', function limitToUser(ctx, next) {
    if(ctx.query.where === undefined)
      ctx.query.where = {};
    ctx.query.where.ownerId = loopback.getCurrentContext().get('accessToken').userId;
    
    next();
  });
};

