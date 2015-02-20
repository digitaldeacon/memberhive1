'use strict'

###*
 # @ngdoc overview
 # @name gemmiiWebApp
 # @description
 # # gemmiiWebApp
 #
 # Main module of the application.
###
window.GemmiiApp = angular.module('gemmiiWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'picardy.fontawesome',
    'ui.router',
    'ui.bootstrap'
  ])

GemmiiApp.factory 'settings', [
  '$rootScope'
  ($rootScope) ->
    # supported languages
    settings =
      layout:
        pageSidebarClosed: false
        pageAutoScrollOnLoad: 1000
    $rootScope.settings = settings
    settings
]

GemmiiApp.controller 'AppController', [
  '$scope'
  '$rootScope'
  ($scope, $rootScope) ->
    $scope.$on '$viewContentLoaded', ->
      Metronic.initComponents()
      # init core components
      Layout.init()
      return
    return
]

GemmiiApp.controller 'HeaderController', [
  '$scope'
  ($scope) ->
    $scope.$on '$includeContentLoaded', ->
      Layout.initHeader()
      # init header
      return
    return
]

### Setup Layout Part - Sidebar ###

GemmiiApp.controller 'SidebarController', [
  '$scope'
  ($scope) ->
    $scope.$on '$includeContentLoaded', ->
      Layout.initSidebar()
      # init sidebar
      return
    return
]

### Setup Layout Part - Sidebar ###

GemmiiApp.controller 'PageHeadController', [
  '$scope'
  ($scope) ->
    $scope.$on '$includeContentLoaded', ->
      # Demo.init()
      # init theme panel
      return
    return
]

### Setup Layout Part - Footer ###

GemmiiApp.controller 'FooterController', [
  '$scope'
  ($scope) ->
    $scope.$on '$includeContentLoaded', ->
      Layout.initFooter()
      # init footer
      return
    return
]


GemmiiApp.config [
  '$stateProvider'
  '$urlRouterProvider'
  ($stateProvider, $urlRouterProvider) ->
    # Redirect any unmatched url
    $urlRouterProvider.otherwise '/dashboard.html'
    $stateProvider.state('dashboard',
      url: '/dashboard.html'
      templateUrl: 'views/dashboard.html'
      data:
        pageTitle: 'Dashboard'
        pageSubTitle: 'statistics & reports'
      controller: 'DashboardController')
    return
]

### Init global settings and run the app ###

GemmiiApp.run [
  '$rootScope'
  'settings'
  '$state'
  ($rootScope, settings, $state) ->
    $rootScope.$state = $state
    # state to be accessed from view
    return
]
