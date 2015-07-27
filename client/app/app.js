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
import {gemNoteModule} from './modules/note/note';
import {gemReportModule} from './modules/report/report';
import {gemCalendarModule} from './modules/calendar/calendar';
import {MenuSection, MenuLink} from './modules/core/providers/menu-provider';
import './scripts/lb-services';
/**
 * The main app module.
 */
export var gemMainModule = angular.module('gem.main', [
  'ngAnimate', 'ngMaterial', 'ngCookies', 'ngResource', 'ngSanitize', 'ngTouch', 'ngAria', 'ngMessages',
  'ui.router', 'ui.bootstrap',
  'lbServices', 'picardy.fontawesome',
  'ngConfirm', 'angularMoment', 'angular-loading-bar','angular-spinkit',
  'gettext', 'ngMdIcons', 'ng-mfb', 'ncy-angular-breadcrumb',
  'angular-google-gapi',

  // GEM modules
  'gem.core', // This needs to be loaded first
  // The order of the following modules will be reflected in the main menu.
  'gem.dashboard', 'gem.person', /*'gem.calendar',*/ 'gem.acl',
  'gem.auth', 'gem.report', 'gem.note', 'gem.config'
  ]
);

gemMainModule.config(
  ($stateProvider, $urlRouterProvider, cfpLoadingBarProvider, $breadcrumbProvider, mhConfig, LoopBackResourceProvider) => {
    cfpLoadingBarProvider.includeSpinner = false;
    LoopBackResourceProvider.setUrlBase(mhConfig.apiUrl);
    $breadcrumbProvider.setOptions({
      prefixStateName: 'dashboard',
      templateUrl: 'app/templates/breadcrumb.html'
    });
  });

gemMainModule.run(($rootScope, $state, GemAcl, Account, LoopBackAuth, GAuth, GApi) => {
  $rootScope.$state = $state; // state to be accessed from view
  $rootScope.accessToken = LoopBackAuth.accessTokenId;
  var p = Account.roles({'user_id': LoopBackAuth.currentUserId}).$promise;
  GemAcl.setRightsPromise(p);
  $rootScope.acl = GemAcl;
  
  var CLIENT = '88164908200-d3jlteogf8d67m5lefqqsppuq8ehbbec.apps.googleusercontent.com';

  GApi.load('calendar', 'v3');
  GApi.load('plus', 'v1');
  GApi.load('m8', 'v1');
  GAuth.setClient(CLIENT);
  GAuth.setScope('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.google.com/m8/feeds');
});
