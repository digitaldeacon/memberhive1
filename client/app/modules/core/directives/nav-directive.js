export function uiNavDirective() {
  return {
    restrict: 'AC',
    link: function (scope, el, attr) {
      el.find('a').bind('click', function (e) {
        var li = angular.element(this).parent();
        var active = li.parent()[0].querySelectorAll('.active');
        li.toggleClass('active');
        angular.element(active).removeClass('active');
      });
    }
  };
}
