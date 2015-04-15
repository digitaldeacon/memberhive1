import 'codemirror/codemirror';

import 'textAngular';
import 'textAngular/dist/textAngular-rangy.min';
import 'textAngular/dist/textAngular-sanitize.min';
import 'textAngular/src/textAngular.css!';

import 'jQuery-QueryBuilder';
import 'bootstrap-datepicker/js/bootstrap-datepicker';

import {ReportController} from './controllers/report-controller';
import {ReportUpsertController} from './controllers/report-upsert-controller';

import {QueryBuilderDirective} from './directives/querybuilder-directive';
import {PreviewHTMLDirective} from './directives/previewhtml-directive';

import {ReportService} from './services/report-service';

import {MenuSection, MenuLink} from 'modules/core/providers/menu-provider';

export var gemReportModule = angular.module('gem.report', []).config(
  ($stateProvider, $provide, MainMenuProvider, gettext) => {
    $stateProvider.state('report', {
      url: '/report',
      template: '<ui-view/>',
      abstract: true,
      data: {
        module: 'report',
        pageTitle: 'Report'
      }
    }).state('report.create', {
      url: '/create',
      templateUrl: 'modules/report/views/report.upsert.html',
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
    }).state('report.edit', {
      url: '/edit/:id',
      templateUrl: 'modules/report/views/report.upsert.html',
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
      }).state('report.list', {
      url: '/list',
      templateUrl: 'modules/report/views/report.list.html',
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

    //textAngular setup
    $provide.decorator('taOptions', ['$delegate', function(taOptions) {
      taOptions.toolbar = [
        ['html','h1','h2','h3'],
        ['bold','italics']
      ];
      return taOptions;
    }]);

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
