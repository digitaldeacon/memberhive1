export var gemNoteModule = angular.module('gem.note', []).config(
  ($stateProvider) => {
    $stateProvider.state('note', {
      url: '/note',
      template: '<ui-view/>',
      abstract: true,
      data: {
        module: 'note',
        pageTitle: 'Note',
      }
    }).state('note.list', {
      url: '/list',
      templateUrl: '../note/views/note.list.html',
      data: {
        pageSubTitle: 'Create and edit notes'
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('note.create', {
      url: '/create',
      templateUrl: '../note/views/note.create.html',
      data: {
        pageSubTitle: 'Create a note'
      },
      acl: {
        needRights: ['$authenticated']
      }
    });
  }
);
