export class ReportUpsertController {

  constructor($scope,Report,ReportService,Person,LoopBackAuth,gettextCatalog,Shout,$stateParams) {
    this.$scope = $scope;
    this.Report = Report;
    this.ReportService = ReportService;
    this.Person = Person;
    this.LoopBackAuth = LoopBackAuth;
    this.gettextCatalog = gettextCatalog;
    this.Shout = Shout;
    this.$stateParams = $stateParams;

    this.report = this.getReport();

    this.curUser = LoopBackAuth.currentUserId;
    $scope.reportHtml = '';

    this.editorOptions = {
      lineWrapping: true,
      mode: 'htmlmixed'
    };

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
  }

  getReport() {
      return this.$stateParams.id ? this.ReportService.one(this.$stateParams.id) : null;
  }

  saveReport() {
    this.report.name = this.$scope.reportUpCtrl.report.name;
    this.report.html = this.$scope.reportUpCtrl.report.html;
    this.ReportService.save(this.report);
  }

  setBuilderFilters() {
    return this.personModel;
  }
}
