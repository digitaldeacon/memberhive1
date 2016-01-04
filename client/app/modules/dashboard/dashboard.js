import {DashboardController} from './controllers/dashboard-controller';
import {mhWidget} from './directives/dashboard-directives';

export var gemDashboardModule = angular.module('mh.dashboard',
  [
  ]);
gemDashboardModule.config(
  ($stateProvider, gettext) => {
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

  }
);

gemDashboardModule.controller('DashboardController', DashboardController);
gemDashboardModule.directive('mhWidget', mhWidget);
