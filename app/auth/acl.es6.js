angular.module('gem.acl')
.provider('GemAcl', ['gem-acl.config', function(config, $get, LoopBackAuth, Account) {
  var self = {};
  self.rights = false;
  self.redirect = config.redirect;

  self.contains = (list, item) => _.contains(list, item);

  self.isGrantedB = (actions) => _.every(actions, (i) => self.contains(self.rights, i));
  self.isNotGranted = (actions) => !self.isGrantedB(actions);

  self.isGranted = (actions) => {
    if (self.rights === false) {
      return false;
    } else {
      console.log(self.rights);
      return self.isGrantedB(actions);
    }
  };

  this.$get = ['$q', '$rootScope', '$state', function($q, $rootScope, $state) {
    var acl = {};

    acl.setRedirect = (redirect) => self.redirect = redirect;

    acl.setRights = (rights) => self.rights = rights;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (!toState.acl || !toState.acl.needRights) {
        return acl;
      }
      var isGranted = self.isGranted(toState.acl.needRights);
      if (!isGranted && self.redirect !== false) {
        event.preventDefault();
        if (self.redirect !== toState.name) {
          $state.go(self.redirect);
        }
      }
    });
    acl.isLoggedOut = () => self.isNotGranted(['$authenticated']);
    acl.isLoggedIn = () => self.isGranted(['$authenticated']);
    acl.can = (action) => self.isGranted([action]);
    acl.canAll = (actions) => self.isGranted(actions);
    acl.canAny = (actions) =>  _.any(actions, (i) => self.contains(self.rights, i));

    return acl;

  }];
}]);
