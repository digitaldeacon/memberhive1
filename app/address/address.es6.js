angular.module('gem.address').config(
  ($stateProvider) => {
    $stateProvider.state('address', {
      url: '/address',
      template: '<ui-view/>',
      abstract: true
    });
  }
);
