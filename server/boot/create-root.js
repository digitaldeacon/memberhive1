module.exports = function(app) {
    var Account = app.models.Account;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    console.log("boot account");
    Account.findOne({where: {username: "root"}}, function (err,data) {
      console.log("find account");
      console.log(data)
      if(data == null) {//create root only if there is no root
        console.log("no root");
        Account.create(
            [{
                username: 'root',
                email: 'root@gemmii.io',
                password:'bibel',
            }],
            function(err, users) {
            // Create the admin role
            Role.create(
                {name: 'root'},
                function(err, role) {
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: users[0].id
                    });
            });
        });
      }
    });

};
