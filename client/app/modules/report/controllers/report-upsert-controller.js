export class ReportUpsertController {

  constructor($scope, Report, ReportService, Person, LoopBackAuth, gettextCatalog, Shout, $stateParams, TagService,
              QueryBuilderModelService) {
    this.$scope = $scope;
    this.Report = Report;
    this.ReportService = ReportService;
    this.Person = Person;
    this.LoopBackAuth = LoopBackAuth;
    this.gettextCatalog = gettextCatalog;
    this.Shout = Shout;
    this.$stateParams = $stateParams;

    this.report = this.getReport();
    this.tags = TagService.getTags(this.Report.model.name, this.report.id);

    this.curUser = LoopBackAuth.currentUserId;
    $scope.reportHtml = '';

    this.editorOptions = {
      lineWrapping: true,
      mode: 'htmlmixed'
    };

    this.personModel = QueryBuilderModelService.personModel();
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
