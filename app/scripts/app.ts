/// <reference path="../../typings/tsd.d.ts" />

import Metronic = require("Metronic");
import Layout = require("Layout");

/**
 * The main Gemmii app module.
 *
 * @type {angular.Module}
 */
module App {
  'use strict';

  export var GemmiiApp = angular.module('gemmiiWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'picardy.fontawesome',
    'ui.router',
    'ui.bootstrap'
  ]);

  GemmiiApp.factory('settings', ['$rootScope', function($rootScope) {
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

  GemmiiApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
      Metronic.initComponents(); // init core components
    });
  }]);

  GemmiiApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
      Layout.initHeader(); // init header
    });
  }]);

  /* Setup Layout Part - Sidebar */
  GemmiiApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
      Layout.initSidebar(); // init sidebar
    });
  }]);

  /* Setup Layout Part - Sidebar */
  GemmiiApp.controller('PageHeadController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
      //Demo.init(); // init theme panel
    });
  }]);

  /* Setup Layout Part - Footer */
  GemmiiApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
      Layout.initFooter(); // init footer
    });
  }]);

  GemmiiApp.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/dashboard');

      $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: '../dashboard/views/dashboard.html',
        data: {
          pageTitle: 'Dashboard'
        },
      pageSubTitle: 'statistics & reports',
      controller: 'DashboardCtrl'
      });

      $stateProvider.state('person', {
        url: '/person',
        templateUrl: '../person/views/person.html',
        data: {
          pageTitle: 'Person',
          pageSubTitle: 'Create and edit persons'
        },
        controller: 'PersonCtrl'
      });
    }
  ]);

  GemmiiApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
  }]);
}
