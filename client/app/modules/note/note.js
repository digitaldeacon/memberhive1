import {NoteEditFormDirective, NoteTreeDirective, NoteCreateDirective} from './directives/note-directives';
import {NoteService} from './services/note-service';
import {NoteListController} from './controllers/note-list-controller';
import {NoteEditController} from './controllers/note-edit-controller';
import {MenuSection, MenuLink} from '../core/providers/menu-provider';

export var mhNoteModule = angular.module('mh.note', []).config(
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
      templateUrl: 'app/modules/note/views/note.list.html',
      controller: 'NoteListController',
      controllerAs: 'noteCtrl',
      data: {
        pageSubTitle: 'Create and edit notes'
      },
      ncyBreadcrumb: {
        label: gettext('Notes')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveNotes: (NoteService) => {
          return NoteService.all();
        }
      }
    }).state('note.create', {
      url: '/create',
      templateUrl: 'app/modules/note/views/note.edit.html',
      controller: 'NoteEditController',
      controllerAs: 'noteCtrl',
      data: {
        pageSubTitle: 'Create a note'
      },
      ncyBreadcrumb: {
        label: gettext('New Note'),
        parent: 'note.list'
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveNote: (NoteService) => {
          return NoteService.new();
        }
      }
    }).state('note.edit', {
      url: '/edit/:id',
      controller: 'NoteEditController',
      controllerAs: 'noteCtrl',
      templateUrl: 'app/modules/note/views/note.edit.html',
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveNote: (NoteService, $stateParams) => {
          return NoteService.get($stateParams.id);
        }
      }
    });


    MainMenuProvider.add(new MenuSection(gettext('Notes'), 'note_add',
      [
        new MenuLink(gettext('My Notes'), 'list', 'note.list'),
        new MenuLink(gettext('Create Note'), 'note_add', 'note.create')
      ]
    ));
  }
);
mhNoteModule.controller('NoteListController', NoteListController);
mhNoteModule.controller('NoteEditController', NoteEditController);
mhNoteModule.service('NoteService', NoteService);
mhNoteModule.directive('gemNoteEditForm', NoteEditFormDirective);
mhNoteModule.directive('gemNoteTree', NoteTreeDirective);
mhNoteModule.directive('mhNoteCreate', NoteCreateDirective);
