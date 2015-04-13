import {MenuSection, MenuLink} from 'core/providers/menu-provider';
import {NoteEditFormDirective, NoteTreeDirective} from 'note/directives/note-directives';
import {NoteService} from 'note/services/note-service';
import {NoteListController} from 'note/controllers/note-list-controller';

export var gemNoteModule = angular.module('gem.note', []).config(
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
      templateUrl: '../note/views/note.list.html',
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
      templateUrl: '../note/views/note.create.html',
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
    });

    MainMenuProvider.add(new MenuSection(gettext('Notes'), 'file-text',
      [
        new MenuLink(gettext('My Notes'), 'file-text', 'note.list'),
        new MenuLink(gettext('Create Note'), 'plus-circle', 'note.create')
      ]
    ));
  }
);
gemNoteModule.directive('gemNoteEditForm', NoteEditFormDirective);
gemNoteModule.directive('gemNoteTree', NoteTreeDirective);
gemNoteModule.service('NoteService', NoteService);
gemNoteModule.controller('NoteListController', NoteListController);

gemNoteModule.config(function($logProvider){
    $logProvider.debugEnabled(true);
});