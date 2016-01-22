import {EventController} from './controllers/event-controller';
import {EventsController} from './controllers/events-controller';
import {EventTemplatesController} from './controllers/event-templates-controller';
import {EventTemplateController} from './controllers/event-template-controller';
import {EventService} from './service/event-service';


export var mhEventModule = angular.module('mh.event', ["materialCalendar"]
).config(
  ($stateProvider, gettext) => {
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
      url: '/view/:eventId',
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
      resolve: {
        resolveEvent: (EventService, $stateParams) => {
          return EventService.get($stateParams.eventId);
        },
        resolveTemplate: (Event, $stateParams) => {
          return Event.template({id: $stateParams.eventId}).$promise;
        },
        resolveTemplates: (EventTemplate) => {
          return EventTemplate.find();
        }
      }
    })
    .state('event.create', {
      url: '/create',
      controller: 'EventController',
      controllerAs: 'ctrl',
      templateUrl: 'app/modules/event/views/event.html',
      data: {
        pageSubTitle: gettext('Create Event')
      },
      params: { date: null},
      ncyBreadcrumb: {
        label: gettext('Event')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve : {
        resolveEvent: (EventService, $stateParams) => {
          return EventService.new($stateParams.date);
        },
        resolveTemplates: (EventTemplate) => {
          return EventTemplate.find();
        },
        resolveTemplate : () => {
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
  }
);

mhEventModule.controller('EventController', EventController);
mhEventModule.controller('EventsController', EventsController);
mhEventModule.controller('EventTemplatesController', EventTemplatesController);
mhEventModule.controller('EventTemplateController', EventTemplateController);
mhEventModule.service('EventService', EventService);
