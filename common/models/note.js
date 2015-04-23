module.exports = function(Note) {
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
    var userId = Note.app.loopback.getCurrentContext().get('accessToken').userId;
    if(ctx.query.where === undefined) {
      ctx.query.where = {};
    }
    console.log(userId);
    ctx.query.where.ownerId = userId;
    next();
  });
};

