angular.module('gem.dashboard')
  .controller('DashboardController', function($scope, Person) {
     $scope.userCount = Person.count(count => {
       $scope.userCount = count.count;
    });
  });
