var loopback = require('loopback');

module.exports = function(Settings) {
  //Settings.createRemotes();
  
  Settings.truncate = function(cb) {
    Settings.deleteAll({}, cb);
  };
  Settings.remoteMethod(
    'truncate',
    {}
  );
};
