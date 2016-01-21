export function PersonListController(
  PersonService,
  PersonEditService,
  resolvePersons,
  $scope
)  {"ngInject";
  this.persons = resolvePersons;
  this.filter = {status:[], tags: [], groupIds: []};
  
  this.deletePerson = (person) => {
    PersonEditService.delete(person.id)
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
    PersonService.getAllFilterd(where).then((d) => this.persons = d);
    console.log(this.persons);
  };
  
  $scope.$watch(() => this.filter, this.reload, true);
}
