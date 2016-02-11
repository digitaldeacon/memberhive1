export function AccountOptions(
  Account,
  LoopBackAuth
) {"ngInject";

  /**
   * This Service is also in $rootScope as options
   */

  this.account = null;
  this.set = (key, value) => {
    this.promise.then(() => {
      if(this.account.options === undefined) {
        this.account.options = {};
      }
      this.account.options[key] = value;
      Account.upsert({}, this.account);
    });
  };

  this.get = (key, def = null) => {
    return this.promise.then(() => {
      return this.account.options[key] || def;
    });
  };

  this.getData = () => {
    return Account.findById({'id': LoopBackAuth.currentUserId})
    .$promise;
  };

  this.promise = this.getData();
}
