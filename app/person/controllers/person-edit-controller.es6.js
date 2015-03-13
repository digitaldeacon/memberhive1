function PersonEditController(PersonService, AddressService, $stateParams, $scope) {
  this.person = PersonService.one($stateParams.id);
  this.getContacts = PersonService.getContacts;
  this.relationTypes = PersonService.relationTypes;
  this.genders = PersonService.genders;
  this.households = PersonService.getHouseholds();
  this.addressTypes = AddressService.addressTypes;
  $scope.datepickerOpened = true;


  this.openDatepicker = () => {
    $scope.datepickerOpened = true;
    console.log($scope.datepickerOpened);
  };
}

angular
  .module('gem.person')
  .controller('PersonEditController', PersonEditController);
