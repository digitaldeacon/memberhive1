import {AppController} from './controllers/app-controller';
import {HeaderController} from './controllers/header-controller';
import {SidebarController} from './controllers/sidebar-controller';

import {MainMenu} from './providers/menu-provider';
import {controlGroupDirective} from './directives/form-directives';
import {uiNavDirective, mhMenuItem,mhDropdownMenuItem, mhDropdownMenu, mhOutsideClick} from './directives/nav-directive';
import {mhPanelDirective, mhPanelBodyDirective, mhPanelHeaderDirective} from './directives/panel-directives';
import {Shout} from './services/shout';
import {GemFileReader} from './services/filereader';
import {GemPdf} from './services/pdf';
import {Search} from './services/search';
import './services/lb-services';
import {fromNowFilter,fromNowMomentFilter} from './filters/date-filters';
import {temperatureFilter} from './filters/format-filters';

/**
 * This module holds dependencies needed by other modules including the `gem.main` module.
 * Thus, it will be loaded before all other modules.
 *
 * @type {module}
 */
export var gemCoreModule = angular.module('gem.core', ['ngAnimate']);

gemCoreModule.config(($stateProvider, $urlRouterProvider, $mdThemingProvider) => {
  $urlRouterProvider.otherwise('/dashboard');
  //main color is: #F8922F
  //complementär: #0085AB
  //Generator for palettes http://knizia.biz/mcg/
  $mdThemingProvider.definePalette('mh-orange', {
    '50': 'FDF0E3',
    '100': 'FCDCBD',
    '200': 'FBC896',
    '300': 'F9B16C',
    '400': 'F8A14D',
    '500': 'F8922F',
    '600': 'E1842A',
    '700': 'C97626',
    '800': 'B06721',
    '900': '814C18',
    
    'A100': 'ff8a80',
    'A200': 'ff5252',
    'A400': 'ff1744',
    'A700': 'd50000',
    
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast) 
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });

   $mdThemingProvider.definePalette('mh-blue', {
    '50': 'E1F9FD',
    '100': 'B9F1FC',
    '200': '8FE9FB',
    '300': '61E0F9',
    '400': '40DAF8',
    '500': '20D5F8',
    '600': '1DC1E1',
    '700': '1AADC9',
    '800': '1697B0',
    '900': '106F81',
    
    'A100': 'ff8a80',
    'A200': 'ff5252',
    'A400': 'ff1744',
    'A700': 'd50000',
    
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast) 
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('mh-blue')
    .warnPalette('lime')
    .backgroundPalette('grey');
});

gemCoreModule.run(($rootScope, gettextCatalog, $cookies) => {
  $rootScope.gemConfig = {
    layout: {
      sidebarClosed: true // sidebar state
    },
    pagination: {
      pageSize: 25
    }
  };

  // Set up languages
  $rootScope.locales = {
    'en': {
      lang: 'en',
      country: 'US',
      name: gettextCatalog.getString('English')
    },
    'de': {
      lang: 'de',
      country: 'DE',
      name: gettextCatalog.getString('German')
    }
  };
  var lang = $cookies.lang || navigator.language || navigator.userLanguage;
  $rootScope.locale = $rootScope.locales[lang] || $rootScope.locales.de;
  gettextCatalog.setCurrentLanguage($rootScope.locale.lang);
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
gemCoreModule.directive('uiNav', uiNavDirective);
gemCoreModule.directive('mhMenuItem', mhMenuItem);

gemCoreModule.directive('mhDropdownMenu', mhDropdownMenu);
gemCoreModule.directive('mhDropdownMenuItem', mhDropdownMenuItem);
gemCoreModule.directive('mhOutsideClick', mhOutsideClick);

gemCoreModule.directive('mhPanel', mhPanelDirective);
gemCoreModule.directive('mhPanelHeader', mhPanelHeaderDirective);
gemCoreModule.directive('mhPanelBody', mhPanelBodyDirective);

// Filters
gemCoreModule.filter('fromNow', fromNowFilter);
gemCoreModule.filter('fromNowMoment', fromNowMomentFilter);
gemCoreModule.filter('temperature', temperatureFilter);
