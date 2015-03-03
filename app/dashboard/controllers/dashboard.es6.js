/* global PortletDraggable */

angular.module('gem.dashboard')
  .controller('DashboardController', function($location, $rootScope, $scope, $routeParams, Person) {
    this.name = $routeParams.id;
    //this.model = data;

    this.delete = function(id){ //jshint ignore:line
      //storeService.delete(id);
      $location.path('/');
      $rootScope.$broadcast('navChanged');
    };

    Person.count(count => {
       this.userCount = count.count;
    });


    $scope.$on('$viewContentLoaded', () => {
      PortletDraggable.init();
    });

    $scope.$on('adfDashboardChanged', function(event, name, model) {//jshint ignore:line
      //storeService.set(name, model);
    });

  });
