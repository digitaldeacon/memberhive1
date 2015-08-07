
export function mhWidget(mhConfig, PersonService) {"ngInject";
  return {
    template: "<md-card><md-card-content><div ng-transclude></div></md-card-content></md-card>",
    restrict: 'E',
    transclude: true
  };
} 
