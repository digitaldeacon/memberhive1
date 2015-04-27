import 'jquery-ui'; //why do i need to do this?
import 'angular-ui/ui-sortable';//why do i need to do this?
import 'angular-dashboard-framework';

import 'modules/adf/structures';
import 'modules/adf/widgets/weather/weather';

import {DashboardController} from './controllers/dashboard-controller';
import {MenuSection, MenuLink} from 'modules/core/providers/menu-provider';

export var gemDashboardModule = angular.module('gem.dashboard',
  [
    'adf',
    'structures',
    'adf.widgets.weather'
  ])
  .config(
    ($stateProvider, MainMenuProvider, gettext) => {
      $stateProvider
        .state('dashboard', {
        url: 'dashboard',
        templateUrl: 'modules/dashboard/views/dashboard.html',
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

      MainMenuProvider.add(new MenuLink(gettext('Dashboard'), 'laptop', 'dashboard'));
    }
  );

gemDashboardModule.controller('DashboardController', DashboardController);
