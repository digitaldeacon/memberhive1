angular.module('gem.person').config(
  [
    '$stateProvider',
    '$urlRouterProvider', $stateProvider =>
    {
      $stateProvider.state('person', {
        url: '/person',
        templateUrl: '../person/views/person.html',
        data: {
          pageTitle: 'Person',
          pageSubTitle: 'Create and edit persons'
        },
        controller: 'PersonController',
        acl: {
          needRights: ['$authenticated']
        }
     });
    }
  ]
);

