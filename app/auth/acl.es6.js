import 'lodash';

export var GemAclModule = angular.module('gem.acl', [])
.constant(
  'gem-acl.config',
  {
    'redirect': 'login'
  }
)
.provider('GemAcl', ['gem-acl.config', function(config, $get, LoopBackAuth, $q) {
  var self = {};
  self.rights = false;
  self.rightsPromise = false;
  self.redirect = config.redirect;

  self.contains = (list, item) => _.contains(list, item);

  self.isGranted = (actions) => _.every(actions, (i) => self.contains(self.rights, i));
  self.isNotGranted = (actions) => !self.isGranted(actions);

  this.$get = ['$q', '$rootScope', '$state', function($q, $rootScope, $state) {
    var acl = {};

    acl.setRedirect = (redirect) => self.redirect = redirect;

    acl.setRights = (rights) => self.rights = rights;
    acl.setRightsPromise = (rightsPromise) => self.rightsPromise = rightsPromise;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (self.rights === false) {
        self.rightsPromise
        .then(
          (data) => {
            self.rights = data.roles;
            $rootScope.acl = acl;
            acl.changeState(event,toState);
          },
          (err) => {
            self.rights = [];
            $rootScope.acl = acl;
            acl.changeState(event,toState);
          }
        );
      } else {
        acl.changeState(event, toState);
      }
    });

    acl.changeState = (event, toState) => {
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
    };

    acl.isLoggedOut = () => self.isNotGranted(['$authenticated']);
    acl.isLoggedIn = () => self.isGranted(['$authenticated']);
    acl.can = (action) => self.isGranted([action]);
    acl.canAll = (actions) => self.isGranted(actions);
    acl.canAny = (actions) =>  _.any(actions, (i) => self.contains(self.rights, i));

    return acl;

  }];
}]);
