/**
 * Directive to show a person's avatar.
 *
 * Minimal Usage:
 *   <gem-avatar person="personCtrl.person" size="m"></gem-avatar>
 *
 * `size` can be anything from ['xs', 's', 'm', 'l'].
 * `person` must be a Loopback `Person` object.
 *
 * Optionally, you can also provide the `circle` attribute to have a circle avatar.
 * You might also apply any css classes:
 *   <gem-avatar person="personCtrl.person" size="m" circle class="foo bar"></gem-avatar>
 */
export function AvatarDirective(mhConfig) {
  return {
    template: '<img ng-src="{{imgSrc}}" class="{{cssClasses}} {{imgClass}}"' +
              ' aria-label="{{label}}" tooltip="{{label}}" />',
    restrict: 'E',
    scope: {
      person: '=',
      size: '@',
      cssClasses: '@class',
      label: '@'
    },

    link: function(scope, element, attrs) {
      scope.size = scope.size || 'xs';
      scope.imgClass = '';
      if (attrs.circle !== undefined)
        scope.imgClass = 'img-circle';

      var setImgSrc = function() {
        if (scope.person.hasAvatar) {
          scope.imgSrc = `${mhConfig.apiUrl}/Avatars/${scope.person.id}/download/${scope.size}.jpg`;
        } else {
          scope.imgSrc = `/app/images/avatar/${scope.size}.jpg`;
        }
      };

      // Hack: When scope.person is not yet resolved, we need to wait until it is.
      if (scope.person.$promise) {
        scope.person.$promise.then(() => {
          setImgSrc();
        });
      } else {
        setImgSrc();
      }
    }

  };
}


