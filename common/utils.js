exports.whereAddAnd = function (ctx, add)
{
  if(ctx.query.where === undefined) {
    ctx.query.where = add;
  } else {
    var query = ctx.query.where
    if(ctx.query.where.and === undefined) {
      ctx.query.where.and = [query, add];
    } else {
      ctx.query.where.and.push(add);
    }
  }
  return ctx;

}
