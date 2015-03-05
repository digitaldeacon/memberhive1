angular.module('gem.person').config(
  ($stateProvider) => {
    $stateProvider
    .state('person', {
      url: '/person',
      template: '<ui-view/>',
      abstract: true,
    })
    .state('person.list', {
      url: '/list',
      templateUrl: '../person/views/person.html',
      data: {
        pageTitle: 'Person',
        pageSubTitle: 'Create and edit persons'
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('person.create', {
      url: '/create',
      templateUrl: '../person/views/person_create.html',
      data: {
        pageTitle: 'Person',
        pageSubTitle: 'Create a person'
      },
      acl: {
        needRights: ['$authenticated']
      }
    });
  }
);
