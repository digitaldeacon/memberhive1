
import './filters/person-filters';
import {MenuSection, MenuLink} from '../core/providers/menu-provider';

import {PersonListController} from './controllers/person-list-controller';

import {PersonEditController} from './controllers/person-edit-controller';


import {PersonViewController} from './controllers/person-view-controller';
import {PersonImportCSVController} from './controllers/person-import-csv-controller';
import {PersonImportImagesController} from './controllers/person-import-images-controller';
import {PersonExportCSVController} from './controllers/person-export-csv-controller';
import {PersonExportVCardController} from './controllers/person-export-vcard-controller';
import {HouseholdListController} from './controllers/household-list-controller';
import {HouseholdEditController} from './controllers/household-edit-controller';
import {PersonService} from './services/person-service';
import {PersonEditService} from './services/person-edit-service';
import {AvatarService} from './services/avatar-service';
import {mhPersonChips, mhPersonStatus, mhPersonTags, mhPersonListItem, mhPersonEditType} from './directives/person-directives';
import {mhAvatar, mhAvatarUpload} from './directives/avatar-directives';
import {PersonStatsWidget} from './widgets/stats/person-stats';
import {mhWidgetPersonRandom} from './widgets/random/person-random';


export var mhPersonModule = angular.module('mh.person',
  [
    'ngFileUpload',
    'ngImgCrop',
    'uiGmapgoogle-maps',
    'personFilters',
    'mh.core',
    'mh.address',
    'mh.config'
  ]
).config(
  ($stateProvider, $compileProvider, MainMenuProvider, gettext, uiGmapGoogleMapApiProvider) => {
    $stateProvider.state('person', {
      url: '/person',
      template: '<ui-view/>',
      data: {
        pageTitle: gettext('Person'),
        component: 'person',
        sidebarFolded: true
      },
      abstract: true
    }).state('person.list', {
      url: '/list',
      templateUrl: 'app/modules/person/views/person.list.html',
      controller: 'PersonListController',
      controllerAs: 'personCtrl',
      data: {
        pageTitle: gettext('Persons'),
        pageSubTitle: gettext('Create and edit Persons')
      },
      ncyBreadcrumb: {
        label: gettext('Persons')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolvePersons: (PersonService) => {
          return PersonService.cachedAllSimple();
        },
      },
    }).state('person.view', {
      url: '/view/:id',
      templateUrl: 'app/modules/person/views/person.view.html',
      controller: 'PersonViewController',
      controllerAs: 'personCtrl',
      data: {
        pageSubTitle: gettext('View Person details')
      },
      ncyBreadcrumb: {
        label: gettext('View Person'),
        parent: 'person'
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolvePerson: ($stateParams, PersonEditService) => {
          return PersonEditService.getPerson($stateParams.id);
        },
        resolveNotes : ($stateParams, Person) => {
          return Person.notes({"id": $stateParams.id});
        }
      },
    }).state('person.create', {
      url: '/create',
      controller: 'PersonEditController',
      controllerAs: 'personCtrl',
      templateUrl: 'app/modules/person/views/person.edit.html',
      data: {
        pageSubTitle: gettext('Create a Person')
      },
      ncyBreadcrumb: {
        label: gettext('New Person'),
        parent: 'person'
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolvePerson: (Person) => {
          return new Person();
        }
      },

    }).state('person.edit', {
      url: '/edit/:id',
      controller: 'PersonEditController',
      controllerAs: 'personCtrl',
      templateUrl: 'app/modules/person/views/person.edit.html',
      data: {
        pageSubTitle: gettext('Edit a Person')
      },
      ncyBreadcrumb: {
        label: gettext('Edit Person'),
        parent: 'person'
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolvePerson: ($stateParams, PersonEditService) => {
          return PersonEditService.getPerson($stateParams.id);
        }
      },
    }).state('person.import', {
      url: '/import',
      templateUrl: 'app/modules/person/views/person.import.html',
      data: {
        pageSubTitle: gettext('Import Persons')
      },
      ncyBreadcrumb: {
        label: gettext('Import'),
        parent: 'person'
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('person.export', {
      url: '/export',
      templateUrl: 'app/modules/person/views/person.export.html',
      data: {
        pageSubTitle: gettext('Export Persons')
      },
      ncyBreadcrumb: {
        label: gettext('Export'),
        parent: 'person'
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('person.households', {
      url: '/households',
      templateUrl: 'app/modules/person/views/household.list.html',
      data: {
        pageTitle: gettext('Households'),
        pageSubTitle: gettext('View Households')
      },
      ncyBreadcrumb: {
        label: gettext('Households')
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('person.household-edit', {
      url: '/household/edit/:id',
      templateUrl: 'app/modules/person/views/household.edit.html',
      data: {
        pageTitle: gettext('Households'),
        pageSubTitle: gettext('Edit Household')
      },
      ncyBreadcrumb: {
        label: gettext('Edit Household')
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('person.household-create', {
      url: '/household/create',
      templateUrl: 'app/modules/person/views/household.edit.html',
      data: {
        pageTitle: gettext('Households'),
        pageSubTitle: gettext('Create Household')
      },
      ncyBreadcrumb: {
        label: gettext('New Household')
      },
      acl: {
        needRights: ['$authenticated']
      }
    });

    // Allow skype urls http://stackoverflow.com/a/15769779
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|skype):/);

    MainMenuProvider.add(new MenuSection(gettext('Persons'), 'people',
      [
        new MenuLink(gettext('List Persons'), 'people', 'person.list'),
        new MenuLink(gettext('Create Person'), 'person_add', 'person.create'),
        new MenuLink(gettext('List Households'), 'location_city', 'person.households'),
        new MenuLink(gettext('Create Household'), 'add', 'person.household-create'),
        new MenuLink(gettext('Import'), 'file_upload', 'person.import'),
        new MenuLink(gettext('Export'), 'cloud_download', 'person.export')
      ]
    ));

    uiGmapGoogleMapApiProvider.configure({
      //    key: 'your api key',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    });
  }
);
mhPersonModule.controller('PersonListController', PersonListController);
mhPersonModule.controller('PersonViewController', PersonViewController);

mhPersonModule.controller('PersonEditController', PersonEditController);


mhPersonModule.controller('PersonImportCSVController', PersonImportCSVController);
mhPersonModule.controller('PersonImportImagesController', PersonImportImagesController);
mhPersonModule.controller('PersonExportVCardController', PersonExportVCardController);
mhPersonModule.controller('PersonExportCSVController', PersonExportCSVController);
mhPersonModule.controller('HouseholdListController', HouseholdListController);
mhPersonModule.controller('HouseholdEditController', HouseholdEditController);

mhPersonModule.factory('PersonService', PersonService);
mhPersonModule.service('PersonEditService', PersonEditService);
mhPersonModule.factory('AvatarService', AvatarService);

mhPersonModule.directive('mhAvatar', mhAvatar);
mhPersonModule.directive('mhPersonChips', mhPersonChips);
mhPersonModule.directive('mhPersonStatus', mhPersonStatus);
mhPersonModule.directive('mhPersonTags', mhPersonTags);
mhPersonModule.directive('mhPersonListItem', mhPersonListItem);
mhPersonModule.directive('mhPersonEditType', mhPersonEditType);

mhPersonModule.directive('mhWidgetPersonRandom', mhWidgetPersonRandom);


