export class DashboardController {

  constructor($location,$rootScope,$scope,Option,Account,LoopBackAuth) {
    this.$location = $location;
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.Option = Option;
    this.Account = Account;
    this.LoopBackAuth = LoopBackAuth;

    this.curUser = LoopBackAuth.currentUserId;
    this.options = [];
    this.o = { //default values
      accountId: this.curUser,
      optionName: 'DashboardConfig',
      optionValue: this.model,
      id: 0
    };

    this.getOptions('DashboardConfig');
    this.$scope.$on('adfDashboardChanged', (event, name, model) => {
      this.createUpdateOptions(model);
    });
  }

  getOptions(name) {
     this.Option.findOne({
        filter: {
          where: {
            accountId: this.LoopBackAuth.currentUserId,
            optionName: name
          }
        }
      }
    ).$promise.then((result) => {
         this.o = result;
         this.model = this.o.optionValue;
       });
  }

  createUpdateOptions(model) {
    this.o.optionValue = model;
    if (this.o.hasOwnProperty('id')) {
      this.Option.prototype$updateAttributes({id: this.o.id}, this.o);
    } else {
      this.Account.options.create({id:this.curUser}, this.o);
    }
  }

  delete(dashboardId) {
    this.Account.options.destroyById(dashboardId);
    this.$location.path('/');
    this.$rootScope.$broadcast('navChanged');
  }
}
