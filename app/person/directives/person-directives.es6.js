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
    template: '<img src="{{imgSrc}}" class="{{cssClasses}} {{imgClass}}" />',

    restrict: 'E',
    scope: {
      person: '=',
      size: '@',
      cssClasses: '@class'
    },

    link: function(scope, element, attrs) {
      console.log(scope.person.hasAvatar);
      if (scope.person.hasAvatar) {
        scope.imgSrc = `${apiUrl}Avatars/${scope.person.id}/download/${scope.size}.jpg`;
      } else {
        scope.imgSrc = `_global/images/avatar/${scope.size}.jpg`;
      }

      scope.imgClass = '';
      if (attrs.circle !== undefined)
        scope.imgClass = 'img-circle';
    }

  };
}
