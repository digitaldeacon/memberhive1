module.exports = function(app) {
    var Role = app.models.Role;
    
    Role.create({name: 'pastor'}); 
    Role.create({name: 'deacon'}); 
    Role.create({name: 'member'}); 
    Role.create({name: 'guest'}); 
    Role.create({name: 'admin'}); 
}; 
