function PersonController(Person, $scope) {
  var self = this;
  this.editedPerson = null;
  this.newPerson = null;
  this.isEditing = false;

  this.persons = [];
  this.currentPage = 1;
  this.totalPersons = 0;
  this.pageSize = 25;

  this.pageChanged = (pageNum) => {
    console.log('going to page ' + pageNum);
    this.getPersons(pageNum);
  };

  this.getPersons = (pageNumber, sort) => {
    pageNumber = pageNumber || 1;
    sort = sort || 'lastName ASC';

    Person.count().$promise.then((result) => {
      this.totalPersons = result.count;
    });

    this.persons = Person.find({
      filter: {
        limit: this.pageSize,
        offset: (pageNumber - 1) * this.pageSize,
        order: sort
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
