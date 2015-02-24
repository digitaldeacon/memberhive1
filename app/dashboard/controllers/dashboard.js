angular.module('gemmiiWebApp')
  .controller('DashboardCtrl', function ($scope, Person) {
        $scope.userCount = Person.count(function(count) {$scope.userCount = count.count;});
  });
