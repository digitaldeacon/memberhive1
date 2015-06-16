var _ = require('lodash');

module.exports = function(Person) {

  /** Set primaryContact to `none` by default */
  Person.definition.rawProperties.primaryContact.default = 'none';

  /** Validations */
  Person.validatesInclusionOf('gender', {in: ['m', 'f']});
  Person.validate('primaryContact', primaryContactValidator);
  function primaryContactValidator(err) {
    var validOptions = ['none', 'email', 'mobile', 'letterHome', 'letterWork', 'letterPostal'];

    if (!_.includes(validOptions, this.primaryContact))
      err();

    if (this.primaryContact == 'none')
      return;
    else if (this.primaryContact == 'email' && !this.email)
      err();

    else if (this.primaryContact == 'mobile' && !this.contact.mobile)
      err();

    else if (this.primaryContact == 'letterHome' && !this.address.home)
      err();

    else if (this.primaryContact == 'letterWork' && !this.address.work)
      err();

    else if (this.primaryContact == 'letterPostal' && !this.address.postal)
      err();
  }

  Person.search = function(value, cb) {
    var parts = value.split(" ");
    var options = [];
    var fields = [
      'firstName',
      'lastName',
      'middleName',
      'nickName',
      'prefix',
      'suffix'
    ];
    fields.forEach(function(field) {
      parts.forEach(function(part) {
        var obj = {};
        obj[field] = {like: `${part}`};
        options.push(obj);
      });
    });

    Person.find({
      where: {
        or: options
      },
      limit: 10
    }, function(err, persons) {
      cb(null, persons);
    });
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

  Person.trash = function(personId, cb) {

    // Need to reset the default scope because of https://github.com/strongloop/loopback/issues/1018
    var defaultScope = Person.defaultScope;
    Person.defaultScope = function() {};

    Person.upsert({id: personId, 'deleted': true}, function(err, obj) {
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
        type: 'string',
        required: true
      }
    }
  );

  Person.setHousehold = function(personId, householdId, cb) {
    Person.findById(personId, function(err, personInstance) {
      personInstance.householdId = householdId;
      personInstance.save(function(err, obj) {
        cb(err, obj);
      });
    });
  };
  Person.remoteMethod(
    'setHousehold',
    {
      accepts: [
        {
          arg: 'id',
          type: 'string',
          required: true
        },
        {
          arg: 'householdId',
          type: 'string',
          required: true
        }
        ],
      http: {path: '/:id/household', verb: 'post'},
      description: 'Set the household for this person'
    }
  );


  Person.tags = function(text, cb) {
    var personCollection = Person.getDataSource().connector.collection(Person.modelName);
    personCollection.distinct('tags', function(err, tags) {
      if (err) {
        cb(err, null);
      } else {
        if (text !== undefined) {
          tags = _.filter(tags, function(tag) {
            return _.includes(tag.text, text);
          }); //filter by query
        }
        tags = _.map(tags, function(data) {
          return data.text
        }); //simplify return
        cb(null, tags);
      }
    });
  };
  Person.remoteMethod(
    'tags',
    {
      accepts: {
        arg: 'text',
        type: 'string'
      },
      returns: {
        arg: 'data',
        type: 'array'
      }
    }
  );

  /**
   * Return a random person
   */
  Person.random = function(cb) {
    Person.count({}, function(err, count) {
      var number = parseInt(Math.random() * count);
      Person.find({}, function(err, persons) {
        cb(err, persons[number]);
       });
    });

  };
  Person.remoteMethod(
    'random',
    {
      returns: {
        arg: 'person',
        type: 'Person'
      }
    }
  );

  Person.truncate = function(cb) {
    Person.deleteAll({}, cb);
  };
  Person.remoteMethod(
    'truncate',
    {}
  );

  /**
   * Set the Account's email property to the same value as the Person's email.
   * We have this redundancy since Account has it's own email field (inheritet from the Loopback model), but
   * there might be Persons without an Account, but they still need the email field
   *
   * So we need to make sure the email field is always the same in both places.
   */
  Person.observe('after save', function(ctx, next) {
    if (!ctx.instance) { // Single model has been updated
      next();
      return;
    }
    Person.app.models.Account.findById(ctx.instance.id, function(err, account) {
      if (account === null) { // Person has no account - that's ok
        next();
        return;
      }
      account.email = ctx.instance.email;
      account.save(function(err, result) {
        next();
      });
    })
  });
};
