/**
 * Directive to show a person's avatar.
 *
 * Minimal Usage:
 *   <mh-avatar person="personCtrl.person" size="m"></mh-avatar>
 *
 * `size` can be anything from ['xs', 's', 'm', 'l'].
 * `person` must be a Loopback `Person` object.
 *
 * Optionally, you can also provide the `circle` attribute to have a circle avatar.
 * You might also apply any css classes:
 *   <mh-avatar person="personCtrl.person" size="m" circle class="foo bar"></mh-avatar>
 */
export function mhAvatar(AvatarService) {"ngInject";
  return {
    template: '<img ng-src="{{::imgSrc}}" class="{{::cssClasses}} {{::imgClass}}"' +
              ' aria-label="{{::label}}" tooltip="{{::label}}" height="{{::height}}" width="{{::width}}" />',
    restrict: 'E',
    scope: {
      person: '=',
      size: '@',
      cssClasses: '@class',
      label: '@'
    },

    link: function(scope, element, attrs) {
      console.log("link of " + scope.person.firstName);
      scope.size = scope.size || 'xs';
      scope.imgClass = '';
      if (attrs.circle !== undefined)
        scope.imgClass = 'img-circle';

      var setImgSrc = (person, size) => {
        console.log("set src of " + person.firstName);
        var thumbSizes = {
          'xs': 50,
          's':  150,
          'm':  400,
          'l': 800
        };
        scope.height = thumbSizes[size];
        scope.width = thumbSizes[size];
        scope.imgSrc = AvatarService.getAvatarUrl(person, size);
      };

      if (scope.person.$promise) {
        scope.person.$promise.then(() => {
          setImgSrc(scope.person, scope.size);
        });
      } else {
        setImgSrc(scope.person, scope.size);
      }
    }

  };
}

export function mhAvatarUpload() {
  return {
    templateUrl: 'app/modules/person/templates/avatar-upload.html',
    restrict: 'E',
    scope: {
      ngModel: '=',
    },
    controller: function($scope, PersonService) {"ngInject";
      /**
       * The user selected a new avatar
       *
       * @param files Selected files (should be only one)
       */
      $scope.onAvatarSelected = (files, event) => {
        var reader = new FileReader();
        var image = new Image();

        if (files[0]) {
          reader.readAsDataURL(files[0]);
          reader.onload = (event) => {
            this.$scope.$apply(() => {
              image.addEventListener('load', () => {
                if (!$scope.checkImage(image)) {
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
            this.Shout.error(this.gettextCatalog.getString('Cannot read image. Please try again.'));
          };
        }
      };

      /**
      * Checks whether the selected image fulfills the requirements
      *
      * @param image Image object
      * @returns {boolean} True, when
      */
      $scope.checkImage = (image) => {
        return (image.height >= 50 && image.width >= 50);
      };
    }

  };
}




