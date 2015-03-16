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
            var saveBtn = angular.element(document.querySelector('.parse-json'));
            var resetBtn = angular.element(document.querySelector('.reset'));

            var onSaveButtonClick = function() {
              controller.saveQuery(iElement.queryBuilder('getLoopback'));
            };
            var onResetButtonClick = function() {
              controller.saveQuery(iElement.queryBuilder('reset'));
            };

            saveBtn.on('click', onSaveButtonClick);
            resetBtn.on('click', onResetButtonClick);

            scope.$on('$destroy', function() {
              saveBtn.off('click', onSaveButtonClick);
              resetBtn.off('click', onResetButtonClick);
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
