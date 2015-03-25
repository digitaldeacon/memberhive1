export function PersonController(Person, PersonService, config, apiUrl) {
  this.pageSize = config.pagination.pageSize;
  this.getContacts = PersonService.getContacts;
  this.hasAvatar = PersonService.hasAvatar;
  this.relationTypes = PersonService.relationTypes;

  this.persons = [];
  this.currentPage = 1;
  this.totalPersons = 0;

  this.apiUrl = apiUrl;
  console.log(this.apiUrl);

  this.pageChanged = (pageNum) => {
    this.getPersons(pageNum);
  };

  this.getPersons = (pageNumber) => {
    pageNumber = pageNumber || 1;

    Person.count().$promise.then((result) => {
      this.totalPersons = result.count;
    });
    console.log(Person);
    this.persons = PersonService.all(pageNumber);
  };

  this.deletePerson = (person) => {
    PersonService.delete(person.id, this.getPersons);
  };

  this.getPersons();
}
