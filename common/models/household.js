var _ = require('lodash');

module.exports = function(Household) {

  Household.validate('type', typeValidator);
  function typeValidator(err) {
    var validOptions = ['family', 'sharedFlat', 'other'];

    if (!this.type)
      return;

    if (!_.includes(validOptions, this.type))
      err();
  }

  Household.trash = function(householdId, cb) {

    // Need to reset the default scope because of https://github.com/strongloop/loopback/issues/1018
    var defaultScope = Household.defaultScope;
    Household.defaultScope = function(){};

    Household.upsert({id:householdId, 'deleted': true}, function(err, obj){
      cb(null, '');
    });

    // Restore the default scope
    Household.defaultScope = defaultScope;
  };
  Household.remoteMethod(
    'trash',
    {
      accepts: {
        arg: 'id',
        type: 'string',
        required: true
      }
    }
  );

};
