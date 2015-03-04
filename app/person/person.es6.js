angular.module('gem.person').config(
  ($stateProvider,gettext) => {
      $stateProvider.state('person', {
        url: '/person',
        templateUrl: '../person/views/person.html',
        data: {
          pageTitle: gettext('Person'),
          pageSubTitle: 'Create and edit persons'
        },
        controller: 'PersonController'
      });
  }
);

