import {LoginController} from './controller/login-controller';

export var mhAuthModule = angular.module('mh.auth', []).config(
  ($stateProvider, gettext) => {
      $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/modules/auth/views/login.html',
        data: {
          pageTitle: gettext('Login')
        }
      });
    }
);

mhAuthModule.controller('LoginController', LoginController);
