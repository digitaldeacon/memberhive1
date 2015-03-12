angular.module('gem.address').directive('formataddress', function() {
  return {
    restrict: 'E',
    scope: {
      address: '='
    },
    templateUrl: '/address/directives/address.html',
    replace: true
  };
});
