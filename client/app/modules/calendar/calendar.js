import {CalendarController} from './controllers/calendar-controller';

import {MenuSection, MenuLink} from 'modules/core/providers/menu-provider';

import './styles/calendar.css!';

export var gemCalendarModule = angular.module('gem.calendar', []
).config(
  ($stateProvider, $compileProvider, MainMenuProvider, gettext) => {
    $stateProvider.state('calendar', {
      url: '/calendar',
      template: '<ui-view/>',
      data: {
        pageTitle: gettext('Calendar'),
        component: 'calendar'
      },
      abstract: true
    }).state('calendar.show', {
      url: '/show',
      templateUrl: 'modules/calendar/views/calendar.show.html',
      data: {
        pageSubTitle: gettext('Display a Calendar')
      },
      ncyBreadcrumb: {
        label: gettext('Calendar')
      },
      acl: {
        needRights: ['$authenticated']
      }
    });

    MainMenuProvider.add(new MenuLink(gettext('Calendar'), 'calendar', 'calendar.show'));
  }
);

gemCalendarModule.controller('CalendarController', CalendarController);
