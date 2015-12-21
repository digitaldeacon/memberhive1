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


exports.stringToRegexp = function (string) {
  var ret = "";
  var split = string.split(" ")
  if(split.length > 1) {
    _.each(split, function(part) {
      ret += "(?=.*" + part.toLowerCase().trim() + ")";
    });
    ret = ret + ".*";
  } else {
    ret = string.toLowerCase().trim();
  }
  return ret;
}


