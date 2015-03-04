angular.module('gem.acl', [])
.constant('gem-acl.config', {
  'redirect': 'login',
  'allowedActions': []
})
.provider('GemAcl', ['gem-acl.config', function(config, $get){
  var self = {};
  self.allowedActions = config.actions;
  self.redirect = config.redirect;


  self.isGranted = (actions) => ! _.any(actions, (i) => _.findIndex(self.allowedActions, i) === -1);
 
  this.$get = ['$q', '$rootScope', '$state', function($q, $rootScope, $state) {
    var acl = {};

    acl.setRedirect = (redirectStateName) =>
        self.redirect = redirectStateName;
        
    acl.setAllowedActions = (actions) =>
        self.allowedActions = actions;

    acl.getAllowedActions = () => self.allowedActions;
    
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if(!toState.acl || !toState.acl.needRights){
        return acl;
      }
      if(toState.acl.needRights.size === 0){
        return acl;
      }
      var isGranted = self.isGranted(toState.acl.needRights);
      console.log(isGranted);
      if(!isGranted && self.redirect !== false){
        event.preventDefault();
        if(self.redirect !== toState.name) {
          $state.go(self.redirect);
        }
      }
    });

    return acl;

  }];
}]);
