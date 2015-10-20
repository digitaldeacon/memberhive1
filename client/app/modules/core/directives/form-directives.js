/***
 * expects ngModel to be a  Date Object
 */
export function mhDateInput($filter) {"ngInject";
  return {
    template: '<md-datepicker ng-model="ngModel" md-placeholder="placeholder"></md-datepicker>',
    restrict: 'E',
    scope: {
      ngModel: '=',
      placeholder: '@'
    },

  };
}

export function mhContent() {
  return {
    template: '<md-card><md-card-content ng-transclude></md-card-content></md-card>',
    transclude: true
  };
}
