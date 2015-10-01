import {GroupService} from './services/group-service';
import {GroupListController} from './controllers/group-list-controller';
import {GroupEditController} from './controllers/group-edit-controller';
import {mhGroupChips} from './directives/group-directives';


import {MenuSection, MenuLink} from '../core/providers/menu-provider';

export var mhGroupModule = angular.module('mh.group', []).config(
  ($stateProvider, MainMenuProvider, gettext) => {
    $stateProvider.state('group', {
      url: '/group',
      template: '<ui-view/>',
      abstract: true,
      data: {
        module: 'group',
        pageTitle: 'Group'
      }
    }).state('group.list', {
      url: '/list',
      templateUrl: 'app/modules/group/views/group.list.html',
      controller: 'GroupListController',
      controllerAs: 'groupCtrl',
      data: {
        pageSubTitle: 'List Groups'
      },
      ncyBreadcrumb: {
        label: gettext('Notes')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveGroups: (GroupService) => {
          return GroupService.all();
        }
      }
    }).state('group.create', {
      url: '/create',
      templateUrl: 'app/modules/group/views/group.edit.html',
      controller: 'GroupEditController',
      controllerAs: 'groupCtrl',
      data: {
        pageSubTitle: 'Create a Group'
      },
      ncyBreadcrumb: {
        label: gettext('New Group'),
        parent: 'group.list'
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveGroup: (GroupService) => {
          return GroupService.new();
        }
      }
    }).state('group.edit', {
      url: '/edit/:id',
      controller: 'GroupEditController',
      controllerAs: 'groupCtrl',
      templateUrl: 'app/modules/group/views/group.edit.html',
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveGroup: (GroupService, $stateParams) => {
          return GroupService.get($stateParams.id);
        }
      }
    });


    MainMenuProvider.add(new MenuSection(gettext('Groups'), 'group',
      [
        new MenuLink(gettext('List Groups'), 'list', 'group.list'),
        new MenuLink(gettext('Create Group'), 'group_add', 'group.create')
      ]
    ));
  }
);
mhGroupModule.controller('GroupListController', GroupListController);
mhGroupModule.controller('GroupEditController', GroupEditController);
mhGroupModule.service('GroupService', GroupService);
mhGroupModule.directive('mhGroupChips', mhGroupChips);
