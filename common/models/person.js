module.exports = function(Person) {
  Person.trash = function(personId, cb) {

    // Need to reset the default scope because of https://github.com/strongloop/loopback/issues/1018
    var defaultScope = Person.defaultScope;
    Person.defaultScope = function(){};

    Person.upsert({id:personId, 'deleted': true}, function(err, obj){
      cb(null, '');
    });

    // Restore the default scope
    Person.defaultScope = defaultScope;
  };

  Person.remoteMethod(
    'trash',
    {
      accepts: {
        arg: 'id',
        type: 'int',
        required: true
      }
    }
  );
};
