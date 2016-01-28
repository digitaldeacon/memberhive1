export function PersonListController(
  PersonService,
  PersonEditService,
  resolvePersons,
  Person,
  Shout,
  $scope,
  $state,
  $timeout
)  {"ngInject";
  this.allPersons = resolvePersons;
  this.filter = {status:[], tags: [], groups: []};
  this.lastFilter = {status:[], tags: [], groups: []};
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

  this.reload = () => {
    var where = {};
    if(this.filter.status && this.filter.status.length > 0) {
      where.status = {inq: this.filter.status};
    }
    if(this.filter.tags && this.filter.tags.length > 0) {
      where.tags = {inq: this.filter.tags};
    }
    if(this.filter.groups && this.filter.groups.length > 0) {
      where.groupIds = {inq: _.map(this.filter.groups, (g) => g.id)};
    }
    PersonService.getAllFilterd(where).then((d) => {
      console.log("get filterd");
      this.allPersons = d;
      this.persons = [];
      this.loadMorePersons(14);
    });
  };
  $scope.$watch(
    () => this.filter,
    (old,n) => {if(old !== n) this.reload();}, true);

  this.timeTravel = () => {
    Person.timetravel().$promise.then((d)=>Shout.success("ad"));
  }
}
