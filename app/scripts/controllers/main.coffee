'use strict'

###*
 # @ngdoc function
 # @name gemmiiWebApp.controller:MainCtrl
 # @description
 # # MainCtrl
 # Controller of the gemmiiWebApp
###
angular.module 'gemmiiWebApp'
  .controller 'MainCtrl', ($scope) ->
    $scope.awesomeThings = [
      'HTML5 Boilerplate'
      'AngularJS'
      'Karma'
    ]
