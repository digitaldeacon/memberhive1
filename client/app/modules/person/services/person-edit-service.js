export function PersonEditService(
  $q,
  PersonService,
  Person
) {"ngInject";
  this.personCache = undefined;


  /*
   * Load Person by person_id.
   * Cached
   */
  this.getPerson = (personId) => {
    if(this.personCache && this.personCache.id === personId) //return cached person
      return $q.when(this.personCache);
    return PersonService.one(personId)
      .then((person) => {
        this.personCache = person;
        return person;
      });//cache person
  };

  this.save = (person) => {
    return Person.upsert({}, PersonService.undoMap(person))
      .$promise.then((d) => {return PersonService.mapPerson(d);});
  };

  this.delete = (personId) => {
    return Person.trash({id: personId}).$promise;
  };

  this.createAccount = (person, username, password) => {
    return Person.account.create(
      {id: person.id},
      {
        username: username,
        email: person.emails.personal,
        password: password || person.lastName
      }
    ).$promise;
  };


  this.transform = (person) => {
    person.contactsList = this.fromHashToList(person.contacts);
    person.datesList = this.fromHashToList(person.dates);
    person.emailsList = this.fromHashToList(person.emails);
    person.customList = this.fromHashToList(person.custom);
    return person;
  };

  this.transformBack = (person) => {
    person.contacts = this.fromListToHash(person.contactsList);
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
    let ret = [];
    _.forEach(hash, (value, key) => {
      ret.push({key: key, value: value});
    });
    return ret;
  };
  this.fromListToHash = (list) => {
    let ret = {};
    _.forEach(list, (value) => {
      ret[value.key] = value.value;
    });
    return ret;
  };

}
