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
      //this.account.$save();
      console.log(this.account);
      console.log(model);
      console.log(name);
      this.Account.upsert(this.account,(r)=>{
        console.log(r);
      });
    });
  }

  getAccount() {
    return this.Account.findById({id: this.LoopBackAuth.currentUserId});
  }
}
