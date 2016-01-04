import {CalendarController} from './controllers/calendar-controller';
export var gemCalendarModule = angular.module('mh.calendar', []
).config(
  ($stateProvider, $compileProvider, gettext) => {
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
      templateUrl: 'app/modules/calendar/views/calendar.show.html',
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
  }
);

gemCalendarModule.controller('CalendarController', CalendarController);
