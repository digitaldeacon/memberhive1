module.exports = function(app) {
    var Account = app.models.Account;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    var root_user_name = process.env.MH_ROOT_USERNAME || 'root';
    Account.findOne({where: {username: root_user_name}}, function (err,data) {
      if (data == null) {//create root only if there is no root
        Account.create(
            [{
                username: root_user_name,
                email:  process.env.MH_ROOT_EMAIL || 'root@memberhive.com',
                password:  process.env.MH_ROOT_PASSWORD || 'bibel'
            }],
            function(err, users) {
            // Create the admin role
            Role.create(
                {name: 'root'},
                function(err, role) {
                  if (role) {
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: users[0].id
                    });
                  }
            });
        });
      }
    });

};
