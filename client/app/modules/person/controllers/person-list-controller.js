export function PersonListController(
  PersonService,
  PersonEditService,
  resolvePersons
)  {"ngInject";
  this.persons = resolvePersons;

  this.deletePerson = (person) => {
    PersonEditService.delete(person.id)
      .then(() => this.persons = PersonService.getAllSimple());
  };

}
