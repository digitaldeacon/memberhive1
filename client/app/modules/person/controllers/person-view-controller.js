export function PersonViewController(
  PersonService, 
  AddressService, 
  $stateParams, 
  Person, 
  resolvePerson,
  resolveNotes,
  NoteIconConfig) {"ngInject";
  this.person = resolvePerson;
  this.notes = resolveNotes;
  this.getContacts = PersonService.getContacts;
  this.relationTypes = PersonService.relationTypes;
  this.genders = PersonService.genders;
  this.addressTypes = AddressService.addressTypes;

  
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
