/**
 * The main Gemmii app module.
 */
angular.module('gemmiiWebApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'picardy.fontawesome',
  'ui.router',
  'ui.bootstrap',
  'oc.lazyLoad',
  'lbServices',
  'gettext',
  'formatFilters',
  'angular-bootstrap-select',
  'angular-bootstrap-select.extra',
  'angular-confirm',
  'angularMoment',

  'gem.person',
  'gem.dashboard',
  'gem.option',
  'gem.acl',
  'gem.auth',
  'gem.note'
  ])

  .config(
    ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) => {
      $urlRouterProvider.otherwise('/dashboard');
      $ocLazyLoadProvider.config({
        // load the above css files before a LINK element with this ID.
        // Dynamic CSS files must be loaded between core and theme css files
        cssFilesInsertBefore: 'ng_load_plugins_before'
      });
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
  .controller('HeaderController', ($scope,$state,$http,LoopBackAuth) => {
    $scope.accessToken = LoopBackAuth.accessTokenId;
    $scope.$on('$includeContentLoaded', () => {
      Layout.initHeader(); // init header
    });
    $scope.getSearch = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(response) {
        return response.data.results.map(function(item) {
          return item.formatted_address; //jshint ignore:line
        });
      });
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

angular.module(
  'gem.person',
  [
    'ui.router',
    'lbServices',
    'schemaForm',
    'angularUtils.directives.dirPagination',
    'nsPopover',

    'personFilters',
    'dateFilters',

    'gem.address'
  ]
);

angular.module(
  'gem.address',
  [
    'iso-3166-country-codes'
  ]
);

angular.module(
  'gem.note',
  []
);


angular.module(
  'gem.dashboard',
  [
    'ui.router',
    'lbServices',
    'gem.acl'
  ]
);

angular.module(
  'gem.auth',
  [
    'ui.router',
    'lbServices'
  ]
);

angular.module(
  'gem.option',
  [
    'ui.router',
    'lbServices'
  ]
);
angular.module(
  'gem.acl',
  [
    'lbServices'
  ]
).constant(
  'gem-acl.config',
  {
    'redirect': 'login'
  }
);
