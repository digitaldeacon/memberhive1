angular.module('gem.dashboard')
  .controller('DashboardController', function($scope, Person) {
    Person.count(count => {
       this.userCount = count.count;
    });
  });
