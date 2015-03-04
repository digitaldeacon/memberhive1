function PersonController (Person, $scope) {
  var main = this;
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
      getPersons(newPage, pageSize);
    });
  };

  function getPersons(pageNumber=1, pageSize=$scope.gridOptions.paginationPageSize) {
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
  }

  function createPerson(person) {
    Person.create(person, () => {
      initCreateForm();
      getPersons();
    });
  }

  function updatePerson(person) {
    Person.upsert(person, () => {
      cancelEditing();
      getPersons();
    });
  }

  function deletePerson(personId) {
    Person.deleteById({id: personId}, () => {
      cancelEditing();
      getPersons();
    });
  }

  function initCreateForm() {
    main.newPerson = {firstName: '', lastName: '', email: '', gender: 'male', birthday: ''};
  }

  function setEditedPerson(person) {
    main.editedPerson = angular.copy(person);
    main.isEditing = true;
  }

  function isCurrentPerson(personId) {
    return main.editedPerson !== null && main.editedPerson.id === personId;
  }

  function cancelEditing() {
    main.editedPerson = null;
    main.isEditing = false;
  }

  this.getPersons = getPersons;
  this.createPerson = createPerson;
  this.updatePerson = updatePerson;
  this.deletePerson = deletePerson;
  this.setEditedPerson = setEditedPerson;
  this.isCurrentPerson = isCurrentPerson;
  this.cancelEditing = cancelEditing;

  initCreateForm();
  getPersons();
}

angular
  .module('gem.person')
  .controller(
    'PersonController',
    PersonController
);
