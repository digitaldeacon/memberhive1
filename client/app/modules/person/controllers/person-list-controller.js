export function PersonListController(PersonService,Person)  {"ngInject";
  this.relationTypes = PersonService.relationTypes;
  this.statusTypes = PersonService.statusTypes;

  this.persons = [];
  this.currentPage = 1;
  this.totalPersons = 0;

  this.getPersons = (pageNumber) => {
    Person.count().$promise.then((result) => {
      this.totalPersons = result.count;
    });
    this.persons = PersonService.all(pageNumber);
  };

  this.deletePerson = (person) => {
    Person.trash({id: person.id}, () => {
      this.getPersons(this.currentPage);
    });
  };
  
  this.pageChanged = (pageNum) => {
    this.getPersons(pageNum);
  };
  
  this.getPersons(1);

}
