function DashboardController ($location, $rootScope,$scope,Person) {
  var vm = this;
  vm.options = [];
  vm.curUser = 1;

  function getOptions() {
    Person.options({id: vm.curUser},result => vm.options = result);
  }

  function createUpdateOptions(options) {
    Person.options.upsert({id: vm.curUser},options);
  }

  function deleteDashboard(dashboardId) {
    Person.options.destroyById(dashboardId);
    $location.path('/');
    $rootScope.$broadcast('navChanged');
  }

  /*$scope.$on('$viewContentLoaded', () => {
    Metronic.initAjax(); //funktioniert im Moment nicht
  });*/

  $scope.$on('adfDashboardChanged', (event, name, options) => {
    createUpdateOptions(options);
    //Person.options.updateById({id: vm.curUser,fk: 1},options);
  });

  vm.delete = deleteDashboard;

  getOptions();
}

angular.module('gem.dashboard').controller('DashboardController', DashboardController);
