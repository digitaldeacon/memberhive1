export function PersonViewController(PersonService, AddressService, $stateParams, Person, NoteIconConfig) {

  this.person = PersonService.one($stateParams.id);
  this.getContacts = PersonService.getContacts;
  this.relationTypes = PersonService.relationTypes;
  this.genders = PersonService.genders;
  this.addressTypes = AddressService.addressTypes;
  this.notes = Person.notes({"id": $stateParams.id});

  /**
   * Returns the household members except the current person.
   */
  this.getHouseholdMembers = () => {
    if (!this.person.household)
      return [];
    var ret = [];
    this.person.household.persons.forEach((person) => {
      if (person.id !== this.person.id) ret.push(person);
    });
  };

  this.newNote = (note) => {
    this.notes.unshift(note);
  };

  this.icon = (noteType) => {
    var icon = 'chat';
    NoteIconConfig.forEach((type) => {
      if(type.value === noteType) icon = type.icon;
    });
    return icon;
  };

  this.badgeClass = (noteType) => {
    var bclass = 'info';
    NoteIconConfig.forEach((type) => {
      if(type.value === noteType) bclass = type.class;
    });
    return bclass;
  };

  this.isDefaultAddress = (address) =>  {
    return address.type === 'home';
  };
}
