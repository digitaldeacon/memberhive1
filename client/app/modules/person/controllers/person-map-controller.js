var personMapController = function (
  resolvePersons,
  resolveQuery,
  resolveQueryModel,
  q,
  $scope,
  Shout,
  AccountOptions,
  SearchQuery,
  PersonService
)  {"ngInject";
  
  this.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  this.persons = resolvePersons;
  this.query = resolveQuery;
  this.queryModel = resolveQueryModel;
  console.log(this.persons);

  this.reload = (query) => {
    q.all(query)
      .then((resolved) => PersonService.getAllFilterd(resolved))
      .then((d) => {
        AccountOptions.set('person_list_query', SearchQuery.clean(this.queryModel));
        this.persons = d;
       })
      .catch((err) => {
        Shout.vError(err);
        AccountOptions.set('person_list_query', []);
        return PersonService.getAllFilterd({}).then((d) => this.persons = d);
      });
  };

  $scope.$watch(
    () => {
      return this.query;
    },
    (newValue) => {this.reload(newValue);}, true);
};

angular.module('mh.person').controller('PersonMapController', personMapController);
