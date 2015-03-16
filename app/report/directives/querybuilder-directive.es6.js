angular.module('gem.report')
  .directive('gemQuerybuilder', function factory($parse) {
    //directive defintion object
    var ddo = {
      templateUrl: '/queryBuilderDirective.html',
      controller: 'ReportController as report',
      restrict: 'E',
      compile: function compile(tElement,tAttr,transclude) {
        return {
          pre: function preLink(scope,iElement,iAttrs,controller) {},
          post: function postLink(scope,iElement,iAttrs,controller) {
            iElement.queryBuilder({
              allow_empty: true,//jshint ignore:line
              plugins: ['sortable', 'bt-tooltip-errors'],
              filters: controller.setQBFilters()
            });
            var saveBtn = document.querySelector('.parse-json');
            // Wrap it as a jqLite element
            var button = angular.element(saveBtn);
            var onButtonClick = function() {
              controller.saveQuery(iElement.queryBuilder('getRules'));
            };
            button.on('click', onButtonClick);
            scope.$on('$destroy', function() {
              button.off('click', onButtonClick);
            });
          }
        };
      }
    };
  return ddo;
  /*var link = function(scope, el, atts, Report) {
    el.queryBuilder({
      allow_empty: true,//jshint ignore:line
      plugins: ['sortable', 'bt-tooltip-errors'],
      filters: Report.setQBFilters()
    });
  };

  return {
    restrict: 'E',
    bindToController: true,
    controller: 'ReportController as report',
    link: link
  };*/
});
