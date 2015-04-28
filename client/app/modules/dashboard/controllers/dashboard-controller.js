export class DashboardController {

  constructor($scope, Account, LoopBackAuth) {
    this.Account = Account;
    this.LoopBackAuth = LoopBackAuth;

    this.options = [];
    this.account = this.getAccount();

    $scope.$on('adfDashboardChanged', (event, name, model) => {
      this.account.options = {dashboard: model};
      this.account.$save();
    });
  }

  getAccount() {
    return this.Account.findById({id: this.LoopBackAuth.currentUserId});
  }

}
