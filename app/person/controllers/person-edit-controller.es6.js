export function PersonEditController(PersonService, Person, Contact, AddressService,
                                     $stateParams, $scope, Shout, gettext) {
  this.person = PersonService.one($stateParams.id);
  this.getContacts = PersonService.getContacts;
  this.relationTypes = PersonService.relationTypes;
  this.genders = PersonService.genders;
  this.households = PersonService.getHouseholds();
  this.addressTypes = AddressService.addressTypes;
  this.primaryContactTypes = ['Email', 'Mobile', 'Postal'];
  //this.hasUserAccount = (person.account !== undefined);
  this.avatar = null;
  this.uploadedAvatar = null;
  this.croppedAvatar = null;
  this.avatarChanged = false;
  $scope.datepickerOpened = true;

  this.openDatepicker = () => {
    $scope.datepickerOpened = true;
    console.log($scope.datepickerOpened);
  };

  /**
   * The user selected a new avatar
   *
   * @param files Selected files (should be only one)
   */
  this.onAvatarSelected = (files) => {
    var reader = new FileReader();
    var image = new Image();

    if (files[0]) {
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        $scope.$apply(() => {
          image.src = reader.result;
          if (this.checkImage(image)) {
            this.avatarChanged = true;
            this.uploadedAvatar = reader.result;
          } else {
            Shout.error(gettext('Please select an image that is at least 800x800 pixels.'));
            this.uploadedAvatar = null;
          }
        });
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
    return (image.height >= 800 && image.width >= 800);
  };

  /**
   * Save all person data
   */
  this.save = () => {
    console.log(this.avatarChanged);
    // Use upsert() instead of $save() since $save will drop related data.
    // See https://github.com/strongloop/loopback-sdk-angular/issues/120

    /*Person.upsert({}, this.person, function(data) {});
    for (var contact of this.person.contacts) {
      Contact.upsert({}, contact, (data) => {
      });
    }*/
    if (this.avatarChanged)
      PersonService.saveAvatar(this.person, this.dataURItoBlob(this.croppedAvatar));
  };

  /**
   * Converts data uri to Blob. Necessary for uploading.
   * @see http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
   * @param  {String} dataURI
   * @return {Blob}
   */
  this.dataURItoBlob = (dataURI) => {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: mimeString});
  };

}
