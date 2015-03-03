module.exports = function(app) {
    var User = app.models.User;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    var Team = app.models.Team;
    
    User.create(
        [{username: 'root', email: 'root@gemmii.io', password:'bibel'}], 
        function(err, users) {
        if (err) return debug('%j', err);
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
