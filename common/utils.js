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
exports.objectKeysArray = function (objects) {
  return _(objects).map(exports.objectKeys).flatten().unique().value();
}
exports.objectKeys = function (object) {
  if(!_.isObject(object)) return []; 
  
  var keys = Object.keys(object);
 
  var more = [];
  _.each(keys, (key) => {
      var newKeys = _.map(exports.objectKeys(object[key]), (k) => key + "." + key);
      more.concat(newKeys);
  });
  //console.log(keys, "of", object, "more = ", more);
  console.log("return", _.unique(keys.concat(more)));
  return _.unique(keys.concat(more));
}


