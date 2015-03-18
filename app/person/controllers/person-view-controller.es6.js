export function PersonViewController(Person, PersonService, AddressService, $stateParams) {
  this.person = PersonService.one($stateParams.id);
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
    return [for (person of this.person.household.persons) if (person.id !== this.person.id) person];
  };

  this.isDefaultAddress = (address) => {
    return address.type === 'home';
  };
}
