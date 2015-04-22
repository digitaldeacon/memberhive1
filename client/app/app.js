import 'jquery';
import 'angular';
import 'bootstrap';
import 'angular-animate';
import 'angular-cookies';
import 'angular-resource';
import 'angular-sanitize';
import 'angular-touch';
import 'angular-fontawesome';
import 'angular-ui-router';
import 'angular-bootstrap';
import 'bootstrap-select';
import 'angular-ui-select';
import 'angular-bootstrap-select';

import 'angular-gettext';
import 'angular-confirm';
import 'angular-moment';
import 'bootstrap-hover-dropdown';
import 'angular-toastr';
import 'angular-loading-bar';
import 'angular-breadcrumb';

// CSS
import 'bootstrap/css/bootstrap.css!';
import 'bootstrap/css/bootstrap-theme.css!';
import 'font-awesome/css/font-awesome.css!';
import 'github:silviomoreto/bootstrap-select/dist/css/bootstrap-select.css!';
import 'angular-loading-bar/build/loading-bar.css!';
import 'angular-ui-select/dist/select.min.css!';

// Own CSS
import 'styles/main.css!';

// Translations
import 'scripts/translations';

// Own modules
import 'scripts/metronic/metronic';
import 'scripts/metronic/layout';

import {gemCoreModule} from 'modules/core/core';
import {gemConfigModule} from 'scripts/config';
import {gemDashboardModule} from 'modules/dashboard/dashboard';
import {gemAddressModule} from 'modules/address/address';
import {gemPersonModule} from 'modules/person/person';
import {gemAuthModule} from 'modules/auth/auth';
import {gemAclModule} from 'modules/auth/acl';
import {gemNoteModule} from 'modules/note/note';
import {gemReportModule} from 'modules/report/report';

/**
 * The main app module.
 */
export var gemMainModule = angular.module('gem.main', [
  'ngAnimate', 'ngCookies', 'ngResource', 'ngSanitize', 'ngTouch',
  'ui.router', 'ui.bootstrap',  'ui.select',
  'lbServices', 'picardy.fontawesome',
  'angular-bootstrap-select', 'angular-bootstrap-select.extra',
  'angular-confirm', 'angularMoment', 'angular-loading-bar',
  'gettext', 'toastr', 'ncy-angular-breadcrumb',

  // GEM Modules
  'gem.core', // This needs to be loaded first
  // The order of the following modules will be reflected in the main menu.
  'gem.dashboard', 'gem.person', 'gem.acl',
  'gem.auth', 'gem.report', 'gem.note', 'gem.config'
  ]
);

gemMainModule.config(
  ($stateProvider, $urlRouterProvider, cfpLoadingBarProvider, $breadcrumbProvider) => {
    $urlRouterProvider.otherwise('/dashboard');

    cfpLoadingBarProvider.includeSpinner = false;

    //This make the interface less interactive, sometimes something is loading, but it should not block the ui

    //cfpLoadingBarProvider.spinnerTemplate = '<div class="blockui"><div class="page-spinner-bar"><div class="bounce1">' +
    //  '</div><div class="bounce2"></div><div class="bounce3"></div></div></div>';

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
});
