export class PersonViewController {

  constructor(PersonService, Person, AddressService, TagService, $stateParams) {
    this.person = PersonService.one($stateParams.id);
    this.getContacts = PersonService.getContacts;
    this.relationTypes = PersonService.relationTypes;
    this.genders = PersonService.genders;
    this.addressTypes = AddressService.addressTypes;
    this.person.$promise.then(data => {
      this.tags = TagService.getTags(Person.model.name,data.id);
    });
  }

  /**
   * Returns the household members except the current person.
   */
  getHouseholdMembers() {
    if (!this.person.household)
      return [];
    return [for (person of this.person.household.persons) if (person.id !== this.person.id) person];
  }

  static isDefaultAddress(address) {
    return address.type === 'home';
  }
}
