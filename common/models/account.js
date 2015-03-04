var loopback = require('loopback');
module.exports = function(Account) {
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  Account.roles = function(msg, cb) {
    Role.getRoles({principalType: RoleMapping.USER, principalId: msg}, function(err, roles) {
      cb(null, roles);
    });
    
  }
     
  Account.remoteMethod(
    'roles', 
    {
      accepts: {arg: 'user_id', type: 'int'},
      returns: {arg: 'roles', type: 'array'}
    }
  );
};
