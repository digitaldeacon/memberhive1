export function PersonEditPersonalController (
  PersonService, 
  Person, 
  Household, 
  AddressService, 
  $stateParams, 
  $scope, 
  Shout,
  gettextCatalog,
  $filter, 
  $state, 
  $q, 
  $http, 
  AvatarService) 
{    "ngInject";

  this.selectedStatus = null;

  //this.getPerson().then((p) => this.person = p);

  this.relationTypes = PersonService.relationTypes;
  this.genders = PersonService.genders;
  this.households = PersonService.getHouseholds();
  this.addressTypes = AddressService.addressTypes;

  this.primaryContactTypes = ['none', 'email', 'mobile', 'letterHome', 'letterWork', 'letterPostal'];
  this.primaryContactTypesTranslated = {
    'none': gettextCatalog.getString('None (no contact)'),
    'email': gettextCatalog.getString('Email'),
    'mobile': gettextCatalog.getString('Mobile'),
    'letterHome': gettextCatalog.getString('Letter (Home Address)'),
    'letterWork': gettextCatalog.getString('Letter (Work Address)'),
    'letterPostal': gettextCatalog.getString('Letter (Postal Address)')
  };
  this.status = [];

  this.avatar = null;
  this.uploadedAvatar = null;
  this.croppedAvatar = null;
  this.avatarChanged = false;
  this.avatarDeleted = false;
  this.isEditingAvatar = false;

  this.datepickerBirthdateOpened = false;
  this.datepickerBaptismDateOpened = false;

  /// Whether a newly created household should be automatically assigned to the edited person
  this.assignNewHousehold = true;
  
  this.hasAccount = false;
  this.shouldHaveAccount = false;

 

  this.isEditing = () => {
    return this.$stateParams.id !== undefined;
  };

  this.getPerson = () => {
    this.Person.account({'id': this.$stateParams.id}).$promise.
      then(
        (data) => {
          if (data) {
            this.hasAccount = true;
            this.shouldHaveAccount = true;
            this.account = data;
          }
        }
      );
    return this.isEditing() ? this.PersonService.one(this.$stateParams.id) : new this.Person();
    
  };

  this.getTitle = () => {
    if (this.isEditing()) {
      return this.$filter('formatName')(this.person);
    } else {
      return this.gettextCatalog.getString('Create new Person');
    }
  };

  this.editAvatar = () => {
    this.isEditingAvatar = true;
  };

  this.removeAvatar = () => {
    this.person.hasAvatar = false;
    this.avatarDeleted = true;
  };

  this.cancelEditingAvatar = () =>  {
    this.isEditingAvatar = false;
  };

  this.addHousehold = (householdName) => {
    this.Household.create({name: householdName}).$promise.then((household) => {
      if (this.assignNewHousehold) {
        this.person.household = household;
      }
      this.households = this.PersonService.getHouseholds();
    });
  };

  this.hasValidAddress = () => {
    var address;
    var needsAddress = false;
    var addressType = '';
    if (this.person.primaryContact === 'letterHome') {
      needsAddress = true;
      addressType = 'home';
    }
    if (this.person.primaryContact === 'letterWork') {
      needsAddress = true;
      addressType = 'work';
    }
    if (this.person.primaryContact === 'letterPostal') {
      needsAddress = true;
      addressType = 'postal';
    }
    if (!needsAddress) // No address required
      return true;

    if (!this.person.address) // Address needed, but no address found at all
      return false;

    address = this.person.address[addressType];

    // Validate address: Require at least street and city
    return address && address.street1 && address.city;
  };

  /**
   * The user selected a new avatar
   *
   * @param files Selected files (should be only one)
   */
  this.onAvatarSelected = (files, event) => {
    var reader = new FileReader();
    var image = new Image();

    if (files[0]) {
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {
        this.$scope.$apply(() => {
          image.addEventListener('load', () => {
            if (!this.checkImage(image)) {
              this.Shout.message(this.gettextCatalog.getString(
                'For best results the image should be at least 50x50 pixels.'));
            }
            this.avatarChanged = true;
            this.uploadedAvatar = event.target.result;

          });
          image.src = event.target.result;

        });
      };
      reader.onerror = (err) => {
        this.Shout.error(this.gettextCatalog.getString('Can’t read image. Please try again.'));
      };
    }
  };

  /**
   * Checks whether the selected image fulfills the requirements
   *
   * @param image Image object
   * @returns {boolean} True, when
   */
  this.checkImage = (image) => {
    return (image.height >= 50 && image.width >= 50);
  };

  this.geoCodeAddress = () => {
    var geocalls = [];
    _.mapValues(this.person.address, (value)=> {
      var adr = value.street1+', '+value.zipcode+' '+value.city;
      if(!value.geocode) {
        geocalls.push(this.$http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+adr).then((gdata)=>{
          value.geocode = gdata.data.results[0].geometry.location;
        }));
      }
      return value;
    });

    if(geocalls.length > 0) {
      this.$q.all(geocalls).then((res)=>{
        this.Person.upsert({}, this.person).$promise.then((r)=>{
          this.Shout.message(this.gettextCatalog.getString('Successfully saved geocodes'));
        });
      });
    }
  };

  /**
   * Save all person data
   *
   * @todo When creating a new person, we should redirect to the person/view screen afterwards
   */
  this.save = (isValid=true,onward='') => {
    if (!isValid)
      return;

    this.person.hasAvatar = this.person.hasAvatar || this.avatarChanged;

    this.geoCodeAddress();

    this.Person.upsert({}, this.person).$promise.then(
      (data) => {
        var householdId = this.person.household ? this.person.household.id : "";
        if(this.shouldHaveAccount && !this.hasAccount) {
          this.Person.account.create({id: data.id}, {"username": data.firstName + "_"+data.lastName, "email": data.email, "password": data.lastName});
        }
        this.Person.setHousehold({id: this.person.id, householdId: householdId});
        if (this.avatarDeleted && !this.avatarChanged) {
          this.PersonService.deleteAvatar(this.person);
        } else if (this.avatarChanged) {
          this.AvatarService.saveAvatarFromDataURI(this.person.id, this.croppedAvatar);
        }
        this.Shout.message(
          this.gettextCatalog.getString('Successfully saved "{{fullname}}"', {fullname: this.$filter('formatName')(this.person)}));
        
        if(onward !== '') {
          this.$state.go(onward);
        }
      },
      (err) => {
        this.Shout.vError(err);
      }
    );
  };

  this.saveAndClose = () => {
    this.save(true,'person.list');
  };

  this.saveAndNew = () => {
    this.save(true,'person.create');
  };

}
