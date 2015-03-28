export function QueryBuilderDirective($parse) {
    //directive defintion object
    var ddo = {
      templateUrl: '/queryBuilderDirective.html',
      controller: 'ReportUpsertController',
      scope: {
        rule: '=rule'
      },
      restrict: 'E',
      compile: function compile(tElement,tAttr,transclude) {
        return {
          pre: function preLink(scope,iElement,iAttrs,controller) {},
          post: function postLink(scope,iElement,iAttrs,controller) {

            scope.$watch('rule', function(rule) {
              if (rule) {
                console.log('from watch');
                console.log(rule);
                iElement.queryBuilder({
                  allow_empty: true,//jshint ignore:line
                  plugins: ['sortable'], //bt-tooltip-errors
                  filters: controller.setBuilderFilters(),
                  rules: rule
                });
              }
            });

            var saveBtn = angular.element(document.querySelector('.parse-json'));
            var resetBtn = angular.element(document.querySelector('.reset'));

            var onSaveButtonClick = function() {
              if (scope.reportBuilderForm.$invalid) return;
              var qObj = {
                query: iElement.queryBuilder('getLoopback'),
                rule: iElement.queryBuilder('getRules')
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
