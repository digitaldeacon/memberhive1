'use strict'

###*
 # @ngdoc function
 # @name gemmyWebApp.controller:AboutCtrl
 # @description
 # # AboutCtrl
 # Controller of the gemmyWebApp
###
angular.module 'gemmyWebApp'
  .controller 'AboutCtrl', ($scope) ->
    $scope.awesomeThings = [
      'HTML5 Boilerplate'
      'AngularJS'
      'Karma'
    ]
