import 'jquery';
import 'angular';
import 'angular-material';
import 'svg-morpheus'; // Animations for angular-material-icons
import 'angular-material-icons';
import 'bootstrap';
import 'angular-messages';
import 'angular-animate';
import 'angular-cookies';
import 'angular-resource';
import 'angular-sanitize';
import 'angular-touch';
import 'angular-fontawesome';
import 'angular-ui-router';
import 'angular-bootstrap';
import 'angular-spinkit';

import 'angular-gettext';
import 'angular-confirm';
import 'angular-moment';
import 'bootstrap-hover-dropdown';
import 'angular-toastr';
import 'angular-loading-bar';
import 'angular-breadcrumb';

// CSS
import 'bootstrap/css/bootstrap.css!';
import 'font-awesome/css/font-awesome.css!';
import 'angular-loading-bar/build/loading-bar.css!';

// Own CSS
import 'styles/main.css!';

// Translations
import 'scripts/translations';

// Own modules
import {gemCoreModule} from 'modules/core/core';
import {gemConfigModule} from 'scripts/config';
import {gemDashboardModule} from 'modules/dashboard/dashboard';
import {gemAddressModule} from 'modules/address/address';
import {gemPersonModule} from 'modules/person/person';
import {gemAuthModule} from 'modules/auth/auth';
import {gemAclModule} from 'modules/auth/acl';
import {gemNoteModule} from 'modules/note/note';
import {gemReportModule} from 'modules/report/report';
import {gemCalendarModule} from 'modules/calendar/calendar';

/**
 * The main app module.
 */
export var gemMainModule = angular.module('gem.main', [
  'ngAnimate', 'ngMaterial', 'ngCookies', 'ngResource', 'ngSanitize', 'ngTouch', 'ngAria', 'ngMessages',
  'ui.router', 'ui.bootstrap',
  'lbServices', 'picardy.fontawesome',
  'angular-confirm', 'angularMoment', 'angular-loading-bar','angular-spinkit',
  'gettext', 'toastr', 'ncy-angular-breadcrumb', 'ngMdIcons',

  // GEM Modules
  'gem.core', // This needs to be loaded first
  // The order of the following modules will be reflected in the main menu.
  'gem.dashboard', 'gem.person', 'gem.calendar', 'gem.acl',
  'gem.auth', 'gem.report', 'gem.note', 'gem.config'
  ]
);

gemMainModule.config(
  ($stateProvider, $urlRouterProvider, cfpLoadingBarProvider, $breadcrumbProvider) => {
    cfpLoadingBarProvider.includeSpinner = false;

    $breadcrumbProvider.setOptions({
      prefixStateName: 'dashboard',
      templateUrl: 'templates/breadcrumb.html'
    });

  });

gemMainModule.run(($rootScope, $state, GemAcl, Account, LoopBackAuth) => {
  $rootScope.$state = $state; // state to be accessed from view
  $rootScope.accessToken = LoopBackAuth.accessTokenId;
  var p = Account.roles({'user_id': LoopBackAuth.currentUserId}).$promise;
  GemAcl.setRightsPromise(p);
  $rootScope.acl = GemAcl;

});
