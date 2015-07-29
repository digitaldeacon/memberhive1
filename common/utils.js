var _ = require('lodash');

exports.whereAddAnd = function (ctx, add)  {
  if(ctx.query.where === undefined) {
    ctx.query.where = add;
  } else {
    var query = _.cloneDeep(ctx.query.where);
    if(ctx.query.where.and === undefined) {
      ctx.query.where = {"and": [query, add]};
    } else {
      ctx.query.where.and.push(add);
    }
  }
  return ctx;
}

exports.getCollection = function(model) {
  console.log(model.getDataSource().connector)
  return model.getDataSource().connector.collection(model.modelName);
}
