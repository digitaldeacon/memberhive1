export function PersonService(
  Person, 
  Household, 
  Avatar, 
  LoopBackAuth, 
  gettextCatalog,
  gettext,
  Upload, 
  mhConfig,
  AvatarSizes,
  $rootScope
) {"ngInject";
                                
  this.persons = null;
  this.personsSimple = null;
  
  this.avatar = (person, size) => {
    if (person.hasAvatar) {
      person["avatarUrl_"+size] = mhConfig.apiUrl+"/Avatars/"+person.id+"/download/"+size+".jpg";
    } else {
      person["avatarUrl_"+size] = "/app/images/avatar/"+size+".jpg";
    }
    return person;
  };
  
  this.mapPerson = (person) => {
      person.fullName = person.firstName + " " + person.lastName;
      
      person.status = person.status || [];
      person.tags = person.tags || [];
      _.forEach(AvatarSizes, (size) => {
        person = this.avatar(person, size);
      });
      
      //make date accesible by angular
      _.forEach(person.dates, (value, key) => {
        person.dates[key] = new Date(value);
      });
     
      if(person.address) {
        person.addressList = [];
        _.forEach(person.address, (value,index) => {
          var short = value.street1 + " " + value.zip + " " + value.city;
          person.addressList.push({value: short, name: index});
        });
      }
      
      return person;
  };
  
  this.undoMap = (person) => {
    delete person.fullName;
    _.forEach(AvatarSizes, (size) => {
        delete person["avatarUrl_"+size];
    });
    delete this.addressList;
  };
  
  this.mapPersons = (persons) => {
    return _.map(persons, this.mapPerson);
  };
  
  
  this.getAll = () => {
     return Person.find({
        filter: {
          order: ['lastName ASC', 'firstName ASC', 'middleName ASC'],
        }
      }).$promise.then(this.mapPersons);
  };
  
  this.getAllSimple = () => {
     return Person.find({
        filter: {
          order: ['lastName ASC', 'firstName ASC', 'middleName ASC'],
        }
      }).$promise.then(this.mapPersons);
  };
  
  return {
    mapPerson: this.mapPerson, 
    
    modelName: () => {
      return Person.model.name;
    },

    currentUser: () => {
      return Person.findById({id: LoopBackAuth.currentUserId})
        .$promise.then(this.mapPerson);
    },

    one: (id) => {
      return Person.findById({
        id: id,
        filter: {
          include: [
            'account',
            {
              'household': [
                {'persons': 'relationType'}
                // 'address'
              ]
            },
            'ministries','relationType','notes'
          ]
        }
      }).$promise.then(this.mapPerson);
    },

    all: (pageNumber) => {
      
      return Person.find({
        filter: {
          limit: $rootScope.gemConfig.pagination.pageSize,
          offset: (pageNumber - 1) * $rootScope.gemConfig.pagination.pageSize,
          order: ['lastName ASC', 'firstName ASC', 'middleName ASC'],
          include: [
            'account',
            {
              'household': {'persons': 'relationType'}
            },
            'ministries',
            'relationType'
          ]
        }
      }).$promise.then(this.mapPersonsData);
    },
    
    cachedAll: () => {
      if(this.persons) return this.persons;
      return this.getAll().then((d) => this.persons = d);
    },
    
    getAll: () => {
      return this.getAll().then((d) => this.persons = d);
    },
    
    cachedAllSimple: () => {
      if(this.personsSimple) return this.personsSimple;
      return this.getAllSimple().then((d) => this.personsSimple = d);
    },
    
    getAllSimple: () => {
      return this.getAllSimple().then((d) => this.personsSimple = d);
    },

    getHousehold: (id) => {
      return Household.findById({
        id: id,
        filter: {
          include: [
            'persons'
          ]
        }
      });
    },

    /**
     * Return a list of available Households
     */
    getHouseholds: (pageNumber) => {
      if (!pageNumber)
        return Household.find();

      return Household.find({
        filter: {
          limit: $rootScope.gemConfig.pagination.pageSize,
          offset: (pageNumber - 1) * $rootScope.gemConfig.pagination.pageSize,
          order: ['name ASC'],
          include: ['persons']
        }
      });
    },
    
    
    search: (query) => {
      return Person.search({query: query})
        .$promise
        .then((d) => {return d.data;})
        .then(this.mapPersons);
    },
    
    
    searchTags: (query) => {
      return Person.tags({"text": query}).$promise.then((resp)=>{
        return resp.data;
      });
    },

    searchStatus: (query) => {
      return Person.status({"text": query}).$promise.then((resp)=>{
        return resp.data;
      });
    },
    
    /**
     * A dictionary with gender translations
     */
    genders: {
      'm': gettextCatalog.getString('Male'),
      'f': gettextCatalog.getString('Female')
    },

    /**
     * A dictionary with translations of standard status items.
     */
    statusTypes: [
      {'key': 'member', 'selected': true, 'text': gettextCatalog.getString('Member')},
      {'key': 'member_prospect', 'selected': false, 'text': gettextCatalog.getString('Member Prospect')},
      {'key': 'member_former', 'selected': false, 'text': gettextCatalog.getString('Former Member')},
      {'key': 'member_passed', 'selected': false, 'text': gettextCatalog.getString('Passed Member')},
      {'key': 'member_restore', 'selected': false, 'text': gettextCatalog.getString('Church Discipline')},
      {'key': 'visitor', 'selected': false, 'text': gettextCatalog.getString('Visitor')},
      {'key': 'visitor_regular', 'selected': false, 'text': gettextCatalog.getString('Regular Visitor')},
      {'key': 'visitor_irregular', 'selected': false, 'text': gettextCatalog.getString('Irregular Visitor')},
      {'key': 'visitor_first', 'selected': false, 'text': gettextCatalog.getString('First-Time Visitor')},
      {'key': 'missionary', 'selected': false, 'text': gettextCatalog.getString('Missionary')}
    ],
    /**
     * A dictionary with translations of the relationTypes table.
     */
    relationTypes: {
      'husband': gettextCatalog.getString('Husband'),
      'wife': gettextCatalog.getString('Wife'),
      'son': gettextCatalog.getString('Son'),
      'daughter': gettextCatalog.getString('Daughter'),
      'cousin': gettextCatalog.getString('Cousin'),
      'uncle': gettextCatalog.getString('Uncle'),
      'aunt': gettextCatalog.getString('Aunt'),
      'brother': gettextCatalog.getString('Brother'),
      'sister': gettextCatalog.getString('Sister'),
      'grandfather': gettextCatalog.getString('Grandfather'),
      'grandmother': gettextCatalog.getString('Grandmother'),
      'grandson': gettextCatalog.getString('Grandson'),
      'granddaughter': gettextCatalog.getString('Granddaughter'),
      'mother': gettextCatalog.getString('Mother'),
      'father': gettextCatalog.getString('Father'),
      'nephew': gettextCatalog.getString('Nephew'),
      'niece': gettextCatalog.getString('Niece'),
      'motherInLaw': gettextCatalog.getString('Mother in Law'),
      'fatherInLaw': gettextCatalog.getString('Father in Law'),
      'brotherInLaw': gettextCatalog.getString('Brother in Law'),
      'sisterInLaw': gettextCatalog.getString('Sister in Law'),
      'sonInLaw': gettextCatalog.getString('Son in Law'),
      'daughterInLaw': gettextCatalog.getString('Daughter in Law'),
      'stepbrother': gettextCatalog.getString('Stepbrother'),
      'stepsister': gettextCatalog.getString('Stepsister')
    },
    
    contactTypes : {
      home: {'icon' : 'phone', 'text': gettext('Home')},
      mobile: {'icon' : 'smartphone', 'text': gettext('Mobile')},
      work: {'icon' : 'work', 'text': gettext('Work')},
      fax: {'icon' : 'print', 'text': gettext('Fax')}
    },
    
    dateTypes :{
      birthday : {'icon' : 'cake', 'text': gettext('Birthday')},
      anniversary: {'icon' : 'people', 'text': gettext('Anniversary')},
      baptism: {'icon' : 'cake', 'text': gettext('Baptism Date')}
    },
    
    addressTypes : {
      home: {'icon' : 'home', 'text': gettext('Home Address')},
      work: {'icon' : 'work', 'text': gettext('Work Address')},
      postal: {'icon' : 'mail', 'text': gettext('Postal Address')}
    },
    
    emailTypes : {
      personal: {'icon' : 'home', 'text': gettext('Personal')},
      work: {'icon' : 'work', 'text': gettext('Work')},
      other: {'icon' : 'mail', 'text': gettext('Other')}
    },

  };
}
