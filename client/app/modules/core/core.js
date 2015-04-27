import {AppController} from './controllers/app-controller';
import {HeaderController} from './controllers/header-controller';
import {SidebarController} from './controllers/sidebar-controller';

import {MainMenu} from './providers/menu-provider';
import {controlGroupDirective} from './directives/form-directives';
import {Shout} from './services/shout';
import {GemFileReader} from './services/filereader';
import {GemPdf} from './services/pdf';
import {Search} from './services/search';
import './services/lb-services';
import {fromNowFilter} from './filters/date-filters';
import {temperatureFilter} from './filters/format-filters';

/**
 * This module holds dependencies needed by other modules including the `gem.main` module.
 * Thus, it will be loaded before all other modules.
 *
 * @type {module}
 */
export var gemCoreModule = angular.module('gem.core', []);

gemCoreModule.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/dashboard');

  $stateProvider.state('app',{
    url: '/',
    views: {
      'header': {
        templateUrl: 'templates/header.html'
      },
      'aside': {
        templateUrl: 'templates/sidebar.html'
      },
      'content': {
        templateUrl: 'templates/content.html'
      }
    }
  });
});

gemCoreModule.run(($rootScope) => {
  $rootScope.gemConfig = {
    layout: {
      sidebarClosed: true // sidebar state
    },
    pagination: {
      pageSize: 25
    }
  };
});

// Controllers
gemCoreModule.controller('AppController', AppController);
gemCoreModule.controller('HeaderController', HeaderController);
gemCoreModule.controller('SidebarController', SidebarController);

// Providers
gemCoreModule.provider('MainMenu', MainMenu);

// Services
gemCoreModule.service('Search', Search);

// Factories
gemCoreModule.factory('Shout', Shout);
gemCoreModule.factory('GemFileReader', GemFileReader);
gemCoreModule.factory('GemPdf', GemPdf);

// Directives
gemCoreModule.directive('controlGroup', controlGroupDirective);

// Filters
gemCoreModule.filter('fromNow', fromNowFilter);
gemCoreModule.filter('temperature', temperatureFilter);
