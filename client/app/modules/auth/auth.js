import {LoginController} from 'modules/auth/controller/auth-controller';

import './styles/auth.css!';

export var gemAuthModule = angular.module('gem.auth', []).config(
  ($stateProvider, gettext) => {
      $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'modules/auth/views/login.html',
        data: {
          pageTitle: gettext('Login')
        }
      });
    }
);

gemAuthModule.controller('LoginController', LoginController);
