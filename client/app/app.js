// Translations
import './translations/en/en';
import './translations/de/de';

import {gemCoreModule} from './modules/core/core';
import {gemConfigModule} from './scripts/config';
import {gemDashboardModule} from './modules/dashboard/dashboard';
import {gemAddressModule} from './modules/address/address';
import {gemPersonModule} from './modules/person/person';
import {gemAuthModule} from './modules/auth/auth';
import {gemAclModule} from './modules/auth/acl';
import {mhNoteModule} from './modules/note/note';
import {mhGroupModule} from './modules/group/group';
import {gemReportModule} from './modules/report/report';
import {gemCalendarModule} from './modules/calendar/calendar';
import {gemEventModule} from './modules/event/event';
import {MenuSection, MenuLink} from './modules/core/providers/menu-provider';
import './scripts/lb-services';
/**
 * The main app module.
 */
export var mhMainModule = angular.module('mh.main', [
  'ngAnimate',
  'ngMaterial',
  'ngResource',
  'ngSanitize',
  'ngAria',
  'ui.router',
  'lbServices',
  'angular-loading-bar', 
  'gettext',
  'ngMdIcons',
  'ng-mfb',
  'angular-keyboard',

  'mh.core', // This needs to be loaded first
  'mh.dashboard', 'mh.person', 'mh.event', 'mh.acl',
  'mh.auth', 'mh.report', 'mh.note', 'mh.group', 'mh.config',
  ]
);

mhMainModule.config(
  ($stateProvider, $urlRouterProvider, cfpLoadingBarProvider, mhConfig, LoopBackResourceProvider, $httpProvider) => {
    cfpLoadingBarProvider.includeSpinner = false;
    if(!mhConfig.apiUrl) {
      console.error("API URL not definied");
    } else {
      LoopBackResourceProvider.setUrlBase(mhConfig.apiUrl);
    }
  });

mhMainModule.run(($rootScope, $state, MhAcl, Account, AccountOptions, LoopBackAuth) => {
  $rootScope.$state = $state; // state to be accessed from view
  $rootScope.accessToken = LoopBackAuth.accessTokenId;
  var p = Account.roles({'user_id': LoopBackAuth.currentUserId}).$promise;
  MhAcl.setRightsPromise(p);
  $rootScope.acl = MhAcl;
  $rootScope.options = AccountOptions;
});
