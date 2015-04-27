export class PersonEditController {
  constructor(PersonService, Person, AddressService, $stateParams, $scope, Shout, gettextCatalog, $filter) {
    this.PersonService = PersonService;
    this.Person = Person;
    this.Shout = Shout;
    this.$scope = $scope;
    this.gettextCatalog = gettextCatalog;
    this.$stateParams = $stateParams;
    this.$filter = $filter;

    this.person = this.getPerson();

    this.relationTypes = PersonService.relationTypes;
    this.genders = PersonService.genders;
    this.households = PersonService.getHouseholds();
    this.addressTypes = AddressService.addressTypes;


    this.primaryContactTypes = ['Email', 'Mobile', 'Postal'];
    this.status = this.loadStatus();

    this.avatar = null;
    this.uploadedAvatar = null;
    this.croppedAvatar = null;
    this.avatarChanged = false;
    this.avatarDeleted = false;
    this.isEditingAvatar = false;

    $scope.datepickerOpened = false;

  }

  loadTags(query) {
    return this.Person.tags({"text":query}).$promise;
  }

  loadStatus(query) {
    return this.PersonService.statusTypes;
  }

  isEditing() {
    return this.$stateParams.id !== undefined;
  }

  getPerson() {
    return this.isEditing() ? this.PersonService.one(this.$stateParams.id) : new this.Person();
  }

  getTitle() {
    if (this.isEditing()) {
      return this.$filter('formatName')(this.person);
    } else {
      return this.gettextCatalog.getString('Create new Person');
    }
  }

  openDatepicker() {
    this.$scope.datepickerOpened = true;
  }

  editAvatar() {
    this.isEditingAvatar = true;
  }

  removeAvatar() {
    this.person.hasAvatar = false;
    this.avatarDeleted = true;
  }

  cancelEditingAvatar() {
    this.isEditingAvatar = false;
  }

  /**
   * The user selected a new avatar
   *
   * @param files Selected files (should be only one)
   */
  onAvatarSelected(files) {
    var reader = new FileReader();
    var image = new Image();

    if (files[0]) {
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {
        this.$scope.$apply(() => {
          image.addEventListener('load', () => {
            if (this.checkImage(image)) {
              this.avatarChanged = true;
              this.uploadedAvatar = event.target.result;
            } else {
              this.Shout.error(this.gettextCatalog.getString('Please select an image that is at least 800x800 pixels.'));
              this.uploadedAvatar = null;
            }
          });
          image.src = event.target.result;

        });
      };
      reader.onerror = (err) => {
        this.Shout.error(this.gettextCatalog.getString('Can’t read image. Please try again.'));
      };
    }
  }

  /**
   * Checks whether the selected image fulfills the requirements
   *
   * @param image Image object
   * @returns {boolean} True, when
   */
  checkImage(image) {
    return (image.height >= 800 && image.width >= 800);
  }

  /**
   * Save all person data
   *
   * @todo When creating a new person, we should redirect to the person/view screen afterwards
   */
  save() {
    this.person.hasAvatar = this.person.hasAvatar || this.avatarChanged;

    console.log(this.status);
    // Use upsert() instead of $save() since $save will drop related data.
    // See https://github.com/strongloop/loopback-sdk-angular/issues/120
    //console.log(this.person);
    this.Person.upsert({}, this.person, function(data) {});
    //FIXME: should be in the person upsert callback
    if (this.avatarDeleted && !this.avatarChanged) {
      this.PersonService.deleteAvatar(this.person);
    } else if (this.avatarChanged) {
      this.PersonService.saveAvatar(this.person, this.dataURItoBlob(this.croppedAvatar));
    }
  }

  /**
   * Converts data uri to Blob. Necessary for uploading.
   * @see http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
   * @param  {String} dataURI
   * @return {Blob}
   */
  dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: mimeString});
  }

}
