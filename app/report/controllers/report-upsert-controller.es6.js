'use strict';

export function ReportUpsertController($scope,Report,ReportService,Person,LoopBackAuth,gettext,Shout,config,$stateParams) {
  var _self = this;
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

  /*this.report = {
    name: 'My report',
    slur: 'person/simple',
    query: {}, // the "where" part, specific to underlying DAL (like loopback)
    rule: _self.data, // jQuery Plugin specific (so we can reload a created query)
    active: true,
    widgetize: false,
    createdAt: new Date(),
    createdBy: _self.curUser
  };*/

  _self.report = ReportService.one($stateParams.id);
  console.log(_self.report);

  $scope.name = _self.name;

  /** Functions **/
  this.pageChanged = (pageNum) => {
    this.getReports(pageNum);
  };
  this.getReports = (pageNumber) => {
    pageNumber = pageNumber || 1;

    Report.count().$promise.then((result) => {
      _self.totalReports = result.count;
    });
    console.log(Report);
    _self.reports = ReportService.all(pageNumber);
  };
  this.deleteReport = (report) => {
    ReportService.delete(report.id, _self.getReports);
  };
  this.trashReport = (report) => {
    ReportService.trash(report.id, _self.getReports);
  };
  this.getReport = () => {
    Report.find().$promise.then(data => Shout.error(data));
  };
  this.setBuilderRules = () => {
    return _self.report.rule;
  };
  this.saveQuery = queryObj => {
    if (queryObj) {
      _self.report.query = queryObj.query;
      _self.report.rule = queryObj.rule;
      _self.report.name = $scope.name;
      Report.upsert({},_self.report).$promise.then(
        (data) => {Shout.success(gettext('Successfully created query for report ' + data.name));},
        (error) => {Shout.error(gettext(error.data.error.message),error.data.error.name);}
      );
    }
  };
  this.setBuilderFilters = () => {
    return _self.personModel;
  };

  this.getReports();

  /** Watchers **/
  /*$scope.filter = JSON.parse(_self.data);
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
