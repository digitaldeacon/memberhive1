import 'jquery';
import 'angular';
import 'angular-animate';
import 'angular-cookies';
import 'angular-resource';
import 'angular-sanitize';
import 'angular-touch';
import 'angular-fontawesome';
import 'angular-ui-router';
import 'bootstrap';
import 'angular-bootstrap';
import 'angular-ui/ui-sortable';
import 'rubenv/angular-gettext';
import 'angular-ui-select';
import 'joaoneto/angular-bootstrap-select';
import 'Schlogen/angular-confirm';
import 'angular-moment';
import 'CWSpear/bootstrap-hover-dropdown';
import 'Foxandxss/angular-toastr';

// Own modules
import '_global/scripts/lb-services';
import '_global/scripts/metronic/metronic';
import '_global/scripts/metronic/layout';


import {controlGroupDirective} from '_global/directives/form-directives';
import {spinnerBarDirective} from '_global/scripts/directives';
import {formatFiltersModule, dateFiltersModule} from '_global/scripts/filters';
import {gemDashboardModule} from 'dashboard/dashboard';
import {gemAddressModule} from 'address/address';
import {gemPersonModule} from 'person/person';
import {gemAuthModule} from 'auth/auth';
import {gemAclModule} from 'auth/acl';
import {gemNoteModule} from 'note/note';
import {gemOptionModule} from 'option/option';
import {gemReportModule} from 'report/report';

/**
 * The main Gemmii app module.
 */
export var gemMainModule = angular.module('gemmiiWebApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'picardy.fontawesome',
  'ui.router',
  'ui.bootstrap',
  'lbServices',
  'gettext',
  'formatFilters',
  'angular-bootstrap-select',
  'angular-bootstrap-select.extra',
  'angular-confirm',
  'angularMoment',
  'ui.select',
  'textAngular',
  'toastr',

  'gem.person',
  'gem.dashboard',
  'gem.option',
  'gem.acl',
  'gem.auth',
  'gem.note',
  'gem.report'
  ])

  .config(
    ($stateProvider, $urlRouterProvider) => {
      $urlRouterProvider.otherwise('/dashboard');
  })

  .factory('settings', $rootScope => {
    var settings = {
      layout: {
        pageSidebarClosed: false, // sidebar state
        pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
      }
    };
    $rootScope.settings = settings;
    return settings;
  })
  .controller('AppController', $scope => {
      $scope.init = () => {
        Metronic.init();
      };
      $scope.$on('$viewContentLoaded', () => {
        Metronic.initComponents(); // init core components
      });
    })
  .controller('HeaderController', ($scope,$state,$http,$filter,LoopBackAuth,Person) => {
    $scope.accessToken = LoopBackAuth.accessTokenId;
    $scope.$on('$includeContentLoaded', () => {
      Layout.initHeader(); // init header
    });

    $scope.models = ['all','person'];
    $scope.person = [];
    $scope.all = [];

    Person.find().$promise.then(function(response) {
      $scope.person = response;
    });
    $scope.getSearch = function(val) {
      var arr = [];
      if (!val || (val.length > 2)) return arr;
      arr = ($scope.component && $scope[$scope.component]) ? $scope[$scope.component] : [];
      return $filter('filter')(arr,val);
    };
  })
  .controller('SidebarController', ($rootScope,$scope, Account, $state, GemAcl) => { /* Setup Layout Part - Sidebar */
    $scope.logout = () => {
      Account.logout().$promise.then((resp) => {
        GemAcl.setRights([]);
        $state.go('login');
      });
    };

    $scope.$on('$includeContentLoaded', () => {
      Layout.initSidebar(); // init sidebar

    });
  })
  .controller('PageHeadController', $scope => {/* Setup Layout Part - Sidebar */
    $scope.$on('$includeContentLoaded', () => {
    });
  })
  .controller('FooterController', $scope => {/* Setup Layout Part - Footer */
    $scope.$on('$includeContentLoaded', () => {
      Layout.initFooter(); // init footer
    });
  })

  .run(($rootScope, settings, $state, GemAcl, Account, LoopBackAuth) => {
    $rootScope.$state = $state; // state to be accessed from view
    var p = Account.roles({'user_id': LoopBackAuth.currentUserId}).$promise;
    GemAcl.setRightsPromise(p);
  })

  .constant('config', {
    pagination: {
      pageSize: 25
    }
  });

gemMainModule.directive('ngSpinnerBar', spinnerBarDirective);
gemMainModule.directive('controlGroup', controlGroupDirective);
