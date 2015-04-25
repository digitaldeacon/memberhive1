import 'codemirror';
import 'codemirror/lib/codemirror.css!';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'ui-codemirror';

import 'jQuery-QueryBuilder';
import 'bootstrap-datepicker/js/bootstrap-datepicker';

import {ReportController} from './controllers/report-controller';
import {ReportUpsertController} from './controllers/report-upsert-controller';

import {QueryBuilderDirective} from './directives/querybuilder-directive';
import {PreviewHTMLDirective} from './directives/previewhtml-directive';

import {ReportService} from './services/report-service';
import {QueryBuilderModelService} from './services/querybuilder-model-service';

import {MenuSection, MenuLink} from 'modules/core/providers/menu-provider';

import './styles/report.css!';

export var gemReportModule = angular.module('gem.report', [
    'ui.codemirror'
  ]);

gemReportModule.config(
  ($stateProvider, $provide, MainMenuProvider, gettext) => {
    $stateProvider.state('app.report', {
      url: 'report',
      //template: '<ui-view/>',
      abstract: true,
      data: {
        module: 'report',
        pageTitle: 'Report'
      }
    }).state('app.report.create', {
      url: 'create',
      views: {
        'content@': {
          templateUrl: 'modules/person/views/report.upsert.html'
        }
      },
      data: {
        pageSubTitle: 'Create a new report'
      },
      ncyBreadcrumb: {
        label: gettext('New Report'),
        parent: 'report.list'
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('app.report.edit', {
      url: 'edit/:id',
      views: {
        'content@': {
          templateUrl: 'modules/person/views/report.upsert.html'
        }
      },
      data: {
        pageSubTitle: 'Edit a report'
      },
      ncyBreadcrumb: {
        label: gettext('Edit Report'),
        parent: 'report.list'
      },
      acl: {
        needRights: ['$authenticated']
      }
      }).state('app.report.list', {
      url: 'list',
      views: {
        'content@': {
          templateUrl: 'modules/person/views/report.list.html'
        }
      },
      data: {
        pageSubTitle: 'List available reports'
      },
      ncyBreadcrumb: {
        label: gettext('Reports')
      },
      acl: {
        needRights: ['$authenticated']
      }
    });

    MainMenuProvider.add(new MenuSection(gettext('Reports'), 'bar-chart',
      [
        new MenuLink(gettext('List Reports'), 'eye', 'report.list'),
        new MenuLink(gettext('Create Report'), 'plus-circle', 'report.create')
      ]
    ));
  }
);

gemReportModule.controller('ReportController', ReportController);
gemReportModule.controller('ReportUpsertController', ReportUpsertController);

gemReportModule.directive('gemQuerybuilder', QueryBuilderDirective);
gemReportModule.directive('gemPreview', PreviewHTMLDirective);

gemReportModule.factory('ReportService', ReportService);
gemReportModule.factory('QueryBuilderModelService', QueryBuilderModelService);
