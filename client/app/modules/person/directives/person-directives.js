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
export function AvatarDirective(apiUrl) {
  return {
    template: '<img ng-src="{{imgSrc}}" class="{{cssClasses}} {{imgClass}}" />',

    restrict: 'E',
    scope: {
      person: '=',
      size: '@',
      cssClasses: '@class'
    },

    link: function(scope, element, attrs) {
      if (scope.person.hasAvatar) {
        scope.imgSrc = `${apiUrl}/Avatars/${scope.person.id}/download/${scope.size}.jpg`;
      } else {
        scope.imgSrc = `/images/avatar/${scope.size}.jpg`;
      }

      scope.imgClass = '';
      if (attrs.circle !== undefined)
        scope.imgClass = 'img-circle';
    }

  };
}


