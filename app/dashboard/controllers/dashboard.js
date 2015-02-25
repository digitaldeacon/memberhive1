angular.module('gemmiiWebApp')
  .controller('DashboardCtrl', ($scope, Person) => {
     $scope.userCount = Person.count(count => {
       $scope.userCount = count.count;
    });
  });
