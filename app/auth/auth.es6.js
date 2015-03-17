export var GemAuthModule = angular.module('gem.auth', []).config(
  ($stateProvider, gettext) => {
      $stateProvider.state('login', {
        url: '/login',
        templateUrl: '../auth/views/login.html',
        data: {
          pageTitle: gettext('Login')
        }
      });
    }
);
