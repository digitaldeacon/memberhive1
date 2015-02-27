angular.module('gem.dashboard')
  .controller('DashboardController', function($scope, Person, $timeout) {
    Person.count(count => {
       this.userCount = count.count;
    });
    $scope.$on('$viewContentLoaded', () => {
      PortletDraggable.init();
    });
  });
