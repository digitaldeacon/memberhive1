import {NoteEditFormDirective, NoteTreeDirective, NoteCreateDirective} from './directives/note-directives';
import {NoteService} from './services/note-service';
import {NoteListController} from './controllers/note-list-controller';
import {NoteCreateController} from './controllers/note-create-controller';
import {MenuSection, MenuLink} from '../core/providers/menu-provider';

export var gemNoteModule = angular.module('gem.note', ['ui.tree']).config(
  ($stateProvider, MainMenuProvider, gettext) => {
    $stateProvider.state('note', {
      url: '/note',
      template: '<ui-view/>',
      abstract: true,
      data: {
        module: 'note',
        pageTitle: 'Note'
      }
    }).state('note.list', {
      url: '/list',
      templateUrl: 'modules/note/views/note.list.html',
      data: {
        pageSubTitle: 'Create and edit notes'
      },
      ncyBreadcrumb: {
        label: gettext('Notes')
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('note.create', {
      url: '/create',
      templateUrl: 'modules/note/views/note.create.html',
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
    }).state('note.edit', {
      url: '/edit/:id',
      templateUrl: 'modules/note/views/note.edit.html',
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
gemNoteModule.directive('mhNoteCreate', NoteCreateDirective);


gemNoteModule.config(function($logProvider){
    $logProvider.debugEnabled(true);
});
