export function mhPanelDirective() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div class="md-whiteframe-z1" ng-transclude></div>'
  };
}

export function mhPanelHeaderDirective() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<md-toolbar><div class="md-toolbar-tools"><h3 ng-transclude></h3></div></md-toolbar>'
  };
}

export function mhPanelBodyDirective() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<md-content layout-padding ng-transclude></md-content>'
  };
}
