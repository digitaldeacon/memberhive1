"use strict";
var _ = require('lodash');
var vCard = require('vcards-js');
var json2csv = require('json2csv');
var fs = require('fs');
var Toner = require("toner");
var moment = require("moment");
module.exports = function(Person) {
  var utils = require('../utils.js');
  var Lomongo = require('../lomongo.js');
  var Pdf = require('../pdf.js');
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
        if(data.length > 0) { //do only when we have persons
          lomongo.callback(cb, err, data[0]);
        } else {
          cb(null);
        }
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

  Person.exportVCard = function(groups, tags, status, cb) {
    Person.find(Person.buildWhereFiler(groups, tags, status), function(err, persons) {
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
      accepts: [
        {
          arg: 'groups',
          type: 'array'
        },
        {
          arg: 'tags',
          type: 'array'
        },
        {
          arg: 'status',
          type: 'array'
        }
      ],
      returns: {
        arg: 'vcard',
        type: 'string'
      },
      http: {path: '/exportVCard', verb: 'get'}
    }
  );

  Person.exportCSV = function(cb) {
    var fields = ["firstName", "lastName", "middleName",
    "nickName", "prefix", "suffix",
    "tags","status",
    "gender",
    "dates.birthday","dates.baptism", "dates.anniversary",
    "contacts.home", "contacts.work","contacts.mobile",
    "emails.personal",
    "custom.kinder","custom.dienste",
    "address.home.street1",
    "address.home.street2",
    "address.home.city",
    "address.home.state",
    "address.home.zipcode",
    "address.home.country"
    ];
    Person.find({}, function(err, persons) {
      json2csv({ data: persons, fields: fields, nested: true }, function(err, csv) {
        cb(err, csv);
      });
    });
  }

  Person.remoteMethod(
    'exportCSV',
    {
       
      returns: {
        arg: 'csv',
        type: 'string'
      },
      http: {path: '/exportCSV', verb: 'get'}
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
    if(person.dates) {
      if(person.dates.anniversary)
        v.anniversary = new Date(person.dates.anniversary);

      if(person.dates.birthday)
        v.birthday = new Date(person.dates.birthdate);
    }
    
    if(person.address) {
      if(person.address.home) {
        v.homeAddress.label = 'Home';
        v.homeAddress.street = person.address.home.street1;
        v.homeAddress.city = person.address.home.city;
        v.homeAddress.stateProvince = person.address.home.state;
        v.homeAddress.postalCode = person.address.home.zipcode;
        v.homeAddress.countryRegion = person.address.home.country;
      }
      if(person.address.work) {
        v.workAddress.label = 'Work';
        v.workAddress.street = person.address.work.street1;
        v.workAddress.city = person.address.work.city;
        v.workAddress.stateProvince = person.address.work.state;
        v.workAddress.postalCode = person.address.work.zipcode;
        v.workAddress.countryRegion = person.address.work.country;
      }
    }
    var path = Person.app.datasources["uploads.avatar"].settings.root + '/'+ person.id+'/m.jpg';
    if(fs.existsSync(path)) {
      v.photo.embedFromFile(path);
    }

    return v;
  }
  
  
  Person.remoteMethod(
    'exportPDF',
    {
      accepts: [
        {
          arg: 'css',
          type: 'string'
        },
        {
          arg: 'apiBase',
          type: 'string'
        },
        {
          arg: 'groups',
          type: 'array'
        },
        {
          arg: 'tags',
          type: 'array'
        },
        {
          arg: 'status',
          type: 'array'
        },
        {arg: 'res', type: 'object', 'http': {source: 'res'}}
      ],
      http: {
        verb: 'get'
      }
    }
  );
  Person.exportPDF = function(css, apiBase, groups, tags, status, res, cb) {
    //TODO: loading every css file possible is not a good idea. Check if this is security relevant.
    var filter = Person.buildWhereFiler(groups, tags, status);
    filter.include = ['groups'];
    Person.find({},(err, allPersons) => {
      
    Person.find(
      filter,
      (err, persons) => {
        var pdf = new Pdf(Person, apiBase);
        fs.readFile('common/templates/person.export.pdf.html', 'utf8', function (err, template) {
          if(err) {
            console.error(err)
          } else {
            pdf.render(
              template,
              {
                personGroups: Person.groupByHousehold(allPersons, persons),
                ministries: Person.getMinistries(persons),
                css: decodeURIComponent(css),
                base: decodeURIComponent(apiBase)},
              {
                pageSize: 'A5',
                marginLeft: '1',
                marginRight: '1',
                marginTop: '0.5',
                marginBottom: '0.85'
              }
              , res, cb);
          }
        });
      });
    });

  }
  Person.buildWhereFiler = (groups, tags, status) => {
    var ret = {where: {}};
    if(groups.length > 0) {
      ret.where.groupIds = {inq: groups};
    }
    if(tags.length > 0) {
      ret.where.tags = {inq: tags};
    }
    if(status.length > 0) {
      ret.where.status = {inq: status};
    }
    return ret;
  }
  Person.groupByHousehold = (allPersons, persons) => {
    allPersons = _.map(allPersons, p => p.toJSON());
    persons = _.map(persons, p => p.toJSON());
    
    var withHousehold = _.filter(persons, p => p.householdIds.length > 0);
    var withoutHousehold = _.filter(persons, p => p.householdIds.length == 0);

    var groups = _.map(withoutHousehold, p => [p]);
    groups = groups.concat(_.values(_.groupBy(withHousehold, (p) => p.householdIds[0])));

    groups = _.map(groups, persons => {
      persons = _.sortBy(persons, p => {
        if(p.dates && p.dates.birthday)
          return p.dates.birthday;
        return "";
      });
      
      if(persons.length > 1) {
        if(persons[0].gender == 'f' && persons[1].gender == 'm') { // show man always first
          var tmp = persons[1];
          persons[1] = persons[0];
          persons[0] = tmp;
        }
      }
      if(persons[0].householdIds.length > 0) {//add children
        var otherMembers = _.filter(allPersons, p => { 
          if(!p.householdIds[0]) return false;
          return  p.householdIds[0].toString() === persons[0].householdIds[0].toString()
        });
        var children = _.filter(otherMembers, p => _.contains(p.status, 'Kind'));

      
        var childrenText = _.map(children, (c) =>  {
          var ret = c.firstName;
          if(c.dates && c.dates.birthday) {
            ret += " ("+moment().diff(c.dates.birthday, 'years')+")";
          }
          return ret;
        }).join(", ");
        
        persons = _.map(persons, p => {
          if(_.contains(p.status, 'Eltern')) {
            p.genChildren = childrenText;
          }
          return p;
        });
      }
      //add groups
      persons = _.map(persons, p => {
        p.genGroups = _.map(_.filter(p.groups, (g) => g.isMinistry)
                           , (c) => c.name).join(", ");
        return p;
      });
      
      return persons;
    })
    
    groups = _.sortBy(groups, p => {
      var ret = p[0].lastName;
      if(p[0].dates && p[0].dates.birthday)
        ret += " " + p[0].dates.birthday;
      return ret;
    });
        
    return groups;

  }
  
  Person.getMinistries = (persons) => {
    var groups = {};
    persons = _.map(persons, p => p.toJSON());
    persons.forEach((person) => {
      person.groups.forEach((group) => {
        if(!groups[group.id]) {
          groups[group.id] = {name: group.name, persons: []};
        }
        groups[group.id].persons.push(person);
      });
    });
    groups = _.sortBy(groups, (g) => g.name);
    return groups;
  }

  

  Person.truncate = function(cb) {
    Person.deleteAll({}, cb);
  };
  Person.remoteMethod(
    'truncate',
    {}
  );


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
