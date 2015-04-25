import 'angular-ui-tree';

import {MenuSection, MenuLink} from 'modules/core/providers/menu-provider';
import {NoteEditFormDirective, NoteTreeDirective} from 'modules/note/directives/note-directives';
import {NoteService} from 'modules/note/services/note-service';
import {NoteListController} from 'modules/note/controllers/note-list-controller';
import {NoteCreateController} from 'modules/note/controllers/note-create-controller';

export var gemNoteModule = angular.module('gem.note', ['ui.tree']).config(
  ($stateProvider, MainMenuProvider, gettext) => {
    $stateProvider.state('app.note', {
      url: 'note',
      //template: '<ui-view/>',
      abstract: true,
      data: {
        module: 'note',
        pageTitle: 'Note'
      }
    }).state('app.note.list', {
      url: 'list',
      views: {
        'content@': {
          templateUrl: 'modules/note/views/note.list.html'
        }
      },
      data: {
        pageSubTitle: 'Create and edit notes'
      },
      ncyBreadcrumb: {
        label: gettext('Notes')
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('app.note.create', {
      url: 'create',
      views: {
        'content@': {
          templateUrl: 'modules/note/views/note.create.html'
        }
      },
      data: {
        pageSubTitle: 'Create a note'
      },
      ncyBreadcrumb: {
        label: gettext('New Note'),
        parent: 'note.list'
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('app.note.edit', {
      url: 'edit/:id',
      views: {
        'content@': {
          templateUrl: 'modules/note/views/note.edit.html'
        }
      },
      acl: {
        needRights: ['$authenticated']
      }
    });


    MainMenuProvider.add(new MenuSection(gettext('Notes'), 'file-text',
      [
        new MenuLink(gettext('My Notes'), 'file-text', 'note.list'),
        new MenuLink(gettext('Create Note'), 'plus-circle', 'note.create')
      ]
    ));
  }
);
gemNoteModule.controller('NoteListController', NoteListController);
gemNoteModule.controller('NoteCreateController', NoteCreateController);
gemNoteModule.service('NoteService', NoteService);
gemNoteModule.directive('gemNoteEditForm', NoteEditFormDirective);
gemNoteModule.directive('gemNoteTree', NoteTreeDirective);


gemNoteModule.config(function($logProvider){
    $logProvider.debugEnabled(true);
});
