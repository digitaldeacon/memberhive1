export class ReportController {

  constructor($scope, ReportService, Report, Person, LoopBackAuth, gettextCatalog, Shout) {
    this.$scope = $scope;
    this.ReportService = ReportService;
    this.Report = Report;
    this.Person = Person;
    this.LoopBackAuth = LoopBackAuth;
    this.gettextCatalog = gettextCatalog;
    this.Shout = Shout;

    this.curUser = LoopBackAuth.currentUserId;
    this.data = '{"group": {"operator": "AND","rules": []}}';
    this.name = '';
    this.reports = [];
    this.currentPage = 1;
    this.totalReports = 0;

    $scope.reportHtml = '<table><tr><td>%col1%</td><td>%col2%</td></tr></table>';

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
      {id: 'firstName',label: gettextCatalog.getString('First Name'),type: 'string',optgroup: gettextCatalog.getString('Person')},
      {id: 'lastName',label: gettextCatalog.getString('Last Name'),type: 'string',optgroup: gettextCatalog.getString('Person')},
      {
        id: 'gender',label: gettextCatalog.getString('Gender'),type: 'string',optgroup: gettextCatalog.getString('Person'),
        input:'radio',values:{'m':gettextCatalog.getString('Male'),'f':gettextCatalog.getString('Female')}
      },
      {
        id: 'birthdate',label: gettextCatalog.getString('Birthdate'),type: 'date',optgroup: gettextCatalog.getString('Person'),
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
        (data) => {this.Shout.success(this.gettextCatalog.getString('Successfully created query for report ' + data.name));},
        (error) => {this.Shout.error(this.gettextCatalog.getString(error.data.error.message), error.data.error.name);}
      );
    }
  }


  /** Watchers **/
  /*$scope.filter = JSON.parse(this.data);
   $scope.$watch('filter', function(newValue) {
   $scope.json = JSON.stringify(newValue, null, 2);
   }, true);*/

}
