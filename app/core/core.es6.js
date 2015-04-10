import {MainMenu} from 'core/providers/menu-provider';

/**
 * This module holds dependencies needed by other modules including the `gemmiiWebApp` module.
 * Thus, it will be loaded before all other modules.
 *
 * @type {module}
 */
export var gemCoreModule = angular.module('gem.core', []);

gemCoreModule.provider('MainMenu', MainMenu);
