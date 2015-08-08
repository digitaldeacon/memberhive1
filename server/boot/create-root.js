module.exports = function(app) {
    var Account = app.models.Account;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    Account.findOne({where: {username: "root"}}, function (err,data) {
      if (data == null) {//create root only if there is no root
        Account.create(
            [{
                username: 'root',
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
