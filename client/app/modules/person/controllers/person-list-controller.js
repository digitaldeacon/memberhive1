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
  
  /*this.load = () => {
    this.items = [];
    for (var i = 0; i < 100; i++) {
      var person = this.persons[i];
      var res = {fullName: person.fullName, avatar: person.avatarUrl_s};
      this.items.push(res);
    }
  }
  this.load();*/
}
