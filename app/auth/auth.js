angular.module('gem.auth').config(
  [
    '$stateProvider',
    $stateProvider =>
    {
      $stateProvider.state('login', {
        url: '/login',
        templateUrl: '../auth/views/login.html',
     });
    }
  ]
);

