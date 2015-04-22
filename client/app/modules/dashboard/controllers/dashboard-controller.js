export function DashboardController($scope, Account, LoopBackAuth) {
  Account.findById({id: LoopBackAuth.currentUserId}).$promise.then((err,data) => this.account = data);
  this.options = [];
  $scope.$on('adfDashboardChanged', (event, name, model) => {
    this.account.options.dashboard = model;
    Account.upsert(this.account);
  });
}
