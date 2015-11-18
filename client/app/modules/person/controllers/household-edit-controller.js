export function HouseholdEditController (
  PersonService,
  Household,
  Shout,
  gettextCatalog,
  $state,
  resolveHousehold
) {"ngInject";
  this.household = resolveHousehold;
  this.save = () => {
    return Household.upsert({}, this.household).$promise;
  };

  this.saveAndClose = () => {
    this.save().then(() => {
      $state.go('person.households');
    });
  };

  this.saveAndNew = () => {
    this.save().then(() => {
      $state.go('person.household-create');
    });
  };
}
