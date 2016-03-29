module.exports = function(app) {
  var Role = app.models.Role;
  Role.findOne({where: {name: "user_edit"}}, function(err, data) { //insert roles only if there no before
    if (data == null) {
      Role.create({name: 'user_view'});
      Role.create({name: 'account_edit'});
      Role.create({name: 'event_edit'});
      Role.create({name: 'event_view'});
      Role.create({name: 'report_edit'});
      Role.create({name: 'report_view'});
    }
  });
};
