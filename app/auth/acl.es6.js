angular.module('gem.acl', [])
.constant('gem-acl.config', {
  'redirect': 'login',
})
.provider('GemAcl', ['gem-acl.config', function(config, $get){
  var self = {};
  var data = window.localStorage.getItem('AclRights');
  var info = {};
  self.rights =  (data) ? JSON.parse(data) : [];
  self.redirect = config.redirect;


  self.isGranted = (actions) => _.every(actions, (i) => _.contains(self.rights, i));
  self.isNotGranted = (actions) => _.every(actions, (i) => ! _.contains(self.rights, i));

  this.$get = ['$q', '$rootScope', '$state', function($q, $rootScope, $state) {
    var acl = {};

    acl.setRedirect = (redirectStateName) =>
        self.redirect = redirectStateName;
        
    acl.setRights = (rights) => {
      window.localStorage.setItem('AclRights',JSON.stringify(rights));
      self.rights = rights;
    };
    
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if(!toState.acl || !toState.acl.needRights){
        return acl;
      }
      console.log(self.rights);
      var isGranted = self.isGranted(toState.acl.needRights);
      if(!isGranted && self.redirect !== false){
        event.preventDefault();
        if(self.redirect !== toState.name) {
          $state.go(self.redirect);
        }
      }
    });
    acl.isLoggedOut = () => self.isNotGranted(['$authenticated']);
    acl.isLoggedIn = () => self.isGranted(['$authenticated']);
    acl.can = (action) => self.isGranted([action]);
    acl.canAll = (action) => self.isGranted(action);
    acl.canAny = (actions) =>  _.any(actions, (i) => _.contains(self.rights, i));
  
    return acl;

  }];
}]);
