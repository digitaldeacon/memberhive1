export function PersonEditController (
  $state,
  gettextCatalog,
  AvatarService,
  PersonEditService,
  PersonService,
  Person,
  resolvePerson,
  Shout,
  $http,
  $scope,
  $q
)
{    "ngInject";
  this.loadPerson = (data) => {
    var ret = PersonEditService.transform(data);
    this.households = Person.household({id: data.id});
    this.person = ret;
    return ret;
  };

  this.loadPerson(resolvePerson);
  this.showExtended = false;
  this.personService = PersonService;
  this.uploadedAvatar = null;
  this.croppedAvatar = null; //populated

  this.saveWithNotification = () => {
    this.save().then(
      (person) => Shout.message(gettextCatalog.getString('Successfully saved "{{fullname}}"', {fullname: person.fullName})),
      (err) => Shout.vError(err)
    );
  };

  this.saveAndClose = () => {
    this.save().then(
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
      })
      .then((data) => {
        if (this.avatarDeleted && !this.avatarChanged) {
          PersonService.deleteAvatar(data);
        } else if (this.avatarChanged && this.uploadedAvatar) {
          AvatarService.saveAvatarFromDataURI(data, this.uploadedAvatar);
        }
        return data;
      })
      .then((data) => {
        var promises = [];
        console.log("save households", this.households);
        this.households.forEach((household) => {
          if(household.id) {
            promises.push(Person.household.link({id: data.id, fk: household.id}).$promise);
          } else {
            promises.push(Household.create({}, household).$promise.then((h) => {
              return Person.household.link({id: data.id, fk: h.id}).$promise;
            });
          }
        });
        console.log(promises);
        return $q.all(promises).then(() => {return data;});
      })
      .then(this.loadPerson);
  };

  this.addItem = (val) => {
    this.person[val].push({key: "", value : ""});
  };


  this.geoCodeAddress = () => {
    var geocalls = [];
    _.mapValues(this.person.address, (value)=> {
      var adr = "";
      if(value.street1)
        adr += value.street1;
      if(value.zipcode)
        adr += ", " + value.zipcode;
      if(value.city)
        adr += " " + value.city;

      if(!value.geocode) {
        geocalls.push($http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+adr).then((gdata)=>{
          if(gdata.data.results.length > 0)
            value.geocode = gdata.data.results[0].geometry.location;
        }));
      }
      return value;
    });

    return $q.all(geocalls);
  };

  this.onAvatarSelected = (files, event) => {
    var reader = new FileReader();
    if (files.length > 0) {
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {
        this.uploadedAvatar = event.target.result;
        angular.element("#avatar_preview").src = event.target.result;
      };
      reader.onerror = (err) => {
        Shout.error(gettextCatalog.getString('Can’t read image. Please try again.'));
        this.uploadedAvatar = undefined;
      };
    }
  };
}
