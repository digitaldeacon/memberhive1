angular.module('gem.person').config(
  ($stateProvider, $compileProvider, gettext) => {
    $stateProvider.state('person', {
      url: '/person',
      template: '<ui-view/>',
      data: {
        pageTitle: gettext('Person'),
        component: 'person'
      },
      abstract: true
    }).state('person.list', {

      url: '/list',
      templateUrl: '../person/views/person.list.html',
      data: {
        pageSubTitle: gettext('Create and edit Person')
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('person.view', {
      url: '/view/:id',
      templateUrl: '../person/views/person.view.html',
      data: {
        pageSubTitle: gettext('View Person details')
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('person.create', {
      url: '/create',
      templateUrl: '../person/views/person.create.html',
      data: {
        pageSubTitle: gettext('Create a Person')
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('person.edit', {
      url: '/edit/:id',
      templateUrl: '../person/views/person.edit.html',
      data: {
        pageSubTitle: gettext('Edit a Person')
      },
      acl: {
        needRights: ['$authenticated']
      }
    });

    // Allow skype urls http://stackoverflow.com/a/15769779
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|skype):/);
  }
);
