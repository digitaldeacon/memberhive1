export function QueryBuilderDirective($q) {
    //directive defintion object
    var ddo = {
      templateUrl: '/queryBuilderDirective.html',
      controller: 'ReportUpsertController',
      bindToController: true,
      /*scope: {
        rule: '=rule'
      },*/
      restrict: 'E',
      compile: function compile(tElement,tAttr,transclude) {
        return {
          pre: function preLink(scope,iElement,iAttrs,controller) {},
          post: function postLink(scope,iElement,iAttrs,controller) {
            iElement.queryBuilder({
              allow_empty: true,//jshint ignore:line
              plugins: ['sortable'], //bt-tooltip-errors
              filters: controller.setBuilderFilters()
            });

            if (controller.report) {
              controller.report.$promise.then(data => {
                iElement.queryBuilder('setRules',data.rule);
              });
            }

            var saveBtn = angular.element(document.querySelector('.parse-json'));
            var resetBtn = angular.element(document.querySelector('.reset'));

            var onSaveButtonClick = function() {
              if (scope.reportBuilderForm.$invalid) return;
              var rules = iElement.queryBuilder('getRules');
              var qObj = {
                query: iElement.queryBuilder('getLoopback',rules),
                rule: rules
              };
              controller.saveQuery(qObj);
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
    console.log(scope.$apply(atts.rule));
    el.queryBuilder({
      allow_empty: true,//jshint ignore:line
      plugins: ['sortable'],
      filters: Report.setBuilderFilters()
    });
  };

  return {
    restrict: 'E',

    //bindToController: true,
    controller: 'ReportController',
    link: link
  };*/
}
