module.exports = function(app) {
    var Role = app.models.Role;
    
    Role.create({name: 'person_edit'}); 
}; 
