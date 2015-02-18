'use strict'

###*
 # @ngdoc function
 # @name gemmyWebApp.controller:MainCtrl
 # @description
 # # MainCtrl
 # Controller of the gemmyWebApp
###
angular.module 'gemmyWebApp'
  .controller 'MainCtrl', ($scope) ->
    $scope.awesomeThings = [
      'HTML5 Boilerplate'
      'AngularJS'
      'Karma'
    ]
