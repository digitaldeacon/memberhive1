angular.module('gemmiiWebApp')
  .controller('DashboardCtrl', function(Person) {
     this.userCount = Person.count(count => {
       this.userCount = count.count;
    });
  });
