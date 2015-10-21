export function PersonEditService(
  $q,
  PersonService,
  Person
) {"ngInject";
  this.person = undefined;
  this.account = undefined;
  
  
  /*
   * Load Person by person_id. 
   * Cached
   */
  this.getPerson = (personId) => {
    if(this.person && this.person.id === personId)
      return $q.when(this.person);
    return PersonService.one(personId).then((p) => this.person = p);
  };
  
  this.save = (person) => {
    return Person.upsert({}, person).$promise;
  };
  
  this.delete = (personId) => {
    return Person.trash({id: personId}).$promise;
  };
  
  
  this.transform = (person) => {
    person.contactsList = this.fromHashToList(person.contacts);
    person.addressesList = this.fromHashToList(person.addresses);
    person.datesList = this.fromHashToList(person.dates);
    person.emailsList = this.fromHashToList(person.emails);
    person.customList = this.fromHashToList(person.custom);
    return person;
  };
  
  this.transformBack = (person) => {
    person.contacts = this.fromListToHash(person.contactsList);
    person.addresses = this.fromListToHash(person.addressesList);
    person.dates = this.fromListToHash(person.datesList);
    person.emails = this.fromListToHash(person.emailsList);
    person.custom = this.fromListToHash(person.customList);
    delete person.contactsList;
    delete person.addressesList;
    delete person.datesList;
    delete person.emailsList;
    delete person.customList;
    return person;
  };
  
  this.fromHashToList = (hash) => {
    var ret = [];
    _.forEach(hash, (value, key) => {
      ret.push({key: key, value: value});
    });
    return ret;
  };
  this.fromListToHash = (list) => {
    var ret = {};
    _.forEach(list, (value) => {
      ret[value.key] = value.value;
    });
    return ret;
  };
}
