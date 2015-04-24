export function PreviewHTMLDirective($compile,$sce) {

  return {
    restrict: 'E',
    scope: {
     html:'@'
     },
    transclude: true,
    replace: true,
    template: '<div ng-bind-html="html"></div>'
  };
}
