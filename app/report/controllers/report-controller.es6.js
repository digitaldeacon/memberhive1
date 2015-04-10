export class ReportController {

  constructor($scope, ReportService, Report, Person, LoopBackAuth, gettext, Shout) {
    this.$scope = $scope;
    this.ReportService = ReportService;
    this.Report = Report;
    this.Person = Person;
    this.LoopBackAuth = LoopBackAuth;
    this.gettext = gettext;
    this.Shout = Shout;

    this.curUser = LoopBackAuth.currentUserId;
    this.data = '{"group": {"operator": "AND","rules": []}}';
    this.name = '';
    this.reports = [];
    this.currentPage = 1;
    this.totalReports = 0;

    $scope.reportHtml = '<table><tr><td>%col1%</td><td>%col2%</td></tr></table>';
    $scope.textAreaSetup = function ($element) {
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

    this.getReports();
  }

  pageChanged(pageNum) {
    this.getReports(pageNum);
  }

  getReports(pageNumber) {
    pageNumber = pageNumber || 1;

    this.Report.count().$promise.then((result) => {
      this.totalReports = result.count;
    });
    this.reports = this.ReportService.all(pageNumber);
  }

  deletePerson(report) {
    this.ReportService.delete(report.id, this.getReports);
  }

  getReport() {
    this.Report.find().$promise.then(data => this.Shout.error(data));
  }

  setBuilderRules() {
    return this.report.rule;
  }

  setBuilderFilters() {
    return this.personModel;
  }

  saveQuery(queryObj) {
    if (queryObj) {
      this.report.query = queryObj.query;
      this.report.rule = queryObj.rule;
      this.report.name = this.$scope.name;
      this.Report.upsert({}, this.report).$promise.then(
        (data) => {this.Shout.success(this.gettext('Successfully created query for report ' + data.name));},
        (error) => {this.Shout.error(this.gettext(error.data.error.message), error.data.error.name);}
      );
    }
  }


  /** Watchers **/
  /*$scope.filter = JSON.parse(this.data);
   $scope.$watch('filter', function(newValue) {
   $scope.json = JSON.stringify(newValue, null, 2);
   }, true);*/

}
