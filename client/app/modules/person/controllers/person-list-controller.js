export function PersonListController(
  PersonService,
  PersonEditService,
  resolvePersons,
  $scope,
  $state
)  {"ngInject";
  this.persons = resolvePersons;
  this.filter = {status:[], tags: [], groups: []};
  this.lastFilter = {status:[], tags: [], groups: []};
  
  this.editPerson = (person) => {
    $state.go('person.edit', {id: person.id});
  };

  this.deletePerson = (person) => {
    PersonEditService.delete(person.id)
      .then(this.reload);
  };

  this.reload = () => {
    console.log("reload", this.filter, this.lastFilter);
    if(angular.equals(this.filter, this.lastFilter))
      return;
    
    this.lastFilter = _.cloneDeep(this.filter);
    var where = {};
    var f = this.filter;
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
  };
  $scope.$watch(() => this.filter, this.reload, true);
}
