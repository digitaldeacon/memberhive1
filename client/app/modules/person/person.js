import './filters/person-filters';
import {PersonListController} from './controllers/person-list-controller';
import {PersonEditController} from './controllers/person-edit-controller';
import {PersonViewController} from './controllers/person-view-controller';
import {PersonImportCSVController} from './controllers/person-import-csv-controller';
import {PersonImportImagesController} from './controllers/person-import-images-controller';
import {PersonExportCSVController} from './controllers/person-export-csv-controller';
import {PersonExportVCardController} from './controllers/person-export-vcard-controller';
import {PersonExportPDFController} from './controllers/person-export-pdf-controller';
import {HouseholdListController} from './controllers/household-list-controller';
import {HouseholdEditController} from './controllers/household-edit-controller';
import {PersonService} from './services/person-service';
import {PersonEditService} from './services/person-edit-service';
import {AvatarService} from './services/avatar-service';
import {mhPersonChips, mhPersonStatus, mhPersonListItem, mhPersonEditType, mhPersonHousehold, mhPersonGroup} from './directives/person-directives';
import {mhAvatar} from './directives/avatar-directives';
import {mhPersonSearch} from './directives/person-search-directive';
import {mhWidgetPersonRandom} from './widgets/random/person-random';
import {mhWidgetPersonNextBirthdays} from './widgets/nextBirthdays/nextBirthdays';


export var mhPersonModule = angular.module('mh.person',
  [
    'ngFileUpload',
    'uiGmapgoogle-maps',
    'personFilters',
    'mh.core',
    'mh.address',
    'mh.config'
  ]
).config(
  ($stateProvider, $compileProvider, gettext, uiGmapGoogleMapApiProvider) => {
    $stateProvider.state('person', {
      url: '/person',
      template: '<ui-view/>',
      data: {
        pageTitle: gettext('Person'),
        component: 'person',
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
          return PersonService.getAllFilterd({});
        }/*,
        resolveQueryModel: (AccountOptions) => {
          return AccountOptions.get('person_list_query');
        }*/
      },
    }).state('person.view', {
      url: '/view/:id/',
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
          return Person.notes({"id": $stateParams.id}).$promise;
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
      controller: 'HouseholdListController',
      controllerAs: 'householdCtrl',

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
      },
      resolve: {
        resolveHouseholds: (PersonService) => {
          return PersonService.getHouseholds();
        }
      }
    }).state('person.household-edit', {
      url: '/household/edit/:householdId',
      controller: 'HouseholdEditController',
      controllerAs: 'householdCtrl',
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
      },
      resolve: {
        resolveHousehold: (PersonService, $stateParams) => {
          return PersonService.getHousehold($stateParams.householdId);
        },
        resolvePersons: (Household, $stateParams) => {
          return Household.persons({id: $stateParams.householdId}).$promise;
        }
      }
    }).state('person.household-create', {
      url: '/household/create',
      controller: 'HouseholdEditController',
      controllerAs: 'householdCtrl',
      templateUrl: 'app/modules/person/views/household.edit.html',
      data: {
        pageTitle: gettext('Households'),
        pageSubTitle: gettext('Create Household')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveHousehold: (Household) => {
          return new Household();
        }
      }

    }).state('person.search', {
      url: '/search',
      templateUrl: 'app/modules/person/views/person.search.html',
      data: {
        pageTitle: gettext('Search'),
        pageSubTitle: gettext('Search')
      },
      acl: {
        needRights: ['$authenticated']
      }
    });

    // Allow skype urls http://stackoverflow.com/a/15769779
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|skype):/);

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
mhPersonModule.controller('PersonExportPDFController', PersonExportPDFController);
mhPersonModule.controller('HouseholdListController', HouseholdListController);
mhPersonModule.controller('HouseholdEditController', HouseholdEditController);

mhPersonModule.factory('PersonService', PersonService);
mhPersonModule.service('PersonEditService', PersonEditService);
mhPersonModule.factory('AvatarService', AvatarService);

mhPersonModule.directive('mhAvatar', mhAvatar);
mhPersonModule.directive('mhPersonChips', mhPersonChips);
mhPersonModule.directive('mhPersonStatus', mhPersonStatus);
mhPersonModule.directive('mhPersonHousehold', mhPersonHousehold);
mhPersonModule.directive('mhPersonGroup', mhPersonGroup);
mhPersonModule.directive('mhPersonListItem', mhPersonListItem);
mhPersonModule.directive('mhPersonEditType', mhPersonEditType);
mhPersonModule.directive('mhPersonSearch', mhPersonSearch);

mhPersonModule.directive('mhWidgetPersonRandom', mhWidgetPersonRandom);
mhPersonModule.directive('mhWidgetPersonNextBirthdays', mhWidgetPersonNextBirthdays);


