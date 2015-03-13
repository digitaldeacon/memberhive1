function PersonEditController(PersonService, Person, Contact, AddressService, $stateParams, $scope) {
  this.person = PersonService.one($stateParams.id);
  this.getContacts = PersonService.getContacts;
  this.relationTypes = PersonService.relationTypes;
  this.genders = PersonService.genders;
  this.households = PersonService.getHouseholds();
  this.addressTypes = AddressService.addressTypes;
  //this.hasUserAccount = (person.account !== undefined);
  $scope.datepickerOpened = true;

  this.openDatepicker = () => {
    $scope.datepickerOpened = true;
    console.log($scope.datepickerOpened);
  };

  this.save = () => {
    // Use upsert() instead of $save() since $save will drop related data.
    // See https://github.com/strongloop/loopback-sdk-angular/issues/120

    Person.upsert({}, this.person, function(data) {});
    for (var contact of this.person.contacts)
      Contact.upsert({}, contact, (data) => {
      });
  };
}

angular
  .module('gem.person')
  .controller('PersonEditController', PersonEditController);
