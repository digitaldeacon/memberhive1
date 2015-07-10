import {MenuSection, MenuLink} from '../core/providers/menu-provider';

import {ReportListController} from './controllers/report-list-controller';
import {ReportUpsertController} from './controllers/report-upsert-controller';

import {QueryBuilderDirective} from './directives/querybuilder-directive';
import {VariableListDirective} from './directives/variablelist-directive';

import {ReportHtmlWidget} from './widgets/htmlreport/htmlreport';

import {ReportService} from './services/report-service';
import {QueryBuilderModelService} from './services/querybuilder-model-service';


export var gemReportModule = angular.module('gem.report', [
  'ui.codemirror',

  'gem.report.widget.htmlreport'
]);

gemReportModule.config(
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
      templateUrl: 'app/modules/report/views/report.upsert.html',
      data: {
        pageSubTitle: gettext('Create a new report')
      },
      ncyBreadcrumb: {
        label: gettext('New Report'),
        parent: 'report.list'
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('report.edit', {
      url: '/edit/:id',
      templateUrl: 'app/modules/report/views/report.upsert.html',
      data: {
        pageSubTitle: gettext('Edit a report')
      },
      ncyBreadcrumb: {
        label: gettext('Edit Report'),
        parent: 'report.list'
      },
      acl: {
        needRights: ['$authenticated']
      }
      }).state('report.list', {
      url: '/list',
      templateUrl: 'app/modules/report/views/report.list.html',
      data: {
        pageSubTitle: gettext('List available reports')
      },
      ncyBreadcrumb: {
        label: gettext('Reports')
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

gemReportModule.controller('ReportListController', ReportListController);
gemReportModule.controller('ReportUpsertController', ReportUpsertController);

gemReportModule.directive('gemQuerybuilder', QueryBuilderDirective);
gemReportModule.directive('gemVariableList', VariableListDirective);

gemReportModule.factory('ReportService', ReportService);
gemReportModule.factory('QueryBuilderModelService', QueryBuilderModelService);
