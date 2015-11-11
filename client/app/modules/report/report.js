import {MenuSection, MenuLink} from '../core/providers/menu-provider';

import {ReportListController} from './controllers/report-list-controller';
import {ReportEditController} from './controllers/report-edit-controller';

import {QueryBuilderDirective} from './directives/querybuilder-directive';
import {VariableListDirective} from './directives/variablelist-directive';

import {ReportHtmlWidget} from './widgets/htmlreport/htmlreport';

import {ReportService} from './services/report-service';
import {QueryBuilderModelService} from './services/querybuilder-model-service';


export var mhReportModule = angular.module('mh.report', [
  'ui.codemirror',
]);

mhReportModule.config(
  ($stateProvider, $provide, MainMenuProvider, gettext) => {
    $stateProvider.state('report', {
      url: '/report',
      template: '<ui-view/>',
      abstract: true,
      data: {
        module: 'report',
        pageTitle: gettext('Report')
      }
    }).state('report.create', {
      url: '/create',
      controller: 'ReportEditController',
      controllerAs: 'reportCtrl',
      templateUrl: 'app/modules/report/views/report.upsert.html',
      data: {
        pageSubTitle: gettext('Create a new report')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveReport: (Report) => {
          return new Report();
        }
      }
    }).state('report.edit', {
      url: '/edit/:id',
      controller: 'ReportEditController',
      controllerAs: 'reportCtrl',
      templateUrl: 'app/modules/report/views/report.upsert.html',
      data: {
        pageSubTitle: gettext('Edit a report')
      },
      acl: {
        needRights: ['$authenticated']
      },
      resolve: {
        resolveReport: ($stateParams, ReportService) => {
          return ReportService.one($stateParams.id);
        }
      }
    }).state('report.list', {
      url: '/list',
      controller: 'ReportListController',
      controllerAs: 'reportCtrl',
      templateUrl: 'app/modules/report/views/report.list.html',
      data: {
        pageSubTitle: gettext('List available reports')
      },
      acl: {
        needRights: ['$authenticated']
      }
    });

    MainMenuProvider.add(new MenuSection(gettext('Reports'), 'insert_chart',
      [
        new MenuLink(gettext('List Reports'), 'list', 'report.list'),
        new MenuLink(gettext('Create Report'), 'add', 'report.create')
      ]
    ));
  }
);

mhReportModule.controller('ReportListController', ReportListController);
mhReportModule.controller('ReportEditController', ReportEditController);

mhReportModule.directive('gemQuerybuilder', QueryBuilderDirective);
mhReportModule.directive('gemVariableList', VariableListDirective);

mhReportModule.factory('ReportService', ReportService);
mhReportModule.factory('QueryBuilderModelService', QueryBuilderModelService);
