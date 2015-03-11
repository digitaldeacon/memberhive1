function PersonController(Person, PersonService, config) {
  this.pageSize = config.pagination.pageSize;
  this.getContacts = PersonService.getContacts;
  this.relationTypes = PersonService.relationTypes;

  this.persons = [];
  this.currentPage = 1;
  this.totalPersons = 0;

  this.pageChanged = (pageNum) => {
    this.getPersons(pageNum);
  };

  this.getPersons = (pageNumber) => {
    pageNumber = pageNumber || 1;

    Person.count().$promise.then((result) => {
      this.totalPersons = result.count;
    });

    this.persons = PersonService.all(pageNumber);
  };

  this.deletePerson = (personId) => {
    Person.deleteById({id: personId}, () => {
      this.getPersons();
    });
  };

  this.getPersons();
}

angular
  .module('gem.person')
  .controller(
    'PersonController',
    PersonController
);
