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
  
  this.savePerson = (person) => {
    return Person.upsert({}, person).$promise;
  };
  
}
