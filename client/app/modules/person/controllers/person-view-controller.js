export class PersonViewController {

  constructor(PersonService, AddressService, $stateParams, Person) {
    this.person = PersonService.one($stateParams.id);
    this.getContacts = PersonService.getContacts;
    this.relationTypes = PersonService.relationTypes;
    this.genders = PersonService.genders;
    this.addressTypes = AddressService.addressTypes;
    this.notes = Person.notes(
        {"id":$stateParams.id});
  }

  /**
   * Returns the household members except the current person.
   */
  getHouseholdMembers() {
    if (!this.person.household)
      return [];
    return [for (person of this.person.household.persons) if (person.id !== this.person.id) person];
  }

  newNote(note) {
    console.log("new note");
    console.log(note);
    this.notes.push(note);
  }


  static isDefaultAddress(address) {
    return address.type === 'home';
  }
}
