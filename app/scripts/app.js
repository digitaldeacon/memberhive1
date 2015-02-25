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
  'lbServices',

  'gem.person',
  'gem.dashboard',
  'gem.auth'
]);

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
  ($stateProvider, $urlRouterProvider, User) => {
    if(!User.isAutheticated) {

    }
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
