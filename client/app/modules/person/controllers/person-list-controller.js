export function PersonListController(
  PersonService,
  PersonEditService,
  resolvePersons,
  $scope,
  $state,
  $timeout
)  {"ngInject";
  this.allPersons = resolvePersons;
  this.query = {};
  this.persons = [];
  this.editPerson = (person) => {
    $state.go('person.edit', {id: person.id});
  };

  this.loadMorePersons = (count) => {
    count = count || 10;
    if(this.persons.length === this.allPersons.length) {
      return;
    }

    for(let i = 0; i < count; i++) {
      this.persons.push(this.allPersons[this.persons.length]);
      if(this.persons.length === this.allPersons.length) {
        return;
      }
    }
  };
  this.loadMorePersons(15);

  this.deletePerson = (person) => {
    PersonEditService.delete(person)
      .then(this.reload);
  };

  this.reload = (query) => {
    console.log("reload", query);
    PersonService.getAllFilterd(query).then((d) => {
      console.log("get filterd");
      this.allPersons = d;
      this.persons = [];
      this.loadMorePersons(14);
    });
  };
  $scope.$watch(
    () => {
      return this.query;
    },
    (newValue, oldValue) => {this.reload(newValue);}, true);
}
