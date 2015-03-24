import 'textAngular/dist/textAngular-rangy.min';
import 'textAngular';

import 'jQuery-QueryBuilder';
import 'bootstrap-datepicker/js/bootstrap-datepicker';

import {ReportController} from 'report/controllers/report-controller';
import {QueryBuilderDirective} from 'report/directives/querybuilder-directive';

export var gemReportModule = angular.module('gem.report', []).config(
  ($stateProvider) => {
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
      templateUrl: '../report/views/report.create.html',
      data: {
        pageSubTitle: 'Create and edit reports'
      },
      acl: {
        needRights: ['$authenticated']
      }
    }).state('report.list', {
      url: '/list',
      templateUrl: '../report/views/report.list.html',
      data: {
        pageSubTitle: 'List available reports'
      },
      acl: {
        needRights: ['$authenticated']
      }
    });
  }
);

gemReportModule.controller('ReportController', ReportController);
gemReportModule.directive('gemQuerybuilder', QueryBuilderDirective);
