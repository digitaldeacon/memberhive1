/**
 * The main Gemmii app module.
 */
var GemmiiApp = angular.module('gemmiiWebApp', [
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

  'gem.person',
  'gem.dashboard',
  'gem.auth'
]);

GemmiiApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
  $ocLazyLoadProvider.config({
    cssFilesInsertBefore: 'ng_load_plugins_before' // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
  });
}]);


GemmiiApp.factory('settings', ['$rootScope', $rootScope => {
  // supported languages
  var settings = {
    layout: {
      pageSidebarClosed: false, // sidebar state
      pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
    }
  };

  $rootScope.settings = settings;

  return settings;
}]);

GemmiiApp.controller('AppController', ['$scope', '$rootScope', $scope => {
  $scope.init = () => {
    Metronic.init();
  };
  $scope.$on('$viewContentLoaded', () => {
    Metronic.initComponents(); // init core components
  });
}]);

GemmiiApp.controller('HeaderController', ['$scope', $scope => {
  $scope.$on('$includeContentLoaded', () => {
    Layout.initHeader(); // init header
  });
}]);

/* Setup Layout Part - Sidebar */
GemmiiApp.controller('SidebarController', ['$scope', $scope => {
  $scope.$on('$includeContentLoaded', () => {
    Layout.initSidebar(); // init sidebar
  });
}]);

/* Setup Layout Part - Sidebar */
GemmiiApp.controller('PageHeadController', ['$scope', $scope => {
  $scope.$on('$includeContentLoaded', () => {
  });
}]);

/* Setup Layout Part - Footer */
GemmiiApp.controller('FooterController', ['$scope', $scope => {
  $scope.$on('$includeContentLoaded', () => {
    Layout.initFooter(); // init footer
  });
}]);

GemmiiApp.config([
  '$stateProvider',
  '$urlRouterProvider',
  ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/dashboard');
  }
]);

angular.module(
  'gem.person',
  [
    'ui.router',
    'lbServices'
  ]
);

angular.module(
  'gem.dashboard',
  [
    'ui.router',
    'lbServices'
  ]
);

angular.module(
  'gem.auth',
  [
    'ui.router',
    'lbServices'
  ]
);


GemmiiApp.run(['$rootScope', 'settings', '$state', ($rootScope, settings, $state) => {
  $rootScope.$state = $state; // state to be accessed from view
}]);
