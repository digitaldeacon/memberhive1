angular.module('gemmiiWebApp')
  .controller('DashboardCtrl', function($scope, Person) {
     $scope.userCount = Person.count(count => {
       $scope.userCount = count.count;
    });
  });
