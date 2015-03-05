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
        acl: {
          needRights: ['$authenticated']
        }
      }).state('personCreate', {
        url: '/person/create',
        templateUrl: '../person/views/person_create.html',
        data: {
          pageTitle: 'Person',
          pageSubTitle: 'Create a person'
        },
        resolve: {
          deps: [
            '$ocLazyLoad',
            ($ocLazyLoad) => { $ocLazyLoad.load('scripts/person/controllers/person-create-controller.js'); }
          ]
        },
        acl: {
          needRights: ['$authenticated']
        }
     });
    }
  ]
);

