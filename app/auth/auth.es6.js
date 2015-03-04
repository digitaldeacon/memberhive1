angular.module('gem.auth').config(
  [
    '$stateProvider',
    '$urlRouterProvider',
    $stateProvider =>
    {
      $stateProvider.state('login', {
        url: '/login',
        templateUrl: '../auth/views/login.html',
        data: {
          pageTitle: 'Login'
        },
     });
    }
  ]
);

