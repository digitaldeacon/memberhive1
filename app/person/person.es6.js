import 'danialfarid/ng-file-upload/dist/angular-file-upload-all';
import 'ngImgCrop/compile/unminified/ng-img-crop';
import 'ngImgCrop/compile/unminified/ng-img-crop.css!';
import 'angularUtils-pagination';
import 'nsPopover';

import 'person/filters/person-filters';
import {PersonController} from 'person/controllers/person-controller';
import {PersonEditController} from 'person/controllers/person-edit-controller';
import {PersonViewController} from 'person/controllers/person-view-controller';
import {PersonService} from 'person/services/person-service';
import {AvatarDirective} from 'person/directives/person-directives';

import {MenuSection, MenuLink} from 'core/providers/menu-provider';

export var gemPersonModule = angular.module('gem.person',
  [
    'ui.router',
    'lbServices',
    'angularUtils.directives.dirPagination',
    'nsPopover',
    'angularFileUpload',
    'ngImgCrop',

    'personFilters',
    'dateFilters',

    'gem.core',
    'gem.address'
  ]
).config(
  ($stateProvider, $compileProvider, MainMenuProvider, gettext) => {
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
      templateUrl: '../person/views/person.edit.html',
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

    MainMenuProvider.add(new MenuSection(gettext('Persons'), 'user',
      [
        new MenuLink(gettext('List Persons'), 'users', 'person.list'),
        new MenuLink(gettext('Create Person'), 'user-plus', 'person.create')
      ]
    ));
  }
);
gemPersonModule.controller('PersonController', PersonController);
gemPersonModule.controller('PersonViewController', PersonViewController);
gemPersonModule.controller('PersonEditController', PersonEditController);

gemPersonModule.factory('PersonService', PersonService);

gemPersonModule.directive('gemAvatar', AvatarDirective);
