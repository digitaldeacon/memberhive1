var personMapController = function (
)  {"ngInject";
  
  this.center = 0;
  this.zoom = 10;
  this.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
 /* this.allPersons = resolvePersons;
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
    (newValue) => {this.reload(newValue);}, true);*/
};

angular.module('mh.person').controller('PersonMapController', personMapController);
