export function AccountOptions(Account,LoopBackAuth) {"ngInject";
  this.account = null;
  Account.findById({'id': LoopBackAuth.currentUserId}).$promise
    .then((d) => {
      this.account = d;
    });
  this.set = (key, value) => {
    if(!this.account) return;
    if(!this.account.options) {
      this.account.options = {};
    }
    this.account.options[key] = value;
    Account.upsert({}, this.account);
  };
  
  this.get = (key, def = null) => {
    if(!this.account) return def;
    return this.account.options[key] || def;
  };
}
