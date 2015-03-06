function DashboardController($location,$rootScope,$scope,Option,Account,LoopBackAuth) {
  var vm = this;
  vm.curUser = LoopBackAuth.currentUserId;
  vm.options = [];

  vm.o = { //default values
    accountId: vm.curUser,
    optionName: 'DashboardConfig',
    optionValue: vm.model,
    id: 0
  };

  function getOptions(name) {
     Option.findOne({
        filter: {
          where: {
            accountId: LoopBackAuth.currentUserId,
            optionName: name
          }
        }
      }
    ).$promise.then(function(result) {
         vm.o = result;
         vm.model = vm.o.optionValue;
       });
  }

  function createUpdateOptions(model) {
    vm.o.optionValue = model;
    if (vm.o.hasOwnProperty('id')) {
      Option.prototype$updateAttributes({id: vm.o.id},vm.o);
    } else {
      Account.options.create({id:vm.curUser},vm.o);
    }
  }

  function deleteDashboard(dashboardId) {
    Account.options.destroyById(dashboardId);
    $location.path('/');
    $rootScope.$broadcast('navChanged');
  }

  /*$scope.$on('$viewContentLoaded', () => {
    Metronic.initAjax(); //funktioniert im Moment nicht
  });*/

  vm.delete = deleteDashboard;

  getOptions('DashboardConfig');

  console.log(vm.model);

  $scope.$on('adfDashboardChanged', (event, name, model) => {
    createUpdateOptions(model);
  });
}

angular.module('gem.dashboard').controller('DashboardController', DashboardController);
