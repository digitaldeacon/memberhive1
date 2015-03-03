module.exports = function(app) {
    var Person = app.models.Person;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    
    Person.create(
        [{
            username: 'root', 
            email: 'root@gemmii.io', 
            password:'bibel',
            firstName: "Root",
            lastName: "Root",
            enabled: true
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
