import {EventController} from './controllers/event-controller';
import {EventsController} from './controllers/events-controller';
import {EventTemplatesController} from './controllers/event-templates-controller';
import {EventTemplateController} from './controllers/event-template-controller';
import {EventService} from './service/event-service';
import {MenuSection, MenuLink} from '../core/providers/menu-provider';


export var mhEventModule = angular.module('mh.event', []
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
    }).state('event.list', {
      url: '/list',
      controller: 'EventsController',
      controllerAs: 'ctrl',
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
    }).state('event.edit', {
      url: '/event/:eventId',
      controller: 'EventController',
      controllerAs: 'ctrl',
      templateUrl: 'app/modules/event/views/event.html',
      data: {
        pageSubTitle: gettext('Event')
      },
      ncyBreadcrumb: {
        label: gettext('Event')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve : {
        resolveEvent: (EventService, $stateParams) => {
          return EventService.get($stateParams.eventId);
        },
        resolveTemplate: (Event, $stateParams) => {
          return Event.template({id: $stateParams.eventId}).$promise;
        }
      }
    })
    .state('event.create', {
      url: '/event/create',
      controller: 'EventController',
      controllerAs: 'ctrl',
      templateUrl: 'app/modules/event/views/event.html',
      data: {
        pageSubTitle: gettext('Create Event')
      },
      ncyBreadcrumb: {
        label: gettext('Event')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve : {
        resolveEvent: (Event) => {
          return new Event();
        },
        resolveTemplate: () => {
          return {};
        }
      }
    })
    .state('event.templates', {
      url: '/templates',
      controller: 'EventTemplatesController',
      controllerAs: 'ctrl',
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
      controller: 'EventTemplateController',
      controllerAs: 'ctrl',
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
        new MenuLink(gettext('All Events'), 'today', 'event.list'),
        new MenuLink(gettext('Event template'), 'person_add', 'event.templates'),
      ]
    ));
  }
);

mhEventModule.controller('EventController', EventController);
mhEventModule.controller('EventsController', EventsController);
mhEventModule.controller('EventTemplatesController', EventTemplatesController);
mhEventModule.controller('EventTemplateController', EventTemplateController);
mhEventModule.service('EventService', EventService);
