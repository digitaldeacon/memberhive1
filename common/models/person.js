module.exports = function(Person) {

  Person.search = function(value, cb) {
    Person.find({
      where: {
        or: [
          {firstName: {like: `%${value}%`}},
          {middleName: {like: `%${value}%`}},
          {lastName: {like: `%${value}%`}},
          {nickName: {like: `%${value}%`}},
          {prefix: {like: `%${value}%`}},
          {suffix: {like: `%${value}%`}}
        ]
      },
      limit: 10
    }, function(err, persons) {
      cb(null, persons);
    });
  };

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
    'search',
    {
      accepts: {
        arg: 'value',
        type: 'string',
        required: true
      },
      returns: {
        arg: 'results',
        type: 'array'
      }
    }
  );

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
