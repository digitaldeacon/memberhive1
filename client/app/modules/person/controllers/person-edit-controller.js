export function PersonEditController (
  $state,
  gettextCatalog,
  PersonEditService,
  PersonService,
  resolvePerson,
  Shout,
  $http,
  $q
) 
{    "ngInject";
  this.person = PersonEditService.transform(resolvePerson);
  this.showExtended = false;
  this.personService = PersonService;
 
  this.saveWithNotification = () => {
    this.save.then(
      (person) => Shout.message(gettextCatalog.getString('Successfully saved "{{fullname}}"', {fullname: person.fullName})),
      (err) => Shout.vError(err)
    );
  };
  
  this.saveAndClose = () => {
    this.save.then(
      () => $state.go('person.list'),
      (err) => Shout.vError(err)
    );
  };
  
  this.saveAndNew = () => {
    this.save().then(
      () => $state.go('person.create'),
      (err) => Shout.vError(err)
    );
  };
  
  this.save = () => {
    return this.geoCodeAddress()
      .then(() => { 
        return PersonEditService.save(PersonEditService.transformBack(this.person));
      }).then( (data) => {
        var ret = PersonEditService.transform(data);
        this.person = ret;
        return ret;
      });
  };
  
  this.addItem = (val) => {
    this.person[val].push({key: "", value : ""});
  };
  
  
  this.geoCodeAddress = () => {
    var geocalls = [];
    _.mapValues(this.person.address, (value)=> {
      var adr = value.street1+', '+value.zipcode+' '+value.city;
      if(!value.geocode) {
        geocalls.push($http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+adr).then((gdata)=>{
          value.geocode = gdata.data.results[0].geometry.location;
        }));
      }
      return value;
    });

    return $q.all(geocalls);
  };
 
}
