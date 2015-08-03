import {EventController} from './controllers/event-controller';
import {EventsController} from './controllers/events-controller';
import {EventTemplatesController} from './controllers/event-templates-controller';
import {EventTemplateController} from './controllers/event-template-controller';
import {MenuSection, MenuLink} from '../core/providers/menu-provider';


export var gemEventModule = angular.module('gem.event', []
).config(
  ($stateProvider, $compileProvider, MainMenuProvider, gettext) => {
    $stateProvider.state('event', {
      url: '/event',
      data: {
        pageTitle: gettext('Calendar'),
        component: 'calendar'
      },
      abstract: true,
      template: '<ui-view/>'
    }).state('event.all', {
      url: '/all',
      templateUrl: 'app/modules/event/views/events.html',
      data: {
        pageSubTitle: gettext('All Events')
      },
      ncyBreadcrumb: {
        label: gettext('Event')
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('event.one', {
      url: '/event/:eventId',
      templateUrl: 'app/modules/event/views/event.html',
      data: {
        pageSubTitle: gettext('Event')
      },
      ncyBreadcrumb: {
        label: gettext('Event')
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('event.templates', {
      url: '/templates',
      templateUrl: 'app/modules/event/views/event.templates.html',
      data: {
        pageSubTitle: gettext('Event Templates')
      },
      ncyBreadcrumb: {
        label: gettext('Event Templates')
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('event.template', {
      url: '/templates/:templateId',
      templateUrl: 'app/modules/event/views/event.template.html',
      data: {
        pageSubTitle: gettext('Event Templates')
      },
      ncyBreadcrumb: {
        label: gettext('Event Template')
      },
      acl: {
        needRights: ['$authenticated']
      }
    });
    MainMenuProvider.add(new MenuSection(gettext('Event'), 'today',
      [
        new MenuLink(gettext('All Events'), 'today', 'event.all'),
        new MenuLink(gettext('Event template'), 'person_add', 'event.templates'),
      ]
    ));
  }
);

gemEventModule.controller('EventController', EventController);
gemEventModule.controller('EventsController', EventsController);
gemEventModule.controller('EventTemplatesController', EventTemplatesController);
gemEventModule.controller('EventTemplateController', EventTemplateController);
