var loopback = require('loopback');
module.exports = function(Account) {
  var Role = loopback.Role;
  var RoleMapping = loopback.RoleMapping;
  Account.roles = function(msg, cb) {
    Role.getRoles({principalType: RoleMapping.USER, principalId: msg}, function(err, roles) {
      Role.find({},function(err,allRoles) {
        var ret = [];
        for(i = 0; i < roles.length; i++) {
          if(typeof roles[i] === "number") {
            for(j = 0; j < allRoles.length; j++) {
              if(allRoles[j].id == roles[i]) ret.push(allRoles[j].name);
            }
          } else {
            ret.push(roles[i]);
          }
        }
        cb(null, ret);
      });
    });

  }

  Account.remoteMethod(
    'roles',
    {
      accepts: {arg: 'user_id', type: 'string'},
      returns: {arg: 'roles', type: 'array'}
    }
  );
};
