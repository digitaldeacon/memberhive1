angular.module('gem.option').config(
  [
    '$stateProvider',
    '$urlRouterProvider', $stateProvider =>
  {
    $stateProvider.state('option', {
      url: '/option',
      templateUrl: '../option/views/option.html',
      data: {
        pageTitle: 'Option',
        pageSubTitle: 'Create and edit Options'
      },
      controller: 'OptionController'
    });
  }
  ]
);
