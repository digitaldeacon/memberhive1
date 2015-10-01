export function PersonService(
  Person, 
  Household, 
  Avatar, 
  LoopBackAuth, 
  gettextCatalog,
  Upload, 
  mhConfig, 
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
      person.dateList = [];
      if(person.birthdate) {
        person.birthdate = new Date(person.birthdate);
        person.dateList.push({value: person.birthdate, name: "Birthday"});
      }
      if(person.baptismDate) {
        person.baptismDate = new Date(person.baptismDate);
        person.dateList.push({value: person.baptismDate, name: "Baptism"});
      }
      if(person.anniversary) {
        person.anniversary = new Date(person.anniversary);
         person.dateList.push({value: person.anniversary, name: "Anniversary"});
      }
      person.status = person.status || [];
      person.tags = person.tags || [];
      person = this.avatar(person, 'xs');
      person = this.avatar(person, 's');
      person = this.avatar(person, 'm');
      person = this.avatar(person, 'l');
      
      if(person.contact) {
        person.contactList = [];
        _.forEach(person.contact, (value,index) => {
          person.contactList.push({value: value, name: index});
        });
      }
      if(person.address) {
        person.addressList = [];
        _.forEach(person.address, (value,index) => {
          var short = value.street1 + " " + value.zip + " " + value.city;
          person.addressList.push({value: short, name: index});
        });
      }
      
      
      
      return person;
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
    }

  };
}
