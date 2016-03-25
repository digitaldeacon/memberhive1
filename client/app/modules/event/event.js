import {EventController} from './controllers/event-controller';
import {EventsController} from './controllers/events-controller';
import {EventTemplatesController} from './controllers/event-templates-controller';
import {EventTemplateController} from './controllers/event-template-controller';
import {EventTemplateViewController} from './controllers/event-template-view-controller';
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
      },
      resolve: {
        resolveEvents: (Event) => {
          return Event.find().$promise;
        },
        resolveTemplates: (EventTemplate) => {
          return EventTemplate.find().$promise;
        },
        resolveNextEvents: (resolveEvents) => {
          return _.filter(resolveEvents, (event) => new Date(event.date) > new Date());
        }
      },
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
          return EventTemplate.find().$promise;
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
      params: { 
        date: null, 
        templateId: null
      },
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
        resolveTemplate : ($stateParams, EventTemplate) => {
          if($stateParams.templateId !== null) {
            return EventTemplate.findById({id: $stateParams.templateId}).$promise;
          }
          return {};
        }
      }
    })
    .state('event.templates', {
      url: '/list_templates',
      controller: 'EventTemplatesController',
      controllerAs: 'ctrl',
      templateUrl: 'app/modules/event/views/event.templates.html',
      data: {
        pageSubTitle: gettext('Event Template')
      },
      ncyBreadcrumb: {
        label: gettext('Event Template')
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('event.template', {
      url: '/template/:templateId',
      controller: 'EventTemplateController',
      controllerAs: 'ctrl',
      templateUrl: 'app/modules/event/views/event.template.html',
      data: {
        pageSubTitle: gettext('Event Template')
      },
      ncyBreadcrumb: {
        label: gettext('Event Template')
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('event.viewTemplate', {
      url: '/viewTemplate/:templateId',
      controller: 'EventTemplateViewController',
      controllerAs: 'ctrl',
      templateUrl: 'app/modules/event/views/event.template.view.html',
      data: {
        pageSubTitle: gettext('Event Template')
      },
      ncyBreadcrumb: {
        label: gettext('Event Template')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve : {
        resolveTemplate: (EventTemplate, $stateParams) => {
          return EventTemplate.findById({id: $stateParams.templateId}).$promise;
        },
        resolveEvents : (EventTemplate, $stateParams) => {
          return EventTemplate.events({id: $stateParams.templateId}).$promise;
        }
      }
    });
  }
);

mhEventModule.controller('EventController', EventController);
mhEventModule.controller('EventsController', EventsController);
mhEventModule.controller('EventTemplatesController', EventTemplatesController);
mhEventModule.controller('EventTemplateController', EventTemplateController);
mhEventModule.controller('EventTemplateViewController', EventTemplateViewController);
mhEventModule.service('EventService', EventService);
