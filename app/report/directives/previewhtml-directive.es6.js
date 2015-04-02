'use strict';

export function PreviewHTMLDirective($compile) {

  return {
    restrict: 'E',
    scope: {
     html:'@'
     },
    transclude: true,
    replace: true,
    template: '<div>{{html}}</div>',
    link: function(scope,element,attrs) {
      console.log(scope.html);
      //element.html(scope.html).show();
      //$compile(element.contents())(scope);
    }
  };
}
