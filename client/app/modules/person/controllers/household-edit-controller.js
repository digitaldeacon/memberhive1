export class HouseholdEditController {
  constructor(PersonService, Household, $stateParams, Shout, gettextCatalog, $state) {
    this.PersonService = PersonService;
    this.Household = Household;
    this.Shout = Shout;
    this.gettextCatalog = gettextCatalog;
    this.$stateParams = $stateParams;
    this.$state = $state;

    this.household = this.getHousehold();
  }

  isEditing() {
    return this.$stateParams.id !== undefined;
  }

  getHousehold() {
    return this.isEditing() ? this.PersonService.getHousehold(this.$stateParams.id) : new this.Household();
  }

  getTitle() {
    if (this.isEditing()) {
      return this.household.householdName;
    } else {
      return this.gettextCatalog.getString('Create new Household');
    }
  }

  /**
   * Save all household data
   */
  save(isValid) {
    if (!isValid)
      return;

    return this.household.$save(); // TODO: Show success notification
  }

  saveAndClose() {
    this.save().then(() => {
      this.$state.go('person.households');
    });
  }

  saveAndNew() {
    this.save().then(() => {
      this.$state.go('person.household-create');
    });
  }
}
