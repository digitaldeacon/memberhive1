'use strict'

###*
 # @ngdoc function
 # @name gemmiiWebApp.controller:PersonCtrl
 # @description
 # # PersonCtrl
 # Controller of the gemmiiWebApp
###
angular.module 'gemmiiWebApp'
  .controller 'PersonCtrl', ($scope) ->
    $scope.awesomeThings = [
      'HTML5 Boilerplate'
      'AngularJS'
      'Karma'
    ]
