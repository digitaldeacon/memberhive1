export class PersonController {

  constructor(PersonService, Person, config, apiUrl) {
    this.PersonService = PersonService;
    this.Person = Person;

    this.pageSize = config.pagination.pageSize;
    this.getContacts = PersonService.getContacts;
    this.hasAvatar = PersonService.hasAvatar;
    this.relationTypes = PersonService.relationTypes;

    this.persons = [];
    this.currentPage = 1;
    this.totalPersons = 0;

    this.avatarImage = PersonService.avatarImage;
    this.apiUrl = apiUrl;

    this.getPersons();
  }

  pageChanged(pageNum) {
    this.getPersons(pageNum);
  }

  getPersons(pageNumber) {
    pageNumber = pageNumber || 1;

    this.Person.count().$promise.then((result) => {
      this.totalPersons = result.count;
    });
    this.persons = this.PersonService.all(pageNumber);
  }

  deletePerson(person) {
    this.PersonService.delete(person.id, this.getPersons);
  }

}
