export function PersonListController(
  PersonService,
  PersonEditService,
  AccountOptions,
  SearchQuery,
  Shout,
  resolvePersons,
  resolveQueryModel,
  resolveQuery,
  $scope,
  $state,
  q
)  {"ngInject";
  this.allPersons = resolvePersons;
  this.query = resolveQuery;
  this.queryModel = resolveQueryModel;
  this.persons = [];

 

  this.reload = (query) => {
    q.all(query)
      .then((resolved) => PersonService.getAllFilterd(resolved))
      .then((d) => {
        AccountOptions.set('person_list_query', SearchQuery.clean(this.queryModel));
        this.allPersons = d;
        this.persons = [];
        this.loadMorePersons(15);
       })
      .catch((err) => {
        Shout.vError(err);
        AccountOptions.set('person_list_query', []);
        return PersonService.getAllFilterd({}).then((d) => {
          this.allPersons = d;
          this.persons = [];
          this.loadMorePersons(15);
        });
      });
  };

  //TODO: fix too many reloads
  $scope.$watch(
    () => {
      return this.query;
    },
    (newValue) => {this.reload(newValue);}, true);
}
