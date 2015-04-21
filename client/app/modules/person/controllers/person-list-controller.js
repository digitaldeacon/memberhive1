export class PersonListController {

  constructor(PersonService, Person) {
    this.PersonService = PersonService;
    this.Person = Person;

    this.getContacts = PersonService.getContacts;
    this.hasAvatar = PersonService.hasAvatar;
    this.relationTypes = PersonService.relationTypes;

    this.persons = [];
    this.currentPage = 1;
    this.totalPersons = 0;

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
