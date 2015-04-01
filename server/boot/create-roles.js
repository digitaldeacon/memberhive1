module.exports = function(app) {
  var bunyan = require('bunyan');
  var log = bunyan.createLogger({name: 'server.boot.create-roles'});

  var Role = app.models.Role;
  Role.findOne({where : {name: "pastor"}}, function (err, data) { //insert roles only if there no before
    if(data == null) {
      Role.create({name: 'pastor'});
      Role.create({name: 'deacon'});
      Role.create({name: 'leader'});
      Role.create({name: 'intern'});
      Role.create({name: 'member'});
      Role.create({name: 'technican'});
      Role.create({name: 'musician'});
      Role.create({name: 'preacher'});
      Role.create({name: 'visitor'});
      Role.create({name: 'guests'});
      Role.create({name: 'group_lead'});
    }
  });
};
