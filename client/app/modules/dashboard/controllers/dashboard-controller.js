export class DashboardController {

  constructor($scope, Account, LoopBackAuth) {
    this.Account = Account;
    this.LoopBackAuth = LoopBackAuth;
    this.account = this.getAccount();

    $scope.$on('adfDashboardChanged', (event, name, model) => {
      if(this.account.options)
        this.account.options.dashboard = model;
      else
        this.account.options = {dashboard: model};

      this.Account.upsert({},this.account).$promise.then(
        (data) => { console.log(data); });
    });
  }

  getAccount() {
    return this.Account.findById({id: this.LoopBackAuth.currentUserId});
  }
}
