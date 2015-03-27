'use strict';

export function ReportController($scope,ReportService,Report,Person,LoopBackAuth,gettext,Shout,config) {
  this.curUser = LoopBackAuth.currentUserId;
  this.data = '{"group": {"operator": "AND","rules": []}}';
  this.name = '';
  this.pageSize = config.pagination.pageSize;
  this.reports = [];
  this.currentPage = 1;
  this.totalReports = 0;

  $scope.reportHtml = '<table><tr><td>%col1%</td><td>%col2%</td></tr></table>';
  $scope.textAreaSetup = function($element){
    $element.attr('ui-codemirror', '');
  };

  this.report = {
    name: 'My report',
    slur: 'person/simple',
    query: {}, // the "where" part, specific to underlying DAL (like loopback)
    rule: this.data, // jQuery Plugin specific (so we can reload a created query)
    active: true,
    widgetize: false,
    createdAt: new Date(),
    createdBy: this.curUser
  };

  $scope.name = this.name;

  /** Functions **/
  this.pageChanged = (pageNum) => {
    this.getReports(pageNum);
  };
  this.getReports = (pageNumber) => {
    pageNumber = pageNumber || 1;

    Report.count().$promise.then((result) => {
      this.totalReports = result.count;
    });
    console.log(Report);
    this.reports = ReportService.all(pageNumber);
  };
  this.deletePerson = (report) => {
    ReportService.delete(report.id, this.getReports);
  };
  this.getReport = () => {
    Report.find().$promise.then(data => Shout.error(data));
  };
  this.setBuilderRules = () => {
    return this.report.rule;
  };
  this.setBuilderFilters = () => {
    return this.personModel;
  };

  this.saveQuery = queryObj => {
    if (queryObj) {
      this.report.query = queryObj.query;
      this.report.rule = queryObj.rule;
      this.report.name = $scope.name;
      Report.upsert({},this.report).$promise.then(
        (data) => {Shout.success(gettext('Successfully created query for report ' + data.name));},
        (error) => {Shout.error(gettext(error.data.error.message),error.data.error.name);}
      );
    }
  };

  this.getReports();

  /** Watchers **/
  /*$scope.filter = JSON.parse(this.data);
   $scope.$watch('filter', function(newValue) {
   $scope.json = JSON.stringify(newValue, null, 2);
   }, true);*/

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
