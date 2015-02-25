angular.module('gem.dashboard').config(
  [
    '$stateProvider',
    '$urlRouterProvider', $stateProvider =>
    {
      $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: '../dashboard/views/dashboard.html',
        data: {
          pageTitle: 'Dashoard',
        },
        controller: 'DashboardCtrl'
     });
    }
  ]
);

