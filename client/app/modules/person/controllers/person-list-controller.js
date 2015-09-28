export function PersonListController(
  PersonService,
  Person, 
  resolvePersons
)  {"ngInject";


  this.persons = resolvePersons;

  this.deletePerson = (person) => {
    
    Person.trash({id: person.id}, () => this.persons = PersonService.getAll());
  };


}
