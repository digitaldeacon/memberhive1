'use strict';

export function ReportUpsertController($scope,Report,ReportService,Person,LoopBackAuth,gettext,Shout,$stateParams) {
  this.curUser = LoopBackAuth.currentUserId;

  this.report = {
   name: 'My default report',
   slur: 'person/simple',
   query: {}, // the "where" part, specific to underlying DAL (like loopback)
   rule: {}, // jQuery Plugin specific (so we can reload a created query)
   active: true,
   widgetize: false,
   reportHtml: '',
   createdAt: new Date(),
   createdBy: this.curUser
   };

  $scope.reportHtml = '';

  $scope.textAreaSetup = function($element) {
    $element.attr('ui-codemirror', '');
  };

  /** Functions **/
  this.getReport = () => {
    if ($stateParams.id)
      this.report = ReportService.one($stateParams.id);
  };
  this.setBuilderRules = () => {
    return this.report.rule;
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

  this.getReport();
}
