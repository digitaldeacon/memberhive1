angular.module('gem.report').directive('gemQuerybuilder', function($parse,Report) {

  var link = function(scope, el, atts, Report) {
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
  };
});
