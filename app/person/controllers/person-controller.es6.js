function PersonController(Person, $scope) {
  var self = this;
  this.editedPerson = null;
  this.newPerson = null;
  this.isEditing = false;

  $scope.gridOptions = {
    paginationPageSizes: [25, 50, 75],
    paginationPageSize: 25,
    useExternalPagination: true,
    //useExternalSorting: true,
    columnDefs: [
      { field: 'firstName' },
      { field: 'lastName' }
    ]
  };

  $scope.gridOptions.onRegisterApi = function(gridApi) {
    $scope.gridApi = gridApi;
    gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
      self.getPersons(newPage, pageSize);
    });
  };

  this.getPersons = function(pageNumber=1, pageSize=$scope.gridOptions.paginationPageSize) {
    if (!$scope.gridOptions.totalItems)
      Person.count().$promise.then(function(result){
        $scope.gridOptions.totalItems = result.count;
      });

    $scope.gridOptions.data = Person.find({
      filter: {
        limit: pageSize,
        offset: (pageNumber-1) * pageSize
      }
    });
  };

  this.createPerson = (person) => {
    Person.create(person, () => {
      this.initCreateForm();
      this.getPersons();
    });
  };

  this.updatePerson = (person) => {
    Person.upsert(person, () => {
      this.cancelEditing();
      this.getPersons();
    });
  };

  this.deletePerson = (personId) => {
    Person.deleteById({id: personId}, () => {
      this.cancelEditing();
      this.getPersons();
    });
  };

  this.initCreateForm = () => {
    this.newPerson = {firstName: '', lastName: '', email: '', gender: 'male', birthday: ''};
  };

  this.setEditedPerson = (person) => {
    this.editedPerson = angular.copy(person);
    this.isEditing = true;
  };

  this.isCurrentPerson = (personId) => {
    return this.editedPerson !== null && this.editedPerson.id === personId;
  };

  this.cancelEditing = () => {
    this.editedPerson = null;
    this.isEditing = false;
  };

  this.initCreateForm();
  this.getPersons();
}

angular
  .module('gem.person')
  .controller(
    'PersonController',
    PersonController
);
