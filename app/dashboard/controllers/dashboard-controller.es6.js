function DashboardController ($location, $rootScope,$scope, Account) {
  var vm = this;
  vm.options = [];
  vm.curUser = 1;

  function getOptions() {
    Account.options({id: vm.curUser})
      .$promise
      .then((result) => vm.options = result.options);
  }

  function createUpdateOptions(options) {
    Account.options.upsert({id: vm.curUser}, options);
  }

  function deleteDashboard(dashboardId) {
    Account.options.destroyById(dashboardId);
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
