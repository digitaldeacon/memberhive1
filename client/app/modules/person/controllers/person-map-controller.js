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
  
  this.mean = (persons) => {
    let latitude = 0;
    let longitude = 0;
    let count = 0;
    persons.forEach((p) => {
      if(p.geocode) {
        latitude += p.geocode.latitude;
        longitude += p.geocode.longitude;
        count++;
      }
    });
    if(count !== 0) {
      return { latitude: latitude/count, longitude: longitude/count };
    } else {
      return { latitude: latitude, longitude: longitude };
    }
  };
  
  this.map = {zoom: 8 };
  this.map.center = this.mean(resolvePersons);
  
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
