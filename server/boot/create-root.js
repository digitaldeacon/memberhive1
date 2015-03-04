module.exports = function(app) {
    var Account = app.models.Account;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    
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
}; 
