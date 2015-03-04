angular.module('formatFilters', [])
  .filter('temperature', function() {
  return function(item) {
    return item.toPrecision(1) + ' °C';
  };
});
