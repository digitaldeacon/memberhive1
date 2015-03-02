angular.module('gem.option').config(
  [
    '$stateProvider',
    '$urlRouterProvider', $stateProvider =>
  {
    $stateProvider.state('option', {
      url: '/option',
      templateUrl: '../options/views/option.html',
      data: {
        pageTitle: 'Options',
        pageSubTitle: 'Create and edit Options'
      },
      controller: 'OptionController'
    });
  }
  ]
);
