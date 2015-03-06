angular.module('formatFilters', [])
  .filter('temperature', function() {
  return function(item) {
    return item.toPrecision(1) + ' °C';
  };
});


angular.module('contactFilters', [])
  .filter('contactFacebook', function() {
    return function(item) {
      return `https://facebook.com/${item}`;
    };
  })
  .filter('contactSkype', function() {
    return function(item) {
      return `skype:${item}`;
    };
  });
