"use strict";
var _ = require('lodash');
var vCard = require('vcards-js');

module.exports = function(Person) {
  var utils = require('../utils.js');
  var Lomongo = require('../lomongo.js');
  //
  /** Set primaryContact to `none` by default */
  Person.definition.rawProperties.primaryContact.default = 'none';

  /** Validations */
  // i dont know how to fix this, so i commented it out
  // gender should not be required. if we have to import data, 
  // there is seldom a gender column
  //Person.validatesInclusionOf('gender', {in: [null, 'm', 'f']});
  
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

  Person.search = function(query, cb) {
    Person.find({
      where: {
        search: {like: utils.stringToRegexp(query)}
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
        arg: 'query',
        type: 'string',
        required: true
      },
      returns: {
        arg: 'data',
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

  Person.status = function(text, cb) {
    var personCollection = Person.getDataSource().connector.collection(Person.modelName);
    personCollection.distinct('status', function(err, status) {
      if (err) {
        cb(err, null);
      } else {
        if (text !== undefined) {
          status = _.filter(status, function(stat) {
            return _.includes(stat, text);
          }); //filter by query
        };
        cb(null, status);
      }
    });
  };
  Person.remoteMethod(
    'status',
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

  Person.tags = function(text, cb) {
    var personCollection = Person.getDataSource().connector.collection(Person.modelName);
    personCollection.distinct('tags', function(err, tags) {
      if (err) {
        cb(err, null);
      } else {
        if (text !== undefined) {
          tags = _.filter(tags, function(tag) {
            return _.includes(tag, text);
          }); 
        };
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
    var lomongo = new Lomongo(Person);
    Person.count({}, function(err, count) {
      var skip = parseInt(Math.random() * count);
      lomongo.collection.find().limit(1).skip(skip).toArray(function(err, data) {
        lomongo.callback(cb, err, data[0]);
      });
    });

  };
  Person.remoteMethod(
    'random',
    {
      returns: {
        type: 'Person', 
        root: true
      }
    }
  );
  
  Person.exportVCard = function(cb) {
    Person.find({}, function(err, persons) {
      var ret = "";
      _.each(persons, function(person) {     
        ret += Person.toVCard(person).getFormattedString();
      });
      cb(err, ret);
    });
  }
  
  Person.remoteMethod(
    'exportVCard',
    {
      returns: {  
        arg: 'vcard',
        type: 'string'
      },
      http: {path: '/exportVCard', verb: 'get'}
    }
  );

  
  Person.toVCard = function(person) {
    var v = vCard();
    
    v.firstName = person.firstName;
    
    if(person.middleName)
      v.middleName = person.middleName;
    v.lastName = person.lastName;
    
    if(person.nickName)
      v.nickname = person.nickName;
    if(person.prefix)
      v.namePrefix = person.prefix;
    if(person.suffix)
      v.nameSuffix = person.suffix;
    
    if(person.contact) {
      if(person.contact.work)
        v.workPhone = person.contact.work;
      if(person.contact.mobile)
        v.cellPhone = person.contact.mobile;
      if(person.contact.home)
        v.homePhone = person.contact.home;
    }
    
    v.gender = person.gender;
    
    if(person.anniversary)
      v.anniversary = new Date(person.anniversary);
    
    if(person.birthdate)
      v.birthday = new Date(person.birthdate);
    
    if(person.address) {
      if(person.address.home) {  
        v.homeAddress.label = 'Home';
        v.homeAddress.street = person.address.home.street1;
        v.homeAddress.city = person.address.home.city;
        v.homeAddress.stateProvince = person.address.home.state;
        v.homeAddress.postalCode = person.address.home.zipcode;
        v.homeAddress.countryRegion = person.address.home.county;
      }
      if(person.address.work) {  
        v.workAddress.label = 'Work';
        v.workAddress.street = person.address.work.street1;
        v.workAddress.city = person.address.work.city;
        v.workAddress.stateProvince = person.address.work.state;
        v.workAddress.postalCode = person.address.work.zipcode;
        v.workAddress.countryRegion = person.address.work.county;
      }
    }
    return v;
  }
  
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

  /**
   * Fill search field
   */
  Person.observe('before save', function(ctx, next) {
    if (ctx.instance) {
      ctx.instance.search = Person.createIndex(ctx.instance);
    }
    next();
  });
  
  Person.createIndex = function(data) {
    var ret;
    var properties = [
        data.firstName,
        data.middleName,
        data.lastName,
        data.nickName,
        data.email
      ];
      ret = "";
      properties.forEach(function(property) {
        if (property) {
          ret += property.toLowerCase() + ' ';
        }
      });
    return ret;
  }
};
