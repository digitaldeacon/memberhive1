export function PersonEditController (
  gettextCatalog,
  AvatarService,
  PersonEditService,
  PersonService,
  Household,
  Person,
  resolvePerson,
  Shout,
  Group,
  $state,
  $http,
  $scope,
  $q,
  $mdDialog,
  $window
)
{    "ngInject";
  this.loadPerson = (data) => {
    this.person = data;
    if(data.firstName) {
      $state.current.data.pageSubTitle = data.firstName + " " + data.lastName;
    } else {
       $state.current.data.pageSubTitle = "Create new Person";
    }

    return data;
  };

  this.loadPerson(resolvePerson);
  this.showExtended = false;
  this.personService = PersonService;
  this.uploadedAvatar = null;
  this.croppedAvatar = null; //populated
  this.avatarDeleted = false;
  this.avatarChanged = false;

  this.saveWithNotification = () => {
    this.save().then(
      (person) => {
        Shout.success(gettextCatalog.getString('Successfully saved "{{fullname}}"', {fullname: person.fullName}));
        if($state.current.name === "person.create") {
          $state.go('person.edit', {id: person.id});
        }
      },
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
      () => $state.go('person.create').then(() => Shout.message("You can now create a new person")),
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
          AvatarService.deleteAvatar(data);
        } else if (this.avatarChanged && this.uploadedAvatar) {
          AvatarService.saveAvatarFromDataURI(data.id, this.uploadedAvatar);
        }
        return data;
      })
      .then((data) => {
        return PersonEditService.assign(data, this.person.household, this.person.householdIds, Person.household, Household);
      })
      .then((data) => {
        return PersonEditService.assign(data, this.person.groups, this.person.groupIds, Person.groups, Group);
      })
      .then((data) => { return PersonEditService.getPerson(data.id);})
      .then(this.loadPerson);
  };

  this.addItem = (valName, typesName) => {
    let key = "";
    let data = this.person[valName];
    data = data || {};
    if(typesName !== "") {
      let types = PersonService[typesName];
      let availableKeys = _.difference(Object.keys(types), Object.keys(data));

      if(availableKeys.length > 0) {
        key = availableKeys[0];
      }
    }
    console.log(data, key);
    data[key] = "";
    this.person[valName] = data;
    console.log(this.person);
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

  this.onAvatarSelected = (files) => {
    var reader = new FileReader();
    if (files.length > 0) {
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {
        this.uploadedAvatar = event.target.result;
        this.avatarChanged = true;
        angular.element("#avatar_preview").attr('src', this.uploadedAvatar);
      };
      reader.onerror = () => {
        Shout.error(gettextCatalog.getString('Can’t read image. Please try again.'));
        this.uploadedAvatar = undefined;
      };
    }
  };

  this.removeAvatar = () => {
    //this.avatarDeleted = true;
    Shout.warning("This function is not yet ready");
  };

  this.downloadAvatar = () => {
    $window.open(AvatarService.getAvatarUrl(this.person, 'l'), "_blank");
  };

  this.createAccount = (ev) => {
    var username = this.person.firstName.toLowerCase() + "_" + this.person.lastName.toLowerCase();
    var password = Math.random().toString(36).slice(-8);
    var confirm = $mdDialog.confirm()
          .title('Create new account')
          .textContent('It will a create a user with the username: ' + username + '  and password: ' + password )
          .targetEvent(ev)
          .ok('Create Account!')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(() => {
      PersonEditService.createAccount(this.person, username, password)
        .then(
          () => Shout.success("Account Created"),
          err => Shout.vError(err)
        );
    });

  };

  this.goPreviousPerson = () => {
    PersonService.getCachedAll().then((persons) => {
      var index = _.findIndex(persons, p => p.id === this.person.id);
      index--;
      if(persons[index]) {
        $state.go('person.edit', {id: persons[index].id}).then(() => Shout.message(persons[index].firstName + " " + persons[index].lastName));
      }
    });
  };

  this.goNextPerson = () => {
     PersonService.getCachedAll().then((persons) => {
      var index = _.findIndex(persons, p => p.id === this.person.id);
      index++;
      if(persons[index]) {
        $state.go('person.edit', {id: persons[index].id}).then(() => Shout.message(persons[index].firstName + " " + persons[index].lastName));
      }
    });
  };
}
