angular.module('formatFilters', []).filter('temperature', function() {
  return function(item) {
    return item.number(1) + ' °C';
  };
});
