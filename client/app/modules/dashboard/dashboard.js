import {DashboardController} from './controllers/dashboard-controller';
import {MenuSection, MenuLink} from '../core/providers/menu-provider';
import {mhWidget} from './directives/dashboard-directives';

export var gemDashboardModule = angular.module('mh.dashboard',
  [
  ]);
gemDashboardModule.config(
  ($stateProvider, MainMenuProvider, gettext) => {
    $stateProvider
      .state('dashboard', {
      url: 'dashboard',
      templateUrl: 'app/modules/dashboard/views/dashboard.html',
      data: {
        pageTitle: gettext('Dashboard')
      },
      ncyBreadcrumb: {
        label: gettext('Home')
      },
      acl: {
        needRights: ['$authenticated']
      }
    });

    MainMenuProvider.add(new MenuLink(gettext('Dashboard'), 'dashboard', 'dashboard'));
  }
);

gemDashboardModule.controller('DashboardController', DashboardController);
gemDashboardModule.directive('mhWidget', mhWidget);
