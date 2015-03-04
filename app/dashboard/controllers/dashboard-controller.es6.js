angular.module('gem.dashboard')
  .controller('DashboardController', function($location, $rootScope, $scope, $routeParams, Person) {

    this.personId = 1;
    this.model = Person.options({id:this.personId});

    this.delete = function(id){
      Person.options.delete(id);
      $location.path('/');
      $rootScope.$broadcast('navChanged');
    };

    Person.count(count => {
       this.userCount = count.count;
    });


    $scope.$on('$viewContentLoaded', () => {
      Metronic.initAjax();
    });

    $scope.$on('adfDashboardChanged', function(event, name, model) {
      Person.options.create({id: 1}, model);
    });

  });
