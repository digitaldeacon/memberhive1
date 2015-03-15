angular.module('gemmiiWebApp').directive('gemQuerybuilder', function($parse) {
  return {
    restrict: 'E',
    require: 'ngModel',
    link: function(scope, el, atts, ngModel) {
      el.queryBuilder({
        allow_empty: true,//jshint ignore:line
        plugins: ['sortable', 'bt-tooltip-errors'],
        onAfterSetValue: function(rule,value) {
          scope.$apply(function() {
            ngModel.$setViewValue(value);
          });
        },
        filters: [
          {
            id: 'name',
            label: 'Name',
            type: 'string',
            optgroup: 'core',
            default_value: '', //jshint ignore:line
            size: 30,
            unique: true
          }]
      });
    }
  };
});
