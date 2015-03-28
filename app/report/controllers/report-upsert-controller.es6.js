'use strict';

export function ReportUpsertController($scope,Report,ReportService,Person,LoopBackAuth,gettext,Shout,$stateParams) {
  this.curUser = LoopBackAuth.currentUserId;

  $scope.reportHtml = '';

  $scope.textAreaSetup = function($element) {
    $element.attr('ui-codemirror', '');
  };

  /** Functions **/
  this.getReport = () => {
      return $stateParams.id ? ReportService.one($stateParams.id) : null;
  };

  this.saveQuery = queryObj => {
    if (queryObj) {
      this.report.query = queryObj.query;
      this.report.rule = queryObj.rule;
      this.report.name = $scope.name;
      ReportService.save(this.report);
    }
  };

  this.setBuilderFilters = () => {
    return this.personModel;
  };

  this.report = this.getReport();

  /** Dictionaries **/
  this.personModel = [
    {id: 'firstName',label: gettext('Firstname'),type: 'string',optgroup: gettext('Person')},
    {id: 'lastName',label: gettext('Lastname'),type: 'string',optgroup: gettext('Person')},
    {
      id: 'gender',label: gettext('Gender'),type: 'string',optgroup: gettext('Person'),
      input:'radio',values:{'m':gettext('Male'),'f':gettext('Female')}
    },
    {
      id: 'birthdate',label: gettext('Birthdate'),type: 'date',optgroup: gettext('Person'),
      validation: {
        format: 'YYYY/MM/DD'
      },
      plugin: 'datepicker',
      plugin_config: { // jshint ignore:line
        format: 'yyyy/mm/dd',
        todayBtn: 'linked',
        todayHighlight: true,
        autoclose: true
      }
    }
  ];
}
