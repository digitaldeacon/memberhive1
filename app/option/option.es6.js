import {OptionController} from 'option/controllers/option-controller';

export var gemOptionModule = angular.module('gem.option', []).config(
  ($stateProvider) => {
    $stateProvider.state('option', {
      url: '/option',
      templateUrl: '../option/views/option.html',
      data: {
        pageTitle: 'Option',
        pageSubTitle: 'Create and edit Options'
      },
      controller: 'OptionController'
    });
  }
);

gemOptionModule.controller('OptionController', OptionController);
