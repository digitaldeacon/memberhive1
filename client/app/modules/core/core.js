import {AppController} from './controllers/app-controller';
import {HeaderController} from './controllers/header-controller';
import {SidebarController} from './controllers/sidebar-controller';
import {ShoutController} from './controllers/shout-controller';

import {MainMenu} from './providers/menu-provider';
import {controlGroupDirective, mhDateInput, mhContent} from './directives/form-directives';
import {uiNavDirective, mhMenuItem, mhMenuIconItem} from './directives/nav-directive';
import {stateLoader, appLoader} from './directives/loading-directive';
import {Shout} from './services/shout';
import {AccountOptions} from './services/account-options';
import {mhFileReader} from './services/filereader';
import {Search} from './services/search';
import {fromNowFilter,fromNowMomentFilter} from './filters/date-filters';

/**
 * This module holds dependencies needed by other modules including the `gem.main` module.
 * Thus, it will be loaded before all other modules.
 *
 * @type {module}
 */
export var mhCoreModule = angular.module('mh.core', ['ngAnimate']);

mhCoreModule.config(($stateProvider, $urlRouterProvider, $mdThemingProvider) => { "ngInject";
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

    'A100': 'F8922F',
    'A200': 'F8922F',
    'A400': 'F8922F',
    'A700': 'F8922F',

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

    'A100': '20D5F8',
    'A200': '20D5F8',
    'A400': '20D5F8',
    'A700': '20D5F8',

    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });

  $mdThemingProvider.definePalette('mh-deep-blue', {
    '50': 'E6E7EA',
    '100': 'C5C8CF',
    '200': 'A2A7B3',
    '300': '7C8394',
    '400': '61697E',
    '500': '475069',
    '600': '40485F',
    '700': '394155',
    '800': '32384A',
    '900': '252936',

    'A100': '20D5F8',
    'A200': '20D5F8',
    'A400': '20D5F8',
    'A700': '20D5F8',

    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
      '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('mh-orange')
    .warnPalette('red')
    .backgroundPalette('grey');

  // Codemirror: Create html/handlebars mixed mode
  // https://github.com/codemirror/CodeMirror/blob/master/mode/handlebars/index.html#L64
  /*CodeMirror.defineMode("htmlhandlebars", function(config) {
    return CodeMirror.multiplexingMode(
      CodeMirror.getMode(config, "text/html"), {
        open: "{{", close: "}}",
        mode: CodeMirror.getMode(config, "handlebars"),
        parseDelimiters: true
      }
    );
  });*/
});

mhCoreModule.run(($rootScope, gettextCatalog) => { "ngInject";
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
  var lang = navigator.language || navigator.userLanguage;
  $rootScope.locale = $rootScope.locales[lang] || $rootScope.locales.de;
  gettextCatalog.setCurrentLanguage($rootScope.locale.lang);
});

// Controllers
mhCoreModule.controller('AppController', AppController);
mhCoreModule.controller('HeaderController', HeaderController);
mhCoreModule.controller('SidebarController', SidebarController);
mhCoreModule.controller('ShoutController', ShoutController);

// Providers
mhCoreModule.provider('MainMenu', MainMenu);

// Services
mhCoreModule.service('Search', Search);
mhCoreModule.service('AccountOptions', AccountOptions);

// Factories
mhCoreModule.factory('Shout', Shout);
mhCoreModule.factory('mhFileReader', mhFileReader);

// Directives
mhCoreModule.directive('mhDateInput', mhDateInput);
mhCoreModule.directive('uiNav', uiNavDirective);
mhCoreModule.directive('mhMenuItem', mhMenuItem);
mhCoreModule.directive('mhMenuIconItem', mhMenuIconItem);
/*mhCoreModule.directive('mhPanel', mhPanelDirective);
mhCoreModule.directive('mhPanelHeader', mhPanelHeaderDirective);
mhCoreModule.directive('mhPanelBody', mhPanelBodyDirective);*/
mhCoreModule.directive('mhContent', mhContent);

mhCoreModule.directive('mhStateLoader', stateLoader);
mhCoreModule.directive('mhAppLoader', appLoader);
// Filters
mhCoreModule.filter('fromNow', fromNowFilter);
mhCoreModule.filter('fromNowMoment', fromNowMomentFilter);
